import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LangSwitch from "@/components/LangSwitch";
import Analytics from "@/components/Analytics";
import LegacyHash from "@/components/LegacyHash";
import { fontVariables } from "@/lib/fonts";
import { getDict, route, DEFAULT_LOCALE } from "@/lib/i18n";
import { VN_REGIONS } from "@/lib/regions";
import { POSTS } from "@/data/posts";
import { localize } from "@/lib/content";
import "@/app/globals.css";

/** Khung chung của mọi trang (html, thanh đầu, logo, menu, footer) cho một ngôn ngữ. */
export default function SiteLayout({ lang, children }) {
  const d = getDict(lang);
  const item = p => ({ id: p.id, name: p.menu || p.place });
  const local = ids => ids.map(id => POSTS.find(p => p.id === id)).filter(Boolean).map(p => item(localize(p, lang)));
  const placed = new Set(VN_REGIONS.flatMap(r => r.areas.flatMap(a => a.ids)));
  const rest = POSTS.filter(p => p.c === "vn" && !placed.has(p.id)).map(p => item(localize(p, lang)));
  // Việt Nam chia thành các miền → vùng → bài; bài chưa xếp vùng vào "Khác" của miền cuối
  const groups = [
    ...VN_REGIONS.map((r, n, all) => ({
      code: "vn-" + r.key, name: r.name[lang] || r.name.vi,
      areas: [...r.areas.map(a => ({ name: a.name[lang] || a.name.vi, items: local(a.ids) })), ...(n === all.length - 1 && rest.length ? [{ name: d.nav.other, items: rest }] : [])],
    })),
    ...["my", "sg"].map(c => ({ code: c, name: d.countries[c], items: POSTS.filter(p => p.c === c).map(p => item(localize(p, lang))) })),
  ];
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <Analytics />
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
