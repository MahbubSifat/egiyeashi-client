import { Hind_Siliguri, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
});

export const metadata = {
  title: {
    default: "EgiyeAshi | Step Forward. Serve Together.",
    template: "%s | EgiyeAshi",
  },
  description:
    "EgiyeAshi is a community platform to create, join and track social service events in your area.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("egiyeashi-theme");if(t!=="egiyeashi-light"&&t!=="egiyeashi-dark"){t="egiyeashi-light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}