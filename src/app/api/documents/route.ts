import { NextResponse } from "next/server";
import { loadDocuments } from "@/lib/knowledge-base";

export async function GET() {
  const documents = loadDocuments().map((doc) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    categoryLabel: doc.categoryLabel,
    path: doc.path,
  }));

  return NextResponse.json({ documents });
}
