import { extractTextFromPdf } from "@/app/features/extract-pdf";
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
    console.log(embeddings);
    return NextResponse.json({ message: "file embedding created" });
  } catch {
    return NextResponse.json(
      { message: "error fetching file" },
      { status: 400 }
    );
  }
}
