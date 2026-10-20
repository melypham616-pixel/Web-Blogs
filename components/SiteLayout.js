import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LangSwitch from "@/components/LangSwitch";
import LegacyHash from "@/components/LegacyHash";
import { fontVariables } from "@/lib/fonts";
import { getDict, route, DEFAULT_LOCALE } from "@/lib/i18n";
import { POSTS } from "@/data/posts";
import { localize } from "@/lib/content";
import "@/app/globals.css";

/** Khung chung của mọi trang (html, thanh đầu, logo, menu, footer) cho một ngôn ngữ. */
export default function SiteLayout({ lang, children }) {
  const d = getDict(lang);
  const groups = ["vn", "my", "sg"].map(c => ({
    code: c,
    name: d.countries[c],
    items: POSTS.filter(p => p.c === c).map(p => localize(p, lang)).map(p => ({ id: p.id, name: p.menu || p.place })),
  }));
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        {lang === DEFAULT_LOCALE && <LegacyHash />}
        <div className="topbar"><div className="wrap">
          <span>{d.topbar.left}</span>
          <span className="soc">
            <Link href={route(lang, "about")}>{d.topbar.about}</Link>
            <a href="#contact">{d.topbar.contact}</a>
            <LangSwitch lang={lang} />
          </span>
        </div></div>

        <header className="brand wrap">
          <Link className="logo" href={route(lang, "home")}>Đi Rồi Kể</Link>
          <p className="tagline">{d.brandTagline}</p>
        </header>

        <Nav lang={lang} groups={groups} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
