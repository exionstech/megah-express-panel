import type { Metadata } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/providers/provider";


const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {

  title: "Megha Express Panel",
  metadataBase: new URL("https://meghaexpress.in"),
  description: "Admin panel for Megha Express transport services.",
  icons: {
    icon: "./fav.svg"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${sansFont.variable} ${monoFont.variable} font-regular antialiased tracking-wide`}
          suppressHydrationWarning
        >
          <Providers
          >
            <main className="w-full overflow-x-hidden h-auto scroll-smooth">
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
