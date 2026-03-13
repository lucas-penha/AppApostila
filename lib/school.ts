export const grades = [
  "6-ano",
  "7-ano",
  "8-ano",
  "9-ano",
  "1-medio",
  "2-medio"
] as const;

export type GradeKey = (typeof grades)[number];

export const gradeLabels: Record<GradeKey, string> = {
  "6-ano": "6º Ano",
  "7-ano": "7º Ano",
  "8-ano": "8º Ano",
  "9-ano": "9º Ano",
  "1-medio": "1º Ano do Médio",
  "2-medio": "2º Ano do Médio"
};

export const gradeNumbers: Record<GradeKey, "6" | "7" | "8" | "9" | "1" | "2"> = {
  "6-ano": "6",
  "7-ano": "7",
  "8-ano": "8",
  "9-ano": "9",
  "1-medio": "1",
  "2-medio": "2"
};

export const elementaryGrades: GradeKey[] = ["6-ano", "7-ano", "8-ano", "9-ano"];
export const highSchoolGrades: GradeKey[] = ["1-medio", "2-medio"];

export function isValidGrade(grade: string): grade is GradeKey {
  return grades.includes(grade as GradeKey);
}

export function isElementaryGrade(grade: GradeKey) {
  return elementaryGrades.includes(grade);
}
