import Image from "next/image";
import Link from "next/link";
import { gradeLabels, grades } from "@/lib/school";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12 md:py-16">
      <header className="mx-auto mb-12 flex max-w-3xl justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={420}
          height={140}
          priority
          className="h-auto w-auto max-h-28 object-contain md:max-h-32"
        />
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grades.map((grade) => (
          <Link
            key={grade}
            href={`/turma/${grade}`}
            className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-white/95 p-6 shadow-md shadow-brand-100/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-400/20 transition group-hover:scale-125" />
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Turma</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{gradeLabels[grade]}</h2>
            <p className="mt-3 text-sm text-slate-600">Clique para acessar as disciplinas dessa turma.</p>
            <span className="mt-4 inline-flex rounded-full bg-brand-500 px-3 py-1 text-sm font-semibold text-white transition group-hover:bg-accent-500">
              Acessar turma
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
