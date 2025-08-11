import pool from "@/lib/pg-db";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, embed } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();
  if (!messages) {
    return NextResponse.json({ message: "user messages not found" });
  }
  let prompt: string | undefined;
  if (messages[0]?.parts[0]?.type === "text") {
    prompt = messages[0].parts[0].text;
  }

  if (!prompt) {
    return NextResponse.json({ message: "prompt not found" });
  }

  //MAKE EMBEDING OF PROMPT'

  const { embedding: queryEmbedding } = await embed({
    model: openai.textEmbeddingModel("text-embedding-3-small"),
    value: prompt,
  });

  const results = await pool.query(
    `SELECT content FROM rag_documents ORDER BY embedding <-> $1 LIMIT 5`,
    [`[${queryEmbedding.join(",")}]`]
  );
  //answe of the embedding that maches from db
  const context = results.rows.map((r) => r.content).join("\n\n");
  // Convert UIMessage[] → ModelMessage[]
  const modelMessages = convertToModelMessages(messages);
  const result = streamText({
    model: openai("gpt-4o"),
    messages: modelMessages,
    system: `You are an expert assistant. Use the following context to answer the user's question as clearly and concisely as possible.

If the context does not contain the answer, say so honestly. Do not make up information.

Keep the answer short, relevant, and helpful.

Context:
${context}`,
  });

  return result.toUIMessageStreamResponse();
}
