import OpenAI from "openai";
import {
  buildSystemPrompt,
  findRelevantDocuments,
  loadDocuments,
  parseSourcesFromResponse,
} from "./knowledge-base";
import type { Source } from "./types";

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY não configurada. Adicione a chave no arquivo .env.local"
    );
  }
  return new OpenAI({ apiKey });
}

export async function generateChatResponse(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[] = []
): Promise<{ content: string; sources: Source[] }> {
  const documents = loadDocuments();
  const relevantDocs =
    findRelevantDocuments(userMessage, documents).length > 0
      ? findRelevantDocuments(userMessage, documents)
      : documents.slice(0, 4);

  const systemPrompt = buildSystemPrompt(relevantDocs);
  const client = getClient();

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages,
    temperature: 0.3,
    max_tokens: 1500,
  });

  const rawResponse =
    completion.choices[0]?.message?.content ??
    "Desculpe, não consegui gerar uma resposta. Tente novamente.";

  const { content, sources } = parseSourcesFromResponse(
    rawResponse,
    relevantDocs
  );

  const finalSources =
    sources.length > 0
      ? sources
      : relevantDocs.map((d) => ({
          title: d.title,
          category: d.categoryLabel,
          path: d.path,
        }));

  return { content, sources: finalSources };
}

export async function generateDocumentSummary(
  documentId: string
): Promise<string> {
  const documents = loadDocuments();
  const doc = documents.find((d) => d.id === documentId);

  if (!doc) {
    throw new Error("Documento não encontrado");
  }

  const client = getClient();

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente corporativo. Resuma o documento fornecido em 3-5 bullet points claros em português brasileiro. Seja objetivo e destaque as informações mais importantes para o colaborador.",
      },
      {
        role: "user",
        content: `Resuma este documento:\n\n${doc.content}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  return (
    completion.choices[0]?.message?.content ??
    "Não foi possível gerar o resumo."
  );
}
