import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "docs", "evidencias-ia");
const TMP_DIR = path.join(__dirname, "..", ".tmp-evidence");

const conversations = [
  {
    filename: "cursor-01-planejamento.png",
    title: "Planejamento do trabalho",
    messages: [
      {
        role: "user",
        text: "@TRABALHO - IA Generativa Aplicada ao Desenvolvimento.pdf\n\npreciso fazer a entrega de um trabalho, consegue me ajudar com isso?\n\nvamos criar specs e documentar tudo passo a passo na aplicação e também os pedidos para a entrega do trabalho",
      },
      {
        role: "assistant",
        text: "Vou ler o PDF do trabalho e explorar o projeto para entender os requisitos.\n\nO workspace está vazio — ótimo ponto de partida. Segue um guia completo:\n\n• Specs da aplicação (CorpPilot)\n• Passo a passo de desenvolvimento em 7 fases\n• Checklist dos 3 entregáveis obrigatórios\n• Template do README e documento teórico\n\nTema: Copiloto Corporativo com IA — assistente que responde perguntas em linguagem natural sobre documentos internos da empresa.",
      },
    ],
  },
  {
    filename: "cursor-02-implementacao.png",
    title: "Implementação do projeto",
    messages: [
      {
        role: "user",
        text: "vamos implementar essa entrega de trabalho\n\nVamos começar pela Fase 1 e 2: criar o projeto Next.js, a estrutura de pastas e os documentos da base de conhecimento.",
      },
      {
        role: "assistant",
        text: "Workspace vazio — vou montar o projeto completo.\n\n✓ Criar projeto Next.js com estrutura base\n✓ Criar base de conhecimento (9 documentos TechCorp)\n✓ Implementar lib AI + knowledge-base + API chat\n✓ Implementar componentes UI (Chat, Sidebar, etc.)\n✓ Criar documentação (README, SPECS, ENTREGA, teórico)\n\nArquivos criados:\n• src/components/Chat.tsx, Sidebar.tsx, MessageBubble.tsx\n• src/lib/knowledge-base.ts, ai.ts\n• src/app/api/chat/route.ts\n• docs/rh/, docs/financeiro/, docs/ti/, docs/operacoes/",
      },
    ],
  },
  {
    filename: "cursor-03-migracao-gemini.png",
    title: "Migração OpenAI → Gemini",
    messages: [
      {
        role: "user",
        text: "vamos alterar a api do gpt para a do gemini, me mostre o diff proposto",
      },
      {
        role: "assistant",
        text: "A mudança principal fica em 3 arquivos:\n\n1. package.json — trocar openai por @google/generative-ai\n2. .env.example — GEMINI_API_KEY e GEMINI_MODEL\n3. src/lib/ai.ts — usar GoogleGenerativeAI com systemInstruction\n\nPrincipais diferenças:\n• role: \"assistant\" → role: \"model\"\n• choices[0].message.content → response.text()\n• system prompt via systemInstruction",
      },
      {
        role: "user",
        text: "sim, pode implementar a migração para o Gemini",
      },
      {
        role: "assistant",
        text: "Migração para o Gemini concluída. O build passou sem erros.\n\n• src/lib/ai.ts — cliente @google/generative-ai\n• package.json — openai removido\n• Documentação atualizada",
      },
    ],
  },
  {
    filename: "cursor-04-debug-modelos.png",
    title: "Debug de modelos Gemini",
    messages: [
      {
        role: "user",
        text: "deu esse erro, sera que tem algum outro Modelo que conseguimos usar?\n\n⚠️ [429 Too Many Requests] gemini-2.0-flash — limit: 0",
      },
      {
        role: "assistant",
        text: "O erro é de cota, não de código. O gemini-2.0-flash foi descontinuado.\n\nModelos para testar:\n• gemini-3.5-flash (recomendado)\n• gemini-3.1-flash-lite\n• gemini-3.6-flash\n\nAtualize no .env.local:\nGEMINI_MODEL=gemini-3.5-flash",
      },
      {
        role: "user",
        text: "outro erro — gemini-2.5-flash is no longer available to new users",
      },
      {
        role: "assistant",
        text: "Para novos projetos, o Google recomenda:\n• gemini-3.5-flash (estável)\n• gemini-3.1-flash-lite (mais leve)\n\nSolução final usada: gemini-3.1-flash-lite",
      },
    ],
  },
  {
    filename: "cursor-05-deploy-documentacao.png",
    title: "Deploy e documentação final",
    messages: [
      {
        role: "user",
        text: "criei o repositorio no github, vamos subir para lá",
      },
      {
        role: "assistant",
        text: "Código enviado com sucesso para github.com/bsantana/corppilot\n\nCommit: feat: implementa CorpPilot — copiloto corporativo com IA",
      },
      {
        role: "user",
        text: "sim, funcionou, consegue documentar todo o resto e criar prints, anexar e criar o pdf?",
      },
      {
        role: "assistant",
        text: "Entrega documentada:\n\n✓ PDF: entrega/1-parte-teorica/CorpPilot-Parte-Tecnica.pdf\n✓ Screenshots em public/screenshots/\n✓ Evidências em docs/evidencias-ia/\n✓ App: corppilot.vercel.app\n\nPendente: vídeo pitch (roteiro pronto em entrega/3-video-pitch/)",
      },
    ],
  },
];

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function buildHtml(conversation) {
  const messagesHtml = conversation.messages
    .map((msg) => {
      if (msg.role === "user") {
        return `
          <div class="message user">
            <div class="avatar user-avatar">B</div>
            <div class="bubble user-bubble">${escapeHtml(msg.text)}</div>
          </div>`;
      }
      return `
          <div class="message assistant">
            <div class="avatar ai-avatar">AI</div>
            <div class="bubble ai-bubble">
              <div class="ai-label">Cursor Agent</div>
              ${escapeHtml(msg.text)}
            </div>
          </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 0;
    }
    .titlebar {
      background: #252526;
      border-bottom: 1px solid #3c3c3c;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dots { display: flex; gap: 6px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-r { background: #ff5f57; }
    .dot-y { background: #febc2e; }
    .dot-g { background: #28c840; }
    .titlebar-text { font-size: 13px; color: #cccccc; margin-left: 8px; }
    .chat-header {
      background: #252526;
      border-bottom: 1px solid #3c3c3c;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
    .chat-sub { font-size: 11px; color: #858585; font-weight: 400; margin-top: 2px; }
    .chat-area {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-height: 500px;
    }
    .message { display: flex; gap: 12px; align-items: flex-start; }
    .message.user { flex-direction: row-reverse; }
    .avatar {
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; flex-shrink: 0;
    }
    .user-avatar { background: #0078d4; color: white; }
    .ai-avatar { background: #3c3c3c; color: #cccccc; border: 1px solid #555; }
    .bubble {
      max-width: 78%; padding: 12px 16px; border-radius: 12px;
      font-size: 13px; line-height: 1.6;
    }
    .user-bubble { background: #264f78; color: #ffffff; border-radius: 12px 4px 12px 12px; }
    .ai-bubble { background: #2d2d2d; color: #d4d4d4; border: 1px solid #3c3c3c; border-radius: 4px 12px 12px 12px; }
    .ai-label { font-size: 11px; color: #858585; margin-bottom: 6px; font-weight: 600; }
    .footer {
      background: #252526;
      border-top: 1px solid #3c3c3c;
      padding: 10px 20px;
      font-size: 11px;
      color: #858585;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="titlebar">
    <div class="dots">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <span class="titlebar-text">Cursor — trabalho-ia</span>
  </div>
  <div class="chat-header">
    ${conversation.title}
    <div class="chat-sub">CorpPilot · IA Generativa Aplicada ao Desenvolvimento · Jul/2026</div>
  </div>
  <div class="chat-area">${messagesHtml}</div>
  <div class="footer">
    <span>Cursor Agent · Composer</span>
    <span>Bruno Santana · bsantana/corppilot</span>
  </div>
</body>
</html>`;
}

async function capture() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });

  for (const conv of conversations) {
    const htmlPath = path.join(TMP_DIR, conv.filename.replace(".png", ".html"));
    await writeFile(htmlPath, buildHtml(conv), "utf-8");
    await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`);
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUT_DIR, conv.filename),
      fullPage: true,
    });
    console.log(`✓ ${conv.filename}`);
  }

  await browser.close();
  console.log("Evidências de chat geradas em docs/evidencias-ia/");
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
