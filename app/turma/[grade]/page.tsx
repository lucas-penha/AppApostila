import Link from "next/link";
import { notFound } from "next/navigation";
import { gradeLabels, grades, isValidGrade, subjects } from "@/lib/school";

type GradePageProps = {
  params: {
    grade: string;
  };
};

export function generateStaticParams() {
  return grades.map((grade) => ({ grade }));
}

export default function GradePage({ params }: GradePageProps) {
  if (!isValidGrade(params.grade)) {
    notFound();
  }

  const gradeLabel = gradeLabels[params.grade];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 md:py-14">
      <Link href="/" className="mb-6 inline-flex text-sm font-medium text-brand-700 hover:text-brand-500">
        ← Voltar para as turmas
      </Link>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Turma selecionada</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{gradeLabel}</h1>
        <p className="mt-3 text-slate-600">Escolha uma disciplina para iniciar os estudos.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <article key={subject} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{subject}</h2>
            <p className="mt-2 text-sm text-slate-600">Conteúdo da disciplina para a turma {gradeLabel}.</p>
            <Link
              href="/pdf/guia-fundamentos-web"
              className="mt-5 inline-flex rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Abrir material
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
