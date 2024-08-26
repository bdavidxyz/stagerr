import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import Script from "next/script";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JetNext - Pour un démarrage rapide comme une fusée.",
  description: "JetNext - Pour un démarrage rapide comme une fusée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
              <div className="flex-grow">
                {children}
              </div>
            <Footer />
          </div>
        </ThemeProvider>  
      </AuthProvider>
      <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
