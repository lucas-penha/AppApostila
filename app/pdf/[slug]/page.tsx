import Link from "next/link";
import { notFound } from "next/navigation";
import PdfViewer from "@/components/PdfViewer";
import { getPdfMaterialBySlug, pdfMaterials } from "@/lib/pdfs";

type PdfPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return pdfMaterials.map((material) => ({ slug: material.slug }));
}

export default function PdfPage({ params }: PdfPageProps) {
  const material = getPdfMaterialBySlug(params.slug);

  if (!material) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[min(1800px,99vw)] px-2 py-4 md:px-4 md:py-6">
      <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-brand-700 hover:text-accent-600">
        ← Voltar para a home
      </Link>

      <PdfViewer file={material.pdfSrc} title={material.title} />
    </main>
  );
}
