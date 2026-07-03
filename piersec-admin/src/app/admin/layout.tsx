import type { Metadata } from "next";
import { Header } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-3 z-50 mt-10 mx-70 backdrop-blur-xs bg-background/10">
      <Header />
      </div>

      <main>{children}</main>
    </>
  );
}