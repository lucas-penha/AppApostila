import Image from "next/image";
import Link from "next/link";
import type { PdfMaterial } from "@/lib/pdfs";

type PdfCardProps = {
  material: PdfMaterial;
};

export default function PdfCard({ material }: PdfCardProps) {
  return (
    <article className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/pdf/${material.slug}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <Image
            src={material.coverSrc}
            alt={`Capa do material ${material.title}`}
            width={640}
            height={860}
            priority
            className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-2 px-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{material.category}</p>
        <h2 className="text-xl font-semibold text-slate-900">{material.title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">{material.description}</p>
      </div>
    </article>
  );
}
