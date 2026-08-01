# Evidências de Uso de IA no Desenvolvimento — CorpPilot

**Autor:** Bruno Santana  
**Ferramenta principal:** Cursor IDE (modo Agent)  
**Período:** Julho/2026

---

## Resumo

Todo o projeto CorpPilot foi desenvolvido com assistência de IA generativa. O Cursor atuou como copiloto de desenvolvimento, gerando código, documentação, base de conhecimento e auxiliando no deploy.

---

## 1. Planejamento e Especificação

**Prompt utilizado:**
> "Vamos implementar essa entrega de trabalho [PDF]. Criar specs e documentar tudo passo a passo."

**Resultado gerado pela IA:**
- `docs/SPECS.md` — Especificação técnica completa
- `docs/ENTREGA.md` — Checklist de entrega
- `docs/PARTE-TEORICA.md` — Documento teórico
- Estrutura de pastas do projeto

---

## 2. Setup do Projeto

**Comando executado via Cursor:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app
npm install @google/generative-ai
```

**Arquivos gerados:**
- `package.json`, `tsconfig.json`, estrutura Next.js App Router

---

## 3. Base de Conhecimento (9 documentos)

**Prompt utilizado:**
> "Crie 9 documentos markdown para empresa fictícia TechCorp: política de férias, benefícios, código de conduta, reembolso, viagens, acesso a sistemas, segurança, onboarding e procedimentos gerais."

**Arquivos gerados:**

| Arquivo | Categoria | Palavras |
|---------|-----------|----------|
| `docs/rh/politica-ferias.md` | RH | ~400 |
| `docs/rh/beneficios.md` | RH | ~450 |
| `docs/rh/codigo-conduta.md` | RH | ~350 |
| `docs/financeiro/reembolso-despesas.md` | Financeiro | ~400 |
| `docs/financeiro/politica-viagens.md` | Financeiro | ~380 |
| `docs/ti/acesso-sistemas.md` | TI | ~350 |
| `docs/ti/seguranca-informacao.md` | TI | ~400 |
| `docs/operacoes/onboarding.md` | Operações | ~350 |
| `docs/operacoes/procedimentos-gerais.md` | Operações | ~380 |

---

## 4. Componentes React

**Prompt utilizado:**
> "Implementar componentes UI: Chat, Sidebar, MessageBubble, SourceCitation"

**Arquivos gerados:**
- `src/components/Chat.tsx` — Chat principal com histórico localStorage
- `src/components/Sidebar.tsx` — Categorias e perguntas sugeridas
- `src/components/MessageBubble.tsx` — Bolhas de mensagem user/assistant
- `src/components/SourceCitation.tsx` — Badges de fontes

---

## 5. Backend e Integração com IA

**Prompt utilizado:**
> "Implementar lib AI + knowledge-base + API chat com Gemini"

**Arquivos gerados:**
- `src/lib/knowledge-base.ts` — Carrega docs, busca por relevância, monta system prompt
- `src/lib/ai.ts` — Cliente Google Gemini
- `src/lib/types.ts` — Tipos TypeScript
- `src/app/api/chat/route.ts` — Endpoint do chat
- `src/app/api/documents/route.ts` — Lista documentos
- `src/app/api/summarize/route.ts` — Resumo de documentos

---

## 6. Migração OpenAI → Gemini

**Contexto:** Migração solicitada para usar API gratuita do Google.

**Mudanças realizadas pela IA:**
- Substituição do pacote `openai` por `@google/generative-ai`
- Refatoração de `src/lib/ai.ts` para SDK do Gemini
- Atualização de variáveis de ambiente
- Correção do histórico de chat (bug `First content should be with role 'user'`)
- Testes com múltiplos modelos até `gemini-3.1-flash-lite` funcionar

---

## 7. Deploy

**Ações realizadas via Cursor:**
- Commit e push para `github.com/bsantana/corppilot`
- Orientação para configuração na Vercel
- Variáveis: `GEMINI_API_KEY`, `GEMINI_MODEL=gemini-3.1-flash-lite`
- Deploy em produção: https://corppilot.vercel.app

---

## 8. Resultado Final

Aplicação publicada e funcional. Screenshot em `resultado-final.png`.

**Teste realizado:**
- Pergunta: "Qual é a política de férias?"
- Resposta: Detalhamento completo com citação da fonte "Política de Férias (RH)"
- Segunda pergunta na mesma conversa: funcionando após correção do histórico

---

## Arquivos de Evidência Visual

| Arquivo | Descrição |
|---------|-----------|
| `resultado-final.png` | Aplicação em produção no corppilot.vercel.app |
| `../public/screenshots/chat.png` | Tela inicial |
| `../public/screenshots/resposta.png` | Resposta com fontes |
| `../public/screenshots/sidebar.png` | Sidebar com categorias |
