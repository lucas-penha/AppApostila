export const grades = [
  "6-ano",
  "7-ano",
  "8-ano",
  "9-ano",
  "1-medio",
  "2-medio"
] as const;

export const gradeLabels: Record<(typeof grades)[number], string> = {
  "6-ano": "6º Ano",
  "7-ano": "7º Ano",
  "8-ano": "8º Ano",
  "9-ano": "9º Ano",
  "1-medio": "1º Ano do Médio",
  "2-medio": "2º Ano do Médio"
};

export const subjects = [
  "Matemática",
  "Espanhol",
  "Comunicação",
  "Empreendedorismo",
  "Inteligência emocional"
] as const;

export function isValidGrade(grade: string): grade is (typeof grades)[number] {
  return grades.includes(grade as (typeof grades)[number]);
}
