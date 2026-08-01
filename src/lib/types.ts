export type Category = "rh" | "financeiro" | "ti" | "operacoes";

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  path: string;
  content: string;
}

export interface Source {
  title: string;
  category: string;
  path: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  rh: "RH",
  financeiro: "Financeiro",
  ti: "TI",
  operacoes: "Operações",
};
