"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  file: string;
  title: string;
};

export default function PdfViewer({ file, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  const canPrev = pageNumber > 1;
  const canNext = pageNumber < numPages;
  const zoomLabel = useMemo(() => `${Math.round(scale * 100)}%`, [scale]);

  const scrollToPage = useCallback(
    (targetPage: number) => {
      const normalizedPage = Math.min(Math.max(targetPage, 1), numPages || 1);
      const targetNode = pageRefs.current[normalizedPage - 1];
      if (targetNode) {
        targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setPageNumber(normalizedPage);
    },
    [numPages]
  );

  const updateCurrentPageByScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !numPages) return;

    const containerTop = container.getBoundingClientRect().top;
    let closestPage = 1;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < numPages; i += 1) {
      const pageNode = pageRefs.current[i];
      if (!pageNode) continue;
      const distance = Math.abs(pageNode.getBoundingClientRect().top - containerTop - 16);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPage = i + 1;
      }
    }

    if (closestPage !== pageNumber) {
      setPageNumber(closestPage);
    }
  }, [numPages, pageNumber]);

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
            onClick={() => scrollToPage(pageNumber - 1)}
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
            onClick={() => scrollToPage(pageNumber + 1)}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 transition enabled:hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div
        ref={containerRef}
        onScroll={updateCurrentPageByScroll}
        className="max-h-[72vh] space-y-4 overflow-auto rounded-xl bg-slate-100 p-2 md:p-4"
      >
        <Document
          file={file}
          loading={<p className="p-6 text-center text-sm text-slate-500">Carregando PDF...</p>}
          onLoadSuccess={({ numPages: loadedPages }) => {
            setNumPages(loadedPages);
            setPageNumber(1);
            pageRefs.current = Array.from({ length: loadedPages }, () => null);
          }}
          onLoadError={() => {
            setNumPages(0);
            pageRefs.current = [];
          }}
        >
          {Array.from({ length: numPages }, (_, index) => {
            const currentPage = index + 1;

            return (
              <div
                key={`page_${currentPage}`}
                ref={(node) => {
                  pageRefs.current[index] = node;
                }}
                className="mx-auto w-fit"
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </div>
            );
          })}
        </Document>
      </div>
    </section>
  );
}
