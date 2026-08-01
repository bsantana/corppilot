# Especificação Técnica — CorpPilot

## 1. Visão Geral

**CorpPilot** é um copiloto corporativo que permite colaboradores consultarem documentos internos da empresa TechCorp através de perguntas em linguagem natural. A aplicação utiliza IA generativa (OpenAI GPT-4o-mini) com contexto dos documentos corporativos para gerar respostas precisas e contextualizadas.

## 2. Arquitetura

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Next.js API │────▶│   OpenAI API    │
│  (React UI) │◀────│   Routes     │◀────│  (GPT-4o-mini)  │
└─────────────┘     └──────┬───────┘     └─────────────────┘
                           │
                    ┌──────▼───────┐
                    │  docs/ (MD)  │
                    │ Knowledge    │
                    │    Base      │
                    └──────────────┘
```

### Fluxo de uma Pergunta

1. Usuário digita pergunta no chat
2. Frontend envia POST para `/api/chat` com mensagem e histórico
3. Backend carrega documentos de `docs/`
4. Busca semântica simples identifica documentos relevantes
5. Monta system prompt com documentos relevantes
6. Envia para OpenAI com histórico da conversa
7. Parseia resposta e extrai fontes citadas
8. Retorna resposta + fontes para o frontend
9. Frontend exibe resposta com badges de fontes

## 3. Funcionalidades

| ID | Funcionalidade | Status | Prioridade |
|----|---------------|--------|------------|
| F1 | Chat em linguagem natural | ✅ | Obrigatória |
| F2 | Base de conhecimento (9 docs) | ✅ | Obrigatória |
| F3 | Citação de fontes | ✅ | Obrigatória |
| F4 | Interface profissional | ✅ | Obrigatória |
| F5 | Histórico de conversas | ✅ | Diferencial |
| F6 | Categorias de documentos | ✅ | Diferencial |
| F7 | Resumo de documento (API) | ✅ | Diferencial |
| F8 | Perguntas sugeridas | ✅ | Diferencial |

## 4. APIs

### POST `/api/chat`

Envia mensagem e recebe resposta da IA.

**Request:**
```json
{
  "message": "Qual é a política de férias?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "content": "A política de férias da TechCorp...",
  "sources": [
    {
      "title": "Política de Férias",
      "category": "RH",
      "path": "docs/rh/politica-ferias.md"
    }
  ]
}
```

### GET `/api/documents`

Lista todos os documentos da base de conhecimento.

### POST `/api/summarize`

Gera resumo de um documento específico.

**Request:**
```json
{ "documentId": "politica-ferias" }
```

## 5. Gerenciamento de Contexto

### System Prompt

O system prompt inclui:
- Persona do CorpPilot (assistente corporativo)
- Regras de comportamento (responder apenas com base nos docs)
- Documentos relevantes à pergunta (busca por relevância)
- Instrução para citar fontes

### Busca de Relevância

Algoritmo simples de scoring por tokens:
- Match no título: +3 pontos
- Match no conteúdo: +1 ponto
- Match exato de token: +2 pontos
- Retorna top 4 documentos mais relevantes

### Histórico

- Últimas 6 mensagens enviadas como contexto para a IA
- Conversas persistidas no localStorage do browser
- Cada conversa tem título, mensagens e timestamps

## 6. Segurança

- API key nunca exposta ao frontend
- Validação de tamanho de mensagem (máx 2000 chars)
- Respostas baseadas exclusivamente nos documentos (anti-alucinação)
- `.env.local` no `.gitignore`

## 7. Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Backend | Next.js API Routes |
| IA | OpenAI GPT-4o-mini |
| Armazenamento | Arquivos MD + localStorage |
| Deploy | Vercel |

## 8. Passo a Passo de Desenvolvimento

### Fase 1 — Planejamento
- [x] Definir empresa fictícia (TechCorp)
- [x] Definir stack (Next.js + OpenAI)
- [x] Criar repositório

### Fase 2 — Setup
- [x] Criar projeto Next.js
- [x] Instalar dependências (openai)
- [x] Estruturar pastas

### Fase 3 — Base de Conhecimento
- [x] Criar 9 documentos markdown
- [x] Implementar `knowledge-base.ts`
- [x] Implementar busca por relevância

### Fase 4 — Backend
- [x] Implementar `ai.ts` (cliente OpenAI)
- [x] Criar API `/api/chat`
- [x] Criar API `/api/documents`
- [x] Criar API `/api/summarize`

### Fase 5 — Frontend
- [x] Componente Chat
- [x] Componente Sidebar
- [x] Componente MessageBubble
- [x] Componente SourceCitation
- [x] Histórico no localStorage

### Fase 6 — Documentação
- [x] README.md
- [x] SPECS.md
- [x] ENTREGA.md
- [x] PARTE-TEORICA.md

### Fase 7 — Deploy
- [ ] Push para GitHub
- [ ] Deploy na Vercel
- [ ] Configurar env vars
- [ ] Testar link público

### Fase 8 — Entrega
- [ ] Screenshots da aplicação
- [ ] Documento teórico (PDF)
- [ ] Evidências de IA no desenvolvimento
- [ ] Vídeo pitch (até 4 min)
