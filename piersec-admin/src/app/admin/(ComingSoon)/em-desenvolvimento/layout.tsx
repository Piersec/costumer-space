import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "⌛ Em Desenvolvimento",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <main>{children}</main>
    </>
  );
}