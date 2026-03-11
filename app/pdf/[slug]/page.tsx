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
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 md:px-6">
      <Link href="/" className="mb-6 inline-flex text-sm font-medium text-brand-700 hover:text-brand-500">
        ← Voltar para a home
      </Link>

      <PdfViewer file={material.pdfSrc} title={material.title} />
    </main>
  );
}
