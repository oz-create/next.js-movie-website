import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Lato } from "next/font/google";
import Providers from "@/lib/providers";
import GlobalInitializer from "./GlobalInitializer";


const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Next.jsMovie Website",
  description: "Next.js ile yapılmış bir film sitesi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`min-h-screen flex flex-col ${lato.className}`}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-[#EBFAFF] dark:bg-[#030A1B]">
            <Navbar />
            <GlobalInitializer />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
