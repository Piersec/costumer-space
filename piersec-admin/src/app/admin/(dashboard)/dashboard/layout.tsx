import type { Metadata } from "next";
import { Header } from "@/components/dashboard/header";
import ColorMode from "@/components/ui/ColorMode";

import { ThemeProvider } from "@/components/theme-provider";
import Settings from "@/components/ui/Settings";

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
      <ThemeProvider>
        <div className="sticky top-3 z-50 mt-10 mx-70 flex items-center gap-3">
          <div className="flex-1 backdrop-blur-xs bg-background/10 rounded-full">
            <Header />
          </div>

          <div className="backdrop-blur-xs bg-background/10 rounded-full">
            <Settings />
          </div>
        </div>

        <main>{children}</main>
      </ThemeProvider>
    </>
  );
}
