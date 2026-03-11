# Apostila Reader MVP

MVP em **Next.js (App Router) + TypeScript + Tailwind CSS** para leitura de PDF embutido no site.

## Instalação

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## Dependências principais

- `next`
- `react` / `react-dom`
- `react-pdf` (baseado em PDF.js)
- `lucide-react`
- `tailwindcss`

## Estrutura

```text
app/
  layout.tsx
  globals.css
  page.tsx
  pdf/[slug]/page.tsx
components/
  PdfCard.tsx
  PdfViewer.tsx
lib/
  pdfs.ts
next.config.mjs
public/
  covers/guia-fundamentos-web.svg
  pdfs/guia-fundamentos-web.pdf
```

## Deploy na Vercel

1. Faça push do projeto para um repositório Git.
2. Importe na Vercel.
3. Framework Preset: **Next.js**.
4. Build command: `next build` (padrão).
5. Output: `.next` (padrão).

> Observação: o worker do PDF.js foi configurado no componente `PdfViewer` usando `pdf.worker.min.mjs`, compatível com bundling no Next.js.

## Próximos passos (arquitetura preparada)

- Adicionar camada de estado para highlights e comentários por `slug`/página.
- Persistir anotações em backend (ex.: Supabase/Postgres).
- Incluir barra lateral com lista de comentários por trecho.


## Nota de compatibilidade

- O arquivo de configuração do Next foi definido como `next.config.mjs` (em vez de `next.config.ts`) para compatibilidade com execução local em ambientes Windows/Node onde `.ts` não é aceito como config runtime.
