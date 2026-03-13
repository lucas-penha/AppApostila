import Link from "next/link";
import { gradeLabels, grades } from "@/lib/school";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12 md:py-16">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-700">Portal de Turmas</p>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Selecione a turma para acessar as disciplinas
        </h1>
        <p className="mt-4 text-base text-slate-600 md:text-lg">
          Escolha da turma do 6º ano até o 2º ano do médio para visualizar os conteúdos disponíveis.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grades.map((grade) => (
          <Link
            key={grade}
            href={`/turma/${grade}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Turma</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{gradeLabels[grade]}</h2>
            <p className="mt-3 text-sm text-slate-600">Clique para acessar as disciplinas dessa turma.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-brand-700 transition group-hover:text-brand-500">
              Acessar turma →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
