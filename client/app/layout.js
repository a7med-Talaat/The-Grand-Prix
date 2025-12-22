import { Inter, Titillium_Web } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const titillium = Titillium_Web({ weight: ['400', '700', '900'], subsets: ["latin"], variable: '--font-titillium' });

export const metadata = {
  title: "The Grand Prix",
  description: "Experience the speed of Formula 1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${titillium.variable} bg-f1-black text-silver font-sans min-h-screen selection:bg-f1-red selection:text-white overflow-x-hidden`}>
        <div className="bg-grain" />
        <AuthProvider>
          <Navbar />
          <main className="pt-20 min-h-screen relative z-10 font-serif">
            {children}
          </main>
          <footer className="relative z-10 py-8 text-center border-t border-white/10 bg-black">
            <p className="text-gray-500 text-xs uppercase tracking-widest">Made by Grand prix team swe project</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
