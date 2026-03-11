"use client";

import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfViewerProps = {
  file: string;
  title: string;
};

export default function PdfViewer({ file, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  const canPrev = pageNumber > 1;
  const canNext = pageNumber < numPages;

  const zoomLabel = useMemo(() => `${Math.round(scale * 100)}%`, [scale]);

  return (
    <section className="viewer-shadow w-full rounded-2xl bg-white p-3 md:p-5">
      <header className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">{title}</h2>
          <p className="text-sm text-slate-500">Leitura embutida no aplicativo</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((current) => Math.max(0.6, current - 0.1))}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="Reduzir zoom"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-14 text-center text-sm font-medium text-slate-700">{zoomLabel}</span>
          <button
            type="button"
            onClick={() => setScale((current) => Math.min(2.2, current + 0.1))}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:bg-slate-100"
            aria-label="Aumentar zoom"
          >
            <Plus size={16} />
          </button>

          <div className="mx-2 hidden h-7 w-px bg-slate-200 md:block" />

          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-slate-700">
            Página <strong>{pageNumber}</strong> de <strong>{numPages || "--"}</strong>
          </span>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setPageNumber((current) => Math.min(numPages, current + 1))}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div className="max-h-[72vh] overflow-auto rounded-xl bg-slate-100 p-2 md:p-4">
        <Document
          file={file}
          loading={<p className="p-6 text-center text-sm text-slate-500">Carregando PDF...</p>}
          onLoadSuccess={({ numPages: loadedPages }) => {
            setNumPages(loadedPages);
            setPageNumber(1);
          }}
          onLoadError={() => {
            setNumPages(0);
          }}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
            className="mx-auto"
          />
        </Document>
      </div>
    </section>
  );
}
