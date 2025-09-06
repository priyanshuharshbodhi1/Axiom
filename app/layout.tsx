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
    icon: [
      {
        url: "https://api.iconify.design/tabler/circuit-ai.svg",
        rel: "icon",
        type: "image/svg+xml",
      },
    ],
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
          socialButtons: "flex flex-wrap gap-2 justify-center",
          socialButtonsBlockButton: "flex-1 min-w-[120px]",
          socialButtonsIconButton: "w-12 h-12 min-w-[48px]",
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
