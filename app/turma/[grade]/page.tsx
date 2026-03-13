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
      <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-brand-700 hover:text-accent-600">
        ← Voltar para as turmas
      </Link>

      <header className="mb-10 rounded-2xl border border-brand-100 bg-white/90 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">Turma selecionada</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{gradeLabel}</h1>
        <p className="mt-3 text-slate-600">Escolha uma disciplina para iniciar os estudos.</p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <article
            key={subject}
            className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-brand-200 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-slate-900">{subject}</h2>
            <p className="mt-2 text-sm text-slate-600">Conteúdo da disciplina para a turma {gradeLabel}.</p>
            <Link
              href="/pdf/guia-fundamentos-web"
              className="mt-5 inline-flex rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-brand-700 hover:to-accent-600"
            >
              Abrir material
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
