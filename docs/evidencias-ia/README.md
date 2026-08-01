# Evidências de Uso de IA no Desenvolvimento

Documentação completa em [`DESENVOLVIMENTO.md`](./DESENVOLVIMENTO.md).

## Prints reais do Cursor (capturados durante o desenvolvimento)

| Arquivo | Descrição |
|---------|-----------|
| `cursor-real-01-visao-geral.png` | Visão geral do projeto, funcionalidades e estrutura gerada pela IA |
| `cursor-real-02-migracao-gemini.png` | Conversa sobre migração OpenAI → Gemini com diff proposto |
| `cursor-real-03-erro-quota-gemini.png` | Debug de erro 429 — quota do gemini-2.0-flash esgotada |
| `cursor-real-04-modelos-disponiveis.png` | Consulta aos modelos Gemini disponíveis na documentação oficial |
| `cursor-real-05-bug-historico.png` | Correção do bug de histórico do chat (`role 'user', got model`) |
| `cursor-real-06-fluxo-rag.png` | Explicação do fluxo RAG — como o LLM consulta os documentos |
| `resultado-final.png` | Aplicação em produção (corppilot.vercel.app) |

## Prints complementares (gerados a partir do histórico)

| Arquivo | Descrição |
|---------|-----------|
| `cursor-01-planejamento.png` | Planejamento inicial do trabalho e specs |
| `cursor-02-implementacao.png` | Implementação do projeto Next.js e componentes |
| `cursor-03-migracao-gemini.png` | Migração da API OpenAI para Google Gemini |
| `cursor-04-debug-modelos.png` | Debug de modelos Gemini (quota e depreciação) |
| `cursor-05-deploy-documentacao.png` | Push GitHub, deploy Vercel e documentação final |

## Como regenerar os prints complementares

```bash
npm run evidence:chat
```
