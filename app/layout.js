import { Playfair_Display, Be_Vietnam_Pro, Old_Standard_TT, Dancing_Script } from "next/font/google";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegacyHash from "@/components/LegacyHash";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESC } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const beVietnam = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600", "700"], variable: "--f-body", display: "swap" });
const oldStandard = Old_Standard_TT({ subsets: ["latin", "vietnamese"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--f-old", display: "swap" });
const dancing = Dancing_Script({ subsets: ["latin", "vietnamese"], weight: ["500", "700"], variable: "--f-script", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Đi Rồi Kể" },
  description: SITE_DESC,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "vi_VN", title: "Đi Rồi Kể – Blog du lịch của Mely", description: "Kinh nghiệm du lịch tự túc và những câu chuyện trên đường đi ở Việt Nam, Malaysia, Singapore." },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable} ${oldStandard.variable} ${dancing.variable}`}>
      <body>
        <LegacyHash />
        <div className="topbar"><div className="wrap">
          <span>Blog &amp; trải nghiệm</span>
          <span className="soc"><Link href="/gioi-thieu/">Giới thiệu</Link><a href="#contact">Liên hệ</a></span>
        </div></div>

        <header className="brand wrap">
          <Link className="logo" href="/">Đi Rồi Kể</Link>
          <p className="tagline">Những nơi đã đi qua, những món đã thưởng thức và những ngày muốn nhớ</p>
        </header>

        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
