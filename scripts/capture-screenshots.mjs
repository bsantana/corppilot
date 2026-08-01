import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "screenshots");
const EVIDENCIAS_DIR = path.join(__dirname, "..", "docs", "evidencias-ia");
const BASE_URL = process.env.SCREENSHOT_URL || "https://corppilot.vercel.app";

async function capture() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(EVIDENCIAS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  console.log(`Acessando ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });

  await page.screenshot({ path: path.join(OUT_DIR, "chat.png"), fullPage: false });
  console.log("✓ chat.png");

  await page.screenshot({ path: path.join(OUT_DIR, "sidebar.png"), fullPage: false });
  console.log("✓ sidebar.png");

  const suggested = page.locator("button").filter({ hasText: "política de férias" }).first();
  if (await suggested.count()) {
    await suggested.click();
  } else {
    const input = page.locator("textarea").first();
    await input.fill("Qual é a política de férias?");
    await page.locator("button", { hasText: "Enviar" }).click();
  }

  await page.waitForTimeout(8000);

  await page.screenshot({ path: path.join(OUT_DIR, "resposta.png"), fullPage: false });
  console.log("✓ resposta.png");

  await page.locator("button", { hasText: "RH" }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT_DIR, "categoria.png"), fullPage: false });
  console.log("✓ categoria.png");

  await page.locator("button", { hasText: "Nova conversa" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT_DIR, "historico.png"), fullPage: false });
  console.log("✓ historico.png");

  await page.screenshot({
    path: path.join(EVIDENCIAS_DIR, "resultado-final.png"),
    fullPage: false,
  });
  console.log("✓ resultado-final.png");

  await browser.close();
  console.log("Screenshots capturados com sucesso!");
}

capture().catch((err) => {
  console.error("Erro ao capturar screenshots:", err.message);
  process.exit(1);
});
