import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppProviders } from "@/components/providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axiom",
  description: "AI-powered DeFi workflow automation.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        layout: {
          socialButtonsPlacement: "top",
          socialButtonsVariant: "iconButton",
        },
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-sm !shadow-none",
          socialButtons: "flex gap-3 justify-center items-center",
          socialButtonsIconButton: "w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-colors",
          socialButtonsProviderIcon: "w-5 h-5",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <AppProviders>{children}</AppProviders>
          </Providers>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
