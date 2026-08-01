import fs from "fs";
import path from "path";
import {
  CATEGORY_LABELS,
  type Category,
  type KnowledgeDocument,
  type Source,
} from "./types";

const DOCS_DIR = path.join(process.cwd(), "docs");

const CATEGORY_MAP: Record<string, Category> = {
  rh: "rh",
  financeiro: "financeiro",
  ti: "ti",
  operacoes: "operacoes",
};

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/ — TechCorp$/, "") : "Documento";
}

function extractCategoryFromContent(content: string): Category | null {
  const match = content.match(/\*\*Categoria:\*\*\s*(.+)/);
  if (!match) return null;
  const label = match[1].trim().toLowerCase();
  const entry = Object.entries(CATEGORY_LABELS).find(
    ([, v]) => v.toLowerCase() === label
  );
  return entry ? (entry[0] as Category) : null;
}

export function loadDocuments(): KnowledgeDocument[] {
  const documents: KnowledgeDocument[] = [];

  if (!fs.existsSync(DOCS_DIR)) return documents;

  for (const categoryDir of fs.readdirSync(DOCS_DIR)) {
    const categoryPath = path.join(DOCS_DIR, categoryDir);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const category = CATEGORY_MAP[categoryDir];
    if (!category) continue;

    for (const file of fs.readdirSync(categoryPath)) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(categoryPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const title = extractTitle(content);
      const docCategory = extractCategoryFromContent(content) ?? category;

      documents.push({
        id: file.replace(".md", ""),
        title,
        category: docCategory,
        categoryLabel: CATEGORY_LABELS[docCategory],
        path: `docs/${categoryDir}/${file}`,
        content,
      });
    }
  }

  return documents;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\W+/)
    .filter((w) => w.length > 2);
}

export function findRelevantDocuments(
  query: string,
  documents: KnowledgeDocument[],
  limit = 4
): KnowledgeDocument[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return documents.slice(0, limit);

  const scored = documents.map((doc) => {
    const docTokens = tokenize(doc.content + " " + doc.title);
    let score = 0;

    for (const token of queryTokens) {
      if (docTokens.includes(token)) score += 2;
      if (doc.title.toLowerCase().includes(token)) score += 3;
      if (doc.content.toLowerCase().includes(token)) score += 1;
    }

    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}

export function buildSystemPrompt(relevantDocs: KnowledgeDocument[]): string {
  const docsContext = relevantDocs
    .map(
      (doc) =>
        `### [${doc.title}] (Categoria: ${doc.categoryLabel})\n${doc.content}`
    )
    .join("\n\n---\n\n");

  return `Você é o CorpPilot, assistente corporativo inteligente da TechCorp.
Sua função é responder perguntas dos colaboradores com base EXCLUSIVAMENTE nos documentos internos fornecidos abaixo.

REGRAS:
1. Responda sempre em português brasileiro, de forma clara e profissional.
2. Use APENAS informações presentes nos documentos. Se a resposta não estiver nos documentos, diga: "Não encontrei essa informação na base de conhecimento da TechCorp. Recomendo entrar em contato com o departamento responsável."
3. Ao final de cada resposta, inclua uma seção "Fontes:" listando os documentos consultados no formato: - [Título do Documento]
4. Seja conciso mas completo. Use listas e formatação quando apropriado.
5. Não invente informações, valores, prazos ou procedimentos que não estejam nos documentos.

DOCUMENTOS DA BASE DE CONHECIMENTO:

${docsContext}`;
}

export function parseSourcesFromResponse(
  response: string,
  documents: KnowledgeDocument[]
): { content: string; sources: Source[] } {
  const sourcesMatch = response.match(/\n*Fontes:\s*\n([\s\S]*?)$/i);
  let content = response;
  const sources: Source[] = [];

  if (sourcesMatch) {
    content = response.slice(0, sourcesMatch.index).trim();
    const sourceLines = sourcesMatch[1]
      .split("\n")
      .map((l) => l.replace(/^[-*•]\s*/, "").replace(/\[|\]/g, "").trim())
      .filter(Boolean);

    for (const line of sourceLines) {
      const doc = documents.find(
        (d) =>
          d.title.toLowerCase().includes(line.toLowerCase()) ||
          line.toLowerCase().includes(d.title.toLowerCase())
      );
      if (doc) {
        sources.push({
          title: doc.title,
          category: doc.categoryLabel,
          path: doc.path,
        });
      }
    }
  }

  return { content, sources };
}

export function getDocumentsByCategory(
  category: Category | null
): KnowledgeDocument[] {
  const all = loadDocuments();
  if (!category) return all;
  return all.filter((d) => d.category === category);
}
