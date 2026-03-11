import PdfCard from "@/components/PdfCard";
import { pdfMaterials } from "@/lib/pdfs";

export default function HomePage() {
  const featuredMaterial = pdfMaterials[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16">
      <header className="mb-10 max-w-2xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-700">Apostila Reader MVP</p>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Leia seu material PDF direto no app
        </h1>
        <p className="mt-4 text-base text-slate-600 md:text-lg">
          Clique na capa para abrir o leitor interno, sem sair da aplicação e com experiência fluida.
        </p>
      </header>

      <PdfCard material={featuredMaterial} />
    </main>
  );
}
