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
  turma/[grade]/page.tsx
  pdf/[slug]/page.tsx
components/
  PdfCard.tsx
  PdfViewer.tsx
lib/
  pdfs.ts
next.config.mjs
public/
  covers/(capas por disciplina/turma)
  pdfs/(pdfs por disciplina/turma)
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


## Fluxo atual

- Home com seleção de turmas: 6º ano até 2º ano do médio.
- Cada turma exibe as disciplinas: Matemática, Espanhol, Comunicação, Empreendedorismo e Inteligência emocional.
- Cada disciplina possui acesso ao material PDF embutido no app.


## Convenção de arquivos por turma

### 6º ao 9º ano
- Matérias:
  - Matemática Financeira e Empreendedorismo
  - Espanhol
  - Comunicação e Oratória
  - Inteligência Emocional
  - Tecnologia, Cultura Digital, Programação e Robótica
- PDFs esperados:
  - `Matematica-Financeira-e-Empreendedorismo-X-Ano.pdf`
  - `Espanhol-X-Ano.pdf`
  - `Comunicacao-e-Oratoria-X-Ano.pdf`
  - `Inteligencia-Emocional-X-Ano.pdf`
  - `Tecnologia.pdf`

### 1º e 2º ano do médio
- Matérias:
  - Empreendedorismo
  - Espanhol
  - Comunicação e Oratória
  - Inteligência Emocional
  - Tecnologia, Cultura Digital, Programação e Robótica
- PDFs esperados:
  - `Empreendedorismo-X-Ano.pdf`
  - `Espanhol-X-Ano.pdf`
  - `Comunicacao-e-Oratoria-X-Ano.pdf`
  - `Inteligencia-Emocional-X-Ano.pdf`
  - `Tecnologia-X-Ano.pdf`

### Capas esperadas em `public/covers`
- `Matematica-Financeira-e-Empreendedorismo-X-Ano.png`
- `Empreendedorismo-X-Ano.png`
- `Espanhol-X-Ano.png`
- `Comunicacao-e-Oratoria-X-Ano.png`
- `Inteligencia-Emocional-X-Ano.png`
- `Tecnologia.png`

> Onde `X = 6, 7, 8, 9, 1 ou 2` de acordo com a turma.
