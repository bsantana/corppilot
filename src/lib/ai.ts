import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  buildSystemPrompt,
  findRelevantDocuments,
  loadDocuments,
  parseSourcesFromResponse,
} from "./knowledge-base";
import type { Source } from "./types";

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY não configurada. Adicione a chave no arquivo .env.local"
    );
  }
  return new GoogleGenerativeAI(apiKey);
}

function getModelName(): string {
  return process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
}

function normalizeGeminiHistory(
  history: { role: "user" | "assistant"; content: string }[],
  currentMessage: string
): { role: "user" | "assistant"; content: string }[] {
  let filtered = [...history];

  const last = filtered[filtered.length - 1];
  if (last?.role === "user" && last.content === currentMessage) {
    filtered = filtered.slice(0, -1);
  }

  while (filtered.length > 0 && filtered[0].role === "assistant") {
    filtered = filtered.slice(1);
  }

  while (filtered.length > 0 && filtered[filtered.length - 1].role === "user") {
    filtered = filtered.slice(0, -1);
  }

  return filtered.slice(-6);
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

  const model = client.getGenerativeModel({
    model: getModelName(),
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1500,
    },
  });

  const normalizedHistory = normalizeGeminiHistory(history, userMessage);

  const chat = model.startChat({
    history: normalizedHistory.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  });

  const result = await chat.sendMessage(userMessage);
  const rawResponse =
    result.response.text() ||
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

  const model = client.getGenerativeModel({
    model: getModelName(),
    systemInstruction:
      "Você é um assistente corporativo. Resuma o documento fornecido em 3-5 bullet points claros em português brasileiro. Seja objetivo e destaque as informações mais importantes para o colaborador.",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
    },
  });

  const result = await model.generateContent(
    `Resuma este documento:\n\n${doc.content}`
  );

  return result.response.text() || "Não foi possível gerar o resumo.";
}
