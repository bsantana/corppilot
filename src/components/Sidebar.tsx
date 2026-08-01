"use client";

import type { Category, Conversation } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  selectedCategory: Category | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onSelectCategory: (category: Category | null) => void;
  onDeleteConversation: (id: string) => void;
}

const CATEGORIES: { key: Category; icon: string }[] = [
  { key: "rh", icon: "👥" },
  { key: "financeiro", icon: "💰" },
  { key: "ti", icon: "💻" },
  { key: "operacoes", icon: "⚙️" },
];

const SUGGESTED_QUESTIONS: Record<Category, string[]> = {
  rh: [
    "Qual é a política de férias?",
    "Quais benefícios a empresa oferece?",
    "Como funciona o canal de denúncias?",
  ],
  financeiro: [
    "Como solicito reembolso de despesas?",
    "Qual o limite de diária de hotel?",
    "Como funciona o adiantamento de viagem?",
  ],
  ti: [
    "Como solicito acesso a um sistema?",
    "Quais são as regras de senha?",
    "O que fazer em caso de incidente de segurança?",
  ],
  operacoes: [
    "Como funciona o onboarding?",
    "Qual o horário de trabalho híbrido?",
    "Como reservo uma sala de reunião?",
  ],
};

export function Sidebar({
  conversations,
  activeConversationId,
  selectedCategory,
  onSelectConversation,
  onNewConversation,
  onSelectCategory,
  onDeleteConversation,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 p-4">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            CP
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">CorpPilot</h1>
            <p className="text-xs text-slate-500">TechCorp</p>
          </div>
        </div>
        <button
          onClick={onNewConversation}
          className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Nova conversa
        </button>
      </div>

      <div className="border-b border-slate-200 p-3">
        <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Categorias
        </p>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedCategory === null
                ? "bg-blue-100 font-medium text-blue-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            📚 Todos os documentos
          </button>
          {CATEGORIES.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => onSelectCategory(key)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === key
                  ? "bg-blue-100 font-medium text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {icon} {CATEGORY_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="border-b border-slate-200 p-3">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Perguntas sugeridas
          </p>
          <div className="space-y-1">
            {SUGGESTED_QUESTIONS[selectedCategory].map((q) => (
              <p
                key={q}
                className="rounded-lg px-3 py-1.5 text-xs text-slate-500"
              >
                &ldquo;{q}&rdquo;
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Histórico
        </p>
        {conversations.length === 0 ? (
          <p className="px-3 py-2 text-xs text-slate-400">
            Nenhuma conversa ainda
          </p>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group flex items-center rounded-lg transition-colors ${
                  activeConversationId === conv.id
                    ? "bg-blue-100"
                    : "hover:bg-slate-100"
                }`}
              >
                <button
                  onClick={() => onSelectConversation(conv.id)}
                  className="flex-1 truncate px-3 py-2 text-left text-sm text-slate-700"
                >
                  {conv.title}
                </button>
                <button
                  onClick={() => onDeleteConversation(conv.id)}
                  className="hidden px-2 py-2 text-xs text-slate-400 hover:text-red-500 group-hover:block"
                  title="Excluir conversa"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export { SUGGESTED_QUESTIONS };
