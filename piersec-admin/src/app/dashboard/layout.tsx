import type { Metadata } from "next";
import "../globals.css"; // <-- CAMINHO DO ARQUIVO CSS QUE VOCÊ ME MANDOU

export const metadata: Metadata = {
  title: "Piercast Dashboard",
  description: "Gerenciamento de episódios do podcast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}