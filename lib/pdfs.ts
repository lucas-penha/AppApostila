import { gradeLabels, gradeNumbers, grades, isElementaryGrade, type GradeKey } from "@/lib/school";

export type PdfMaterial = {
  slug: string;
  grade: GradeKey;
  gradeLabel: string;
  title: string;
  description: string;
  coverSrc: string;
  pdfSrc: string;
  category: string;
};

type SubjectBlueprint = {
  slugBase: string;
  title: string;
  category: string;
  pdfFile: (gradeNumber: string) => string;
  coverFile: (gradeNumber: string) => string;
};

const elementaryBlueprints: SubjectBlueprint[] = [
  {
    slugBase: "matematica-financeira-e-empreendedorismo",
    title: "Matemática Financeira e Empreendedorismo",
    category: "Negócios",
    pdfFile: (x) => `Matematica-Financeira-e-Empreendedorismo-${x}-Ano.pdf`,
    coverFile: (x) => `Matematica-Financeira-e-Empreendedorismo-${x}-Ano.png`
  },
  {
    slugBase: "espanhol",
    title: "Espanhol",
    category: "Idiomas",
    pdfFile: (x) => `Espanhol-${x}-Ano.pdf`,
    coverFile: (x) => `Espanhol-${x}-Ano.png`
  },
  {
    slugBase: "comunicacao-e-oratoria",
    title: "Comunicação e Oratória",
    category: "Comunicação",
    pdfFile: (x) => `Comunicacao-e-Oratoria-${x}-Ano.pdf`,
    coverFile: (x) => `Comunicacao-e-Oratoria-${x}-Ano.png`
  },
  {
    slugBase: "inteligencia-emocional",
    title: "Inteligência Emocional",
    category: "Desenvolvimento",
    pdfFile: (x) => `Inteligencia-Emocional-${x}-Ano.pdf`,
    coverFile: (x) => `Inteligencia-Emocional-${x}-Ano.png`
  },
  {
    slugBase: "tecnologia",
    title: "Tecnologia, Cultura Digital, Programação e Robótica",
    category: "Tecnologia",
    pdfFile: () => "Tecnologia.pdf",
    coverFile: () => "Tecnologia.png"
  }
];

const highSchoolBlueprints: SubjectBlueprint[] = [
  {
    slugBase: "empreendedorismo",
    title: "Empreendedorismo",
    category: "Negócios",
    pdfFile: (x) => `Empreendedorismo-${x}-Ano.pdf`,
    coverFile: (x) => `Empreendedorismo-${x}-Ano.png`
  },
  {
    slugBase: "espanhol",
    title: "Espanhol",
    category: "Idiomas",
    pdfFile: (x) => `Espanhol-${x}-Ano.pdf`,
    coverFile: (x) => `Espanhol-${x}-Ano.png`
  },
  {
    slugBase: "comunicacao-e-oratoria",
    title: "Comunicação e Oratória",
    category: "Comunicação",
    pdfFile: (x) => `Comunicacao-e-Oratoria-${x}-Ano.pdf`,
    coverFile: (x) => `Comunicacao-e-Oratoria-${x}-Ano.png`
  },
  {
    slugBase: "inteligencia-emocional",
    title: "Inteligência Emocional",
    category: "Desenvolvimento",
    pdfFile: (x) => `Inteligencia-Emocional-${x}-Ano.pdf`,
    coverFile: (x) => `Inteligencia-Emocional-${x}-Ano.png`
  },
  {
    slugBase: "tecnologia",
    title: "Tecnologia, Cultura Digital, Programação e Robótica",
    category: "Tecnologia",
    pdfFile: (x) => `Tecnologia-${x}-Ano.pdf`,
    coverFile: () => "Tecnologia.png"
  }
];

function getBlueprintsByGrade(grade: GradeKey) {
  return isElementaryGrade(grade) ? elementaryBlueprints : highSchoolBlueprints;
}

function toMaterial(grade: GradeKey, blueprint: SubjectBlueprint): PdfMaterial {
  const gradeNumber = gradeNumbers[grade];
  const pdfFileName = blueprint.pdfFile(gradeNumber);
  const coverFileName = blueprint.coverFile(gradeNumber);

  return {
    slug: `${blueprint.slugBase}-${grade}`,
    grade,
    gradeLabel: gradeLabels[grade],
    title: blueprint.title,
    description: `Material de ${blueprint.title} para ${gradeLabels[grade]}.`,
    coverSrc: `/covers/${coverFileName}`,
    pdfSrc: `/pdfs/${pdfFileName}`,
    category: blueprint.category
  };
}

export const pdfMaterials: PdfMaterial[] = grades.flatMap((grade) =>
  getBlueprintsByGrade(grade).map((blueprint) => toMaterial(grade, blueprint))
);

export function getPdfMaterialBySlug(slug: string) {
  return pdfMaterials.find((material) => material.slug === slug);
}

export function getPdfMaterialsByGrade(grade: GradeKey) {
  return pdfMaterials.filter((material) => material.grade === grade);
}
