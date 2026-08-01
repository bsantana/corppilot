"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, ChatMessage, Conversation } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { Sidebar, SUGGESTED_QUESTIONS } from "./Sidebar";

const STORAGE_KEY = "corppilot-conversations";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loaded = loadConversations();
    setConversations(loaded);
    if (loaded.length > 0) setActiveId(loaded[0].id);
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, scrollToBottom]);

  const updateConversations = useCallback(
    (updated: Conversation[]) => {
      setConversations(updated);
      saveConversations(updated);
    },
    []
  );

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: generateId(),
      title: "Nova conversa",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const updated = [newConv, ...conversations];
    updateConversations(updated);
    setActiveId(newConv.id);
    setInput("");
    inputRef.current?.focus();
  };

  const handleDeleteConversation = (id: string) => {
    const updated = conversations.filter((c) => c.id !== id);
    updateConversations(updated);
    if (activeId === id) {
      setActiveId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    let convId = activeId;
    let currentConversations = [...conversations];

    if (!convId) {
      const newConv: Conversation = {
        id: generateId(),
        title: messageText.slice(0, 40) + (messageText.length > 40 ? "..." : ""),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      currentConversations = [newConv, ...currentConversations];
      convId = newConv.id;
      setActiveId(convId);
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: messageText,
      timestamp: Date.now(),
    };

    const convIndex = currentConversations.findIndex((c) => c.id === convId);
    const conv = currentConversations[convIndex];
    const updatedMessages = [...conv.messages, userMessage];

    currentConversations[convIndex] = {
      ...conv,
      title:
        conv.messages.length === 0
          ? messageText.slice(0, 40) + (messageText.length > 40 ? "..." : "")
          : conv.title,
      messages: updatedMessages,
      updatedAt: Date.now(),
    };

    updateConversations(currentConversations);
    setInput("");
    setIsLoading(true);

    try {
      const history = conv.messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar mensagem");
      }

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.content,
        sources: data.sources,
        timestamp: Date.now(),
      };

      const finalConversations = [...currentConversations];
      const finalConv = finalConversations[convIndex];
      finalConversations[convIndex] = {
        ...finalConv,
        messages: [...finalConv.messages, assistantMessage],
        updatedAt: Date.now(),
      };

      updateConversations(finalConversations);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content:
          error instanceof Error
            ? `⚠️ ${error.message}`
            : "⚠️ Erro ao processar sua mensagem. Tente novamente.",
        timestamp: Date.now(),
      };

      const errorConversations = [...currentConversations];
      errorConversations[convIndex] = {
        ...errorConversations[convIndex],
        messages: [...errorConversations[convIndex].messages, errorMessage],
        updatedAt: Date.now(),
      };
      updateConversations(errorConversations);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = selectedCategory
    ? SUGGESTED_QUESTIONS[selectedCategory]
    : [
        "Qual é a política de férias?",
        "Como solicito reembolso de despesas?",
        "Quais benefícios a empresa oferece?",
        "Como funciona o onboarding?",
      ];

  return (
    <div className="flex h-screen">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeId}
        selectedCategory={selectedCategory}
        onSelectConversation={setActiveId}
        onNewConversation={handleNewConversation}
        onSelectCategory={setSelectedCategory}
        onDeleteConversation={handleDeleteConversation}
      />

      <main className="flex flex-1 flex-col bg-white">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {activeConversation?.title || "CorpPilot"}
            </h2>
            <p className="text-sm text-slate-500">
              Assistente corporativo inteligente da TechCorp
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-green-700">Online</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!activeConversation?.messages.length ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-600">
                CP
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Olá! Sou o CorpPilot
              </h3>
              <p className="mb-8 max-w-md text-center text-sm text-slate-500">
                Posso responder perguntas sobre políticas, benefícios,
                procedimentos e muito mais da TechCorp. Como posso ajudar?
              </p>
              <div className="grid max-w-lg grid-cols-2 gap-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {activeConversation.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                        AI
                      </div>
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Faça uma pergunta sobre a TechCorp..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
          <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-slate-400">
            CorpPilot utiliza IA para consultar documentos internos. Respostas
            baseadas na base de conhecimento da TechCorp.
          </p>
        </div>
      </main>
    </div>
  );
}
