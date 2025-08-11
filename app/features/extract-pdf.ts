// app/features/extract-pdf.ts
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Convert Node.js Buffer to Uint8Array for browser compatibility
  const uint8Array = new Uint8Array(buffer);

  const formData = new FormData();
  formData.append(
    "file",
    new Blob([uint8Array], { type: "application/pdf" }),
    "uploaded.pdf"
  );

  const res = await fetch(
    "https://extract-pdf-54tr.onrender.com/extract-text",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error(`FastAPI request failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data.content;
}
