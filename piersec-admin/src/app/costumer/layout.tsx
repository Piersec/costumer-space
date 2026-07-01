import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const effra = localFont({
  src: "../../fonts/Effra.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piersec | Área do Cliente",
  description: "Área do Cliente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={effra.className}>
      {children}
    </div>
  );
}