# Checklist de Entrega — IA Generativa Aplicada ao Desenvolvimento

## Entregáveis Obrigatórios

### 1. Parte Teórica (Documento PDF/DOCX)

- [ ] Contextualização do problema
- [ ] Descrição da solução desenvolvida
- [ ] Ferramentas de IA utilizadas durante o desenvolvimento
- [ ] Como a IA auxiliou na criação da aplicação (com prints)
- [ ] Como agentes, automações ou gerenciamento de contexto foram utilizados
- [ ] Benefícios obtidos e limitações encontradas
- [ ] Aspectos éticos, responsabilidade e governança da IA
- [ ] Exemplo de solução existente no mercado (Glean, Notion AI, etc.)

> Template disponível em [`PARTE-TEORICA.md`](./PARTE-TEORICA.md)

### 2. Parte Prática (Aplicação + README)

- [ ] Repositório no GitHub
- [ ] Aplicação publicada e acessível (link Vercel)
- [ ] Interface funcional com chat
- [ ] Consulta em linguagem natural funcionando
- [ ] Base de conhecimento com 9 documentos
- [ ] Evidências do uso de IA no desenvolvimento (`docs/evidencias-ia/`)
- [ ] IA como funcionalidade principal (Google Gemini 3.1 Flash-Lite)
- [ ] README.md completo com prints

#### Diferenciais Implementados

- [x] Histórico de conversas (localStorage)
- [x] Categorias de documentos com perguntas sugeridas
- [x] API de resumo de documentos
- [x] Citação de fontes nas respostas
- [ ] MCP (Model Context Protocol) — opcional

### 3. Vídeo Pitch (até 4 minutos)

- [ ] Problema proposto (0:00–0:45)
- [ ] Solução desenvolvida (0:45–1:30)
- [ ] Demonstração da aplicação (1:30–2:45)
- [ ] Como a IA foi usada no desenvolvimento (2:45–3:30)
- [ ] Desafios e aprendizados (3:30–4:00)
- [ ] Publicado no YouTube/Loom/Drive
- [ ] Link testado e acessível

## Roteiro do Vídeo

```
0:00 - "Empresas possuem centenas de documentos internos..."
0:45 - "Apresento o CorpPilot, um copiloto corporativo..."
1:30 - [Demo ao vivo] "Vou perguntar sobre a política de férias..."
2:45 - "Usei o Cursor para gerar componentes, a API do Google Gemini..."
3:30 - "O maior desafio foi... Aprendi que..."
4:00 - "Obrigado! Link na descrição."
```

## Evidências de IA no Desenvolvimento

Salve prints das conversas com ferramentas de IA em `docs/evidencias-ia/`:

| Arquivo | Descrição |
|---------|-----------|
| `cursor-componentes.png` | Cursor gerando componentes React |
| `cursor-api.png` | Cursor criando API routes |
| `cursor-docs.png` | Cursor criando documentos da base |
| `chatgpt-prompts.png` | ChatGPT ajudando com prompts |
| `resultado-final.png` | Aplicação funcionando |

## Screenshots da Aplicação

Salve em `public/screenshots/`:

| Arquivo | Descrição |
|---------|-----------|
| `chat.png` | Tela inicial com perguntas sugeridas |
| `resposta.png` | Resposta com fontes citadas |
| `sidebar.png` | Sidebar com categorias e histórico |
| `categoria.png` | Filtro por categoria |
| `historico.png` | Histórico de conversas |

## Deploy

### Passos para Vercel

1. ```bash
   git add .
   git commit -m "feat: CorpPilot - copiloto corporativo com IA"
   git push origin main
   ```

2. Acesse [vercel.com](https://vercel.com) → Import Project → selecione o repo

3. Configure Environment Variables:
   - `GEMINI_API_KEY` = sua chave Gemini

4. Deploy → copie o link e atualize o README

## Formato de Entrega Final

Organize os 3 entregáveis:

```
entrega/
├── 1-parte-teorica/
│   └── CorpPilot-Parte-Tecnica.pdf
├── 2-parte-pratica/
│   ├── link-vercel.txt
│   └── link-github.txt
└── 3-video-pitch/
    └── link-youtube.txt
```

## Prazos Sugeridos

| Etapa | Tempo estimado | Status |
|-------|---------------|--------|
| Desenvolvimento da aplicação | 4-6h | ✅ Concluído |
| Base de conhecimento | 2h | ✅ Concluído |
| Documentação técnica | 1h | ✅ Concluído |
| Deploy | 1h | ⏳ Pendente |
| Documento teórico | 3-4h | ⏳ Pendente |
| Screenshots e evidências | 1h | ⏳ Pendente |
| Vídeo pitch | 1-2h | ⏳ Pendente |
