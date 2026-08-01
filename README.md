# CorpPilot — Copiloto Corporativo com IA

Assistente inteligente que permite colaboradores da **TechCorp** consultarem informações corporativas em linguagem natural.

Repositório: [github.com/bsantana/corppilot](https://github.com/bsantana/corppilot)

## Demo

🔗 [Acesse a aplicação](https://seu-link.vercel.app) *(atualize após deploy)*

## Screenshots

> Adicione screenshots em `public/screenshots/` após testar a aplicação.

| Tela | Descrição |
|------|-----------|
| `chat.png` | Interface principal do chat |
| `resposta.png` | Resposta com citação de fontes |
| `sidebar.png` | Sidebar com categorias e histórico |

## Tecnologias

- **Next.js 16** — Framework React com App Router
- **TypeScript** — Tipagem estática
- **Tailwind CSS 4** — Estilização
- **Google Gemini 3.1 Flash-Lite** — Modelo de linguagem (funcionalidade principal)
- **Vercel** — Deploy e hospedagem

## Ferramentas de IA no Desenvolvimento

| Ferramenta | Uso no Projeto |
|------------|----------------|
| **Cursor** | Geração de componentes, API routes, base de conhecimento, documentação |
| **Google Gemini API** | Funcionalidade principal do produto (chat com RAG) |
| **ChatGPT/Claude** | Criação dos documentos corporativos simulados |

Evidências de uso de IA durante o desenvolvimento estão em [`docs/evidencias-ia/`](./docs/evidencias-ia/).

## Funcionalidades

- ✅ Chat em linguagem natural
- ✅ Base de conhecimento com 9 documentos corporativos (RH, Financeiro, TI, Operações)
- ✅ Citação de fontes nas respostas
- ✅ Histórico de conversas (localStorage)
- ✅ Categorias de documentos com perguntas sugeridas
- ✅ API de resumo de documentos
- ✅ Busca semântica simples por relevância

## Como Executar Localmente

```bash
git clone https://github.com/bsantana/corppilot
cd trabalho-ia
npm install
cp .env.example .env.local
```

Edite `.env.local` e adicione sua `GEMINI_API_KEY`:

```
GEMINI_API_KEY=sua-chave-aqui
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Base de Conhecimento

Documentos fictícios da empresa **TechCorp** em `/docs`:

```
docs/
├── rh/
│   ├── politica-ferias.md
│   ├── beneficios.md
│   └── codigo-conduta.md
├── financeiro/
│   ├── reembolso-despesas.md
│   └── politica-viagens.md
├── ti/
│   ├── acesso-sistemas.md
│   └── seguranca-informacao.md
└── operacoes/
    ├── onboarding.md
    └── procedimentos-gerais.md
```

## Estrutura do Projeto

```
trabalho-ia/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        # Endpoint do chat com IA
│   │   │   ├── documents/route.ts   # Lista documentos
│   │   │   └── summarize/route.ts   # Resumo de documentos
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Chat.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── Sidebar.tsx
│   │   └── SourceCitation.tsx
│   └── lib/
│       ├── ai.ts                    # Cliente Gemini
│       ├── knowledge-base.ts        # Carrega e busca documentos
│       └── types.ts
├── docs/                            # Base de conhecimento + documentação
├── public/screenshots/              # Prints para entrega
└── .env.example
```

## Deploy (Vercel)

1. Faça push para o GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure a variável de ambiente `GEMINI_API_KEY`
4. Deploy automático a cada push

## Documentação de Entrega

- [`docs/SPECS.md`](./docs/SPECS.md) — Especificação técnica da aplicação
- [`docs/ENTREGA.md`](./docs/ENTREGA.md) — Checklist completo de entrega
- [`docs/PARTE-TEORICA.md`](./docs/PARTE-TEORICA.md) — Template do documento teórico

## Autor

Bruno Santana — IA Generativa Aplicada ao Desenvolvimento
