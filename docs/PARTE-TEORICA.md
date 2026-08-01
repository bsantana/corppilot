# CorpPilot: Copiloto Corporativo com IA

## Trabalho — IA Generativa Aplicada ao Desenvolvimento

> **Instruções:** Preencha cada seção abaixo, adicione prints das conversas com IA, e exporte como PDF ou DOCX para entrega.

---

### 1. Contextualização do Problema

A TechCorp é uma empresa de tecnologia em crescimento com centenas de documentos internos espalhados entre planilhas, PDFs, apresentações, procedimentos operacionais, treinamentos e políticas corporativas. Embora essas informações existam, elas não estão facilmente acessíveis para os colaboradores.

Diariamente, profissionais de diferentes áreas perdem tempo procurando respostas para dúvidas recorrentes — como "qual é a política de férias?", "como solicito reembolso?" ou "quais benefícios tenho direito?" — consultando colegas, enviando mensagens em grupos internos ou buscando documentos antigos em pastas compartilhadas.

Esse cenário gera retrabalho, reduz produtividade e dificulta a disseminação do conhecimento dentro da organização. Segundo pesquisas do McKinsey, funcionários gastam em média 1,8 horas por dia buscando informações, representando uma perda significativa de produtividade.

**[Adicione mais contexto sobre o impacto no negócio e cite fontes se possível]**

---

### 2. Solução Desenvolvida

O **CorpPilot** é um copiloto corporativo inteligente que permite colaboradores consultarem informações organizacionais através de perguntas em linguagem natural. A solução simula a experiência de assistentes de IA utilizados por grandes empresas como Google (Gemini), Microsoft (Copilot) e Salesforce (Einstein).

#### Arquitetura

A aplicação foi construída com Next.js 16 (React + TypeScript) e utiliza a API da OpenAI (GPT-4o-mini) como motor de IA. A base de conhecimento consiste em 9 documentos markdown organizados por categorias (RH, Financeiro, TI e Operações).

O fluxo funciona assim:
1. O colaborador faz uma pergunta no chat
2. O sistema identifica os documentos mais relevantes via busca semântica
3. Os documentos são injetados no contexto do LLM via system prompt
4. A IA gera uma resposta baseada exclusivamente nos documentos
5. As fontes consultadas são exibidas junto à resposta

#### Funcionalidades

- Chat em linguagem natural
- Base de conhecimento com 9 documentos corporativos
- Citação de fontes nas respostas
- Histórico de conversas
- Categorias com perguntas sugeridas
- API de resumo de documentos

**[Adicione screenshot da aplicação aqui]**

---

### 3. Ferramentas de IA Utilizadas

