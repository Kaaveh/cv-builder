"use client";

import { type DragEvent, useRef, useState } from "react";

interface FileUploadProps {
  inputId: string;
  onContentLoaded: (content: string) => void;
}

export function FileUpload({ inputId, onContentLoaded }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  async function processFile(file: File) {
    setStatus("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "";

    if (extension === "txt" || extension === "md") {
      try {
        const text = await file.text();
        onContentLoaded(text);
        setStatus(`Loaded ${file.name}`);
      } catch (error) {
        console.error("Failed to read file:", error);
        setStatus("Failed to read file. Please try again.");
      }
      return;
    }

    if (extension === "pdf") {
      setStatus(
        "PDF text extraction isn't supported yet. Please paste the content or upload a .txt or .md file."
      );
      return;
    }

    setStatus("Unsupported file type. Please use .txt or .md.");
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

        <p className="mt-2 text-sm text-zinc-500">Supports .txt and .md</p>

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
        accept=".txt,.md"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );
}
