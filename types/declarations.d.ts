declare module "pdf-parse" {
  import { Buffer } from "buffer";

  interface PDFInfo {
    pdfInfo: any;
    metadata?: any;
    text: string;
    version: string;
  }

  function pdfParse(buffer: Buffer): Promise<PDFInfo>;
  export default pdfParse;
}

declare module "pdf-parse/lib/pdf-parse.js" {
  import { Buffer } from "buffer";

  interface PDFInfo {
    pdfInfo: any;
    metadata?: any;
    text: string;
    version: string;
  }

  function pdfParse(buffer: Buffer): Promise<PDFInfo>;
  export default pdfParse;
}
