import { NextRequest, NextResponse } from "next/server";
import { generateDocumentSummary } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId } = body;

    if (!documentId || typeof documentId !== "string") {
      return NextResponse.json(
        { error: "ID do documento é obrigatório" },
        { status: 400 }
      );
    }

    const summary = await generateDocumentSummary(documentId);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summarize API error:", error);
    const message =
      error instanceof Error ? error.message : "Erro interno do servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
