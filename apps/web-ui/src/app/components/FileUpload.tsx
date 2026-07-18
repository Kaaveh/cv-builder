"use client";

import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { type DragEvent, useRef, useState } from "react";

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50 MB
const PDF_TIMEOUT_MS = 60_000; // 60 seconds

// Resolved once at module load so the pdfjs worker URL is not reconstructed
// on every PDF drop. `import.meta.url` is evaluated synchronously when the
// module graph is built.
const PDF_WORKER_URL = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface FileUploadProps {
  inputId: string;
  onContentLoaded: (content: string) => void;
}

export function FileUpload({ inputId, onContentLoaded }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);
  const [status, setStatus] = useState("");

  // True if a newer upload has started and we should stop touching state.
  const isStale = (requestId: number) => requestId !== requestIdRef.current;

  async function processFile(file: File) {
    const requestId = ++requestIdRef.current;
    setStatus("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "";

    if (extension === "txt" || extension === "md") {
      try {
        const text = await file.text();
        if (isStale(requestId)) return;
        onContentLoaded(text);
        setStatus(`Loaded ${file.name}`);
      } catch (error) {
        console.error("Failed to read file:", error);
        if (isStale(requestId)) return;
        setStatus("Failed to read file. Please try again.");
      }
      return;
    }

    if (extension === "pdf") {
      if (file.size > MAX_PDF_SIZE) {
        setStatus(
          `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum size is ${MAX_PDF_SIZE / (1024 * 1024)} MB.`
        );
        return;
      }

      // A timeout flag (rather than `Promise.race`) so we can also release
      // pdfjs resources on expiry. With `Promise.race` the underlying
      // extraction keeps running to completion, leaving the worker to process
      // pages nobody will ever read.
      let timedOut = false;
      let loadingTask: PDFDocumentLoadingTask | undefined;
      let pdfDoc: PDFDocumentProxy | undefined;
      const timeoutHandle = setTimeout(() => {
        timedOut = true;
        // destroy() before the doc loads cancels the load; after, it
        // releases the worker reference. Swallow rejection — cleanup is
        // best-effort.
        loadingTask?.destroy().catch(() => {});
      }, PDF_TIMEOUT_MS);

      try {
        setStatus("Extracting text from PDF...");
        const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
        GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

        const arrayBuffer = await file.arrayBuffer();
        if (isStale(requestId) || timedOut) return;

        loadingTask = getDocument({ data: arrayBuffer });
        pdfDoc = await loadingTask.promise;
        if (isStale(requestId) || timedOut) return;

        // Capture in a local so the closure doesn't need a `!` assertion.
        const doc = pdfDoc;

        // Fetch pages concurrently — pdfjs's worker processes them in
        // parallel and pages are cached, so this is much faster than a
        // sequential loop for multi-page resumes.
        const pageTexts = await Promise.all(
          Array.from({ length: doc.numPages }, (_, i) => i + 1).map(
            async (pageNumber) => {
              const page = await doc.getPage(pageNumber);
              const content = await page.getTextContent();
              return content.items
                .map((item) =>
                  "str" in item && item.str != null ? String(item.str) : ""
                )
                .join(" ");
            }
          )
        );
        if (isStale(requestId) || timedOut) return;

        const fullText = pageTexts.join("\n\n");
        if (!fullText.trim()) {
          // pdfjs returns empty strings silently for scanned-image PDFs.
          // Surface it instead of accepting a blank resume for evaluation.
          setStatus(
            "PDF loaded, but no text was extracted. It may be a scanned image — try OCR or paste the text."
          );
          return;
        }

        onContentLoaded(fullText);
        setStatus(`Loaded ${file.name} (${pdfDoc.numPages} pages)`);
      } catch (error) {
        console.error("Failed to extract PDF text:", error);
        if (isStale(requestId)) return;
        if (timedOut) {
          setStatus(
            "PDF extraction took too long. The file may be complex or malformed — please try a smaller one."
          );
        } else {
          setStatus(
            "Failed to extract text from PDF. Please paste the content or upload a .txt or .md file."
          );
        }
      } finally {
        clearTimeout(timeoutHandle);
        // Best-effort cleanup. Errors are swallowed because we may already be
        // in error handling and a second throw would mask the original.
        await pdfDoc?.cleanup().catch(() => {});
        await loadingTask?.destroy().catch(() => {});
      }
      return;
    }

    setStatus("Unsupported file type. Please use .txt, .md, or .pdf.");
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    await processFile(files[0]);
  }

  async function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();

    await handleFiles(event.dataTransfer.files);
  }

  return (
    <>
      <button
        type="button"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className="mt-4 block w-full cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 p-6 text-center transition hover:border-zinc-500"
      >
        <p className="font-medium">Drag & Drop a file here</p>

        <p className="mt-2 text-sm text-zinc-500">Supports .txt, .md, and .pdf</p>

        <p
          id={`${inputId}-message`}
          role="status"
          aria-live="polite"
          className="mt-2 min-h-[1rem] text-xs text-amber-600"
        >
          {status}
        </p>
      </button>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".txt,.md,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );
}
