import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Mensagem muito longa (máximo 2000 caracteres)" },
        { status: 400 }
      );
    }

    const result = await generateChatResponse(message, history);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
