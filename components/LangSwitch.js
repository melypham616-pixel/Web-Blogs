"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LANG_NAMES, getDict, switchLang } from "@/lib/i18n";

/** Chuyển sang cùng trang ở ngôn ngữ khác (giữ đúng bài viết đang xem). */
export default function LangSwitch({ lang }) {
  const path = usePathname() || "/";
  const d = getDict(lang);
  return (
    <span className="lang" role="group" aria-label={d.topbar.language}>
      {LOCALES.map(l => (
        l === lang
          ? <span key={l} className="on" aria-current="true" lang={l}>{l.toUpperCase()}</span>
          : <Link key={l} href={switchLang(path, l)} hrefLang={l} lang={l} title={LANG_NAMES[l]}>{l.toUpperCase()}</Link>
      ))}
    </span>
  );
}
