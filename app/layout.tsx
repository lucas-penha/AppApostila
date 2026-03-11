import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apostila Reader",
  description: "MVP para leitura de PDF embutido com Next.js"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
