export type PdfMaterial = {
  slug: string;
  title: string;
  description: string;
  coverSrc: string;
  pdfSrc: string;
  category: string;
};

export const pdfMaterials: PdfMaterial[] = [
  {
    slug: "guia-fundamentos-web",
    title: "Guia de Fundamentos Web",
    description:
      "Material introdutório para leitura no app. Estrutura pronta para evoluir com comentários e anotações.",
    coverSrc: "/covers/guia-fundamentos-web.svg",
    pdfSrc: "/pdfs/guia-fundamentos-web.pdf",
    category: "Desenvolvimento"
  }
];

export function getPdfMaterialBySlug(slug: string) {
  return pdfMaterials.find((material) => material.slug === slug);
}
