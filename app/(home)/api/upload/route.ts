import { extractTextFromPdf } from "@/app/features/extract-pdf";
import pool from "@/lib/pg-db";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  const bufferArray = await file.arrayBuffer();
  const buffer = Buffer.from(bufferArray);

  try {
    let text = "";
    if (file.name.endsWith(".pdf")) {
      text = await extractTextFromPdf(buffer);
    } else {
      text = buffer.toString("utf8");
    }
    const textArr = [];
    for (let i = 0; i < text.length; i += 500) {
      textArr.push(text.slice(i, i + 500));
    }
    const embeddings = await Promise.all(
      textArr.map(async (txt) => {
        const { embedding } = await embed({
          model: openai.textEmbeddingModel("text-embedding-3-small"),
          value: txt,
        });
        return embedding;
      })
    );

    // push in db
    for (let i = 0; i < embeddings.length; i++) {
      await pool.query(
        "INSERT INTO rag_documents(content,embedding) VALUES($1,$2)",
        [textArr[i], `[${embeddings[i].join(",")}]`]
      );
    }
    return NextResponse.json(
      { message: "Embeddings stored successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "error fetching data" });
  }
}