| Ferramenta | Uso no Projeto | Link |
|------------|---------------|------|
| **Cursor** | Desenvolvimento assistido: geração de componentes, API routes, lógica de negócio | [cursor.com](https://cursor.com) |
| **OpenAI API** | Funcionalidade principal: chat com contexto de documentos | [platform.openai.com](https://platform.openai.com) |
| **ChatGPT** | Criação da base de conhecimento e engenharia de prompts | [chat.openai.com](https://chat.openai.com) |

#### Exemplo de Solução Existente no Mercado

**Glean** (glean.com) — Plataforma enterprise de busca com IA que conecta-se a todas as ferramentas da empresa (Google Workspace, Slack, Jira) e permite perguntas em linguagem natural. O CorpPilot segue conceito similar, porém focado em documentos internos de uma empresa fictícia.

**[Adicione comparação com Notion AI, Microsoft Copilot, ou outra solução]**

---

### 4. Como a IA Auxiliou na Criação da Aplicação

#### Geração de Código com Cursor

A maior parte do código foi gerada com assistência do Cursor em modo Agent:

- **Componentes React:** O Cursor gerou os componentes `Chat.tsx`, `Sidebar.tsx`, `MessageBubble.tsx` e `SourceCitation.tsx` a partir de descrições em linguagem natural.
- **API Routes:** Endpoints `/api/chat`, `/api/documents` e `/api/summarize` foram criados pelo Cursor seguindo as especificações.
- **Lógica de negócio:** O módulo `knowledge-base.ts` com busca por relevância e montagem de system prompt foi gerado assistido.

**[INSIRA PRINT: Conversa com Cursor gerando componentes]**

#### Criação da Base de Conhecimento

Os 9 documentos corporativos da TechCorp foram criados com assistência de IA, garantindo conteúdo realista e consistente em tom corporativo brasileiro.

**[INSIRA PRINT: Conversa com IA criando documentos]**

#### Engenharia de Prompts

O system prompt do CorpPilot foi refinado iterativamente:
- Primeira versão: respostas genéricas sem citação de fontes
- Segunda versão: adicionada instrução de citar fontes
- Versão final: regra de "responder apenas com base nos documentos" para reduzir alucinações

**[INSIRA PRINT: Evolução dos prompts]**

---

### 5. Agentes, Automações e Gerenciamento de Contexto

#### Gerenciamento de Contexto

O CorpPilot utiliza uma estratégia de contexto em camadas:

1. **System Prompt:** Define a persona, regras e documentos relevantes
2. **Histórico:** Últimas 6 mensagens da conversa como contexto
3. **Busca de Relevância:** Seleciona os 4 documentos mais relevantes para cada pergunta

#### Automações

- Carregamento automático de documentos markdown do diretório `docs/`
- Parse automático de fontes citadas na resposta da IA
- Persistência automática do histórico no localStorage

#### Agentes (Conceito)

Embora não utilize um framework de agentes (como LangChain Agents), o CorpPilot implementa um fluxo agentico simplificado:
1. **Receber** a pergunta do usuário
2. **Buscar** documentos relevantes
3. **Raciocinar** com base no contexto
4. **Responder** com fontes

**[Mencione MCP se implementar: o Cursor utiliza MCP para conectar ferramentas externas]**

---

### 6. Benefícios e Limitações

| Benefícios | Limitações |
|-----------|-----------|
| Desenvolvimento 5-10x mais rápido com IA assistida | Dependência de API externa (custo por requisição) |
| Código consistente e bem estruturado | Busca semântica simples (não usa embeddings vetoriais) |
| Base de conhecimento realista gerada por IA | Respostas limitadas aos documentos carregados |
| Prototipagem rápida (MVP em horas) | Sem autenticação de usuários |
| Documentação gerada automaticamente | Alucinações possíveis em perguntas fora do escopo |
| Redução de tempo de busca de informações | Histórico apenas no browser (localStorage) |

---

### 7. Aspectos Éticos, Responsabilidade e Governança

#### Privacidade de Dados
- Documentos corporativos são fictícios (empresa simulada)
- API key armazenada em variáveis de ambiente, nunca exposta ao frontend
- Nenhum dado pessoal real é processado

#### Transparência
- A interface indica claramente que as respostas são geradas por IA
- Fontes consultadas são exibidas em cada resposta
- Disclaimer na parte inferior do chat

#### OWASP Top 10 for LLM Applications
- **LLM01 (Prompt Injection):** System prompt com regras rígidas de comportamento
- **LLM02 (Insecure Output):** Respostas renderizadas como texto, sem execução de HTML
- **LLM06 (Sensitive Info Disclosure):** API key protegida server-side
- **LLM09 (Overreliance):** Disclaimer sobre verificar informações com departamentos

#### Governança
- Respostas baseadas exclusivamente em documentos aprovados
- Instrução explícita para não inventar informações
- Recomendação de contato com departamentos para casos não cobertos

---

### 8. Referências

- Lovable — https://lovable.dev
- GitHub Copilot — https://github.com/features/copilot
- Model Context Protocol — https://modelcontextprotocol.io
- OpenAI Documentation — https://platform.openai.com/docs
- OWASP Top 10 for LLM — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Glean (solução de mercado) — https://www.glean.com
- McKinsey — Knowledge Worker Productivity Research

---

> **Próximo passo:** Exporte este documento como PDF, adicione os prints das conversas com IA, e inclua na entrega.
