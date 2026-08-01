# Roteiro do Vídeo Pitch — CorpPilot (até 4 minutos)

**Autor:** Bruno Santana  
**Aplicação:** https://corppilot.vercel.app

> Grave seguindo este roteiro e publique no YouTube (não listado), Loom ou Google Drive.
> Depois cole o link em `link-video.txt` nesta pasta.

---

## 0:00 – 0:45 | O Problema

"Empresas em crescimento possuem centenas de documentos internos — políticas, procedimentos, benefícios — espalhados em planilhas, PDFs e pastas compartilhadas. Colaboradores perdem tempo todos os dias procurando respostas para dúvidas simples como 'qual é a política de férias?' ou 'como solicito reembolso?'. Isso gera retrabalho e reduz a produtividade."

---

## 0:45 – 1:30 | A Solução

"Para resolver isso, desenvolvi o CorpPilot — um copiloto corporativo com IA. É um assistente inteligente que permite colaboradores consultarem informações da empresa em linguagem natural. A aplicação usa a API do Google Gemini para entender perguntas e responder com base em documentos internos, citando sempre a fonte consultada."

---

## 1:30 – 2:45 | Demonstração ao Vivo

[Abrir https://corppilot.vercel.app]

"Vou demonstrar agora. Na tela inicial, temos perguntas sugeridas por categoria — RH, Financeiro, TI e Operações."

[Clicar em "Qual é a política de férias?"]

"A IA consulta a base de conhecimento e retorna uma resposta detalhada, com citação da fonte — neste caso, o documento de Política de Férias do RH."

[Fazer segunda pergunta na mesma conversa]

"O histórico de conversas é mantido, permitindo perguntas de acompanhamento."

[Mostrar sidebar com categorias]

"A sidebar organiza os documentos por área e mantém o histórico de conversas anteriores."

---

## 2:45 – 3:30 | IA no Desenvolvimento

"Todo o projeto foi desenvolvido com assistência de IA generativa. Usei o Cursor em modo Agent para gerar componentes React, API routes, a base de conhecimento com 9 documentos corporativos e toda a documentação. A IA não foi apenas a funcionalidade do produto — foi minha parceira em todo o processo de desenvolvimento, acelerando a entrega em pelo menos 5 vezes."

---

## 3:30 – 4:00 | Desafios e Encerramento

"O maior desafio foi a instabilidade dos modelos Gemini no free tier — tive que migrar de OpenAI para Gemini e testar vários modelos até encontrar um que funcionasse. Também corrigi um bug no histórico de conversas exigido pela API do Google. Aprendi que IA assistida acelera muito o desenvolvimento, mas revisão humana e testes continuam essenciais. Obrigado! Link da aplicação e do repositório na descrição."

---

## Links para a descrição do vídeo

- Aplicação: https://corppilot.vercel.app
- GitHub: https://github.com/bsantana/corppilot
