"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { getDict } from "@/lib/i18n";
import { postUrl } from "@/lib/site";

/** items: các bài Blogs (du lịch có trách nhiệm) đã dịch, kèm cat gốc (khoá) để lọc. */
export default function RtGuides({ lang, items: all }) {
  const d = getDict(lang);
  const b = d.blogs;
  const catKeys = [...new Set(all.map(g => g.cat))];
  const [cat, setCat] = useState("");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const q = query.toLowerCase();
  const items = all.filter(g => (!cat || g.cat === cat) && (!q || (g.title + g.ex + g.place + (d.cats[g.cat] || g.cat)).toLowerCase().includes(q)));

  return (
    <>
      <div className="guides-wrap">
        <div className="sec-title"><span className="label">{b.section}</span></div>
        <div className="pills">
          {[["", d.all], ...catKeys.map(k => [k, d.cats[k] || k])].map(([k, name]) => (
            <button type="button" key={k} className={"pill" + (cat === k ? " on" : "")} aria-pressed={cat === k} onClick={() => setCat(k)}>{name}</button>
          ))}
        </div>
        <div ref={listRef}>
          {items.map(g => (
            <article className="g zoom" key={g.id}>
              <Link href={postUrl(lang, g.id)} className="pic"><Photo id={"guide-" + g.id} fallback={g} caption={g.place} /></Link>
              <div className="txt">
                <div className="label accent">{d.cats[g.cat] || g.cat} · {g.place}</div>
                <h3><Link href={postUrl(lang, g.id)}>{g.title}</Link></h3>
                <p>{g.ex}</p>
                <Link className="more" href={postUrl(lang, g.id)}>{d.home.readMoreArrow}</Link>
              </div>
            </article>
          ))}
        </div>
        {!items.length && <p className="empty">{b.none(query || (cat && d.cats[cat]) || "")}</p>}
      </div>

      <div className="else">
        <h3>{b.elseTitle}</h3>
        <form className="search" onSubmit={e => { e.preventDefault(); setQuery(input.trim()); setCat(""); listRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
          <input id="rtq" value={input} onChange={e => setInput(e.target.value)} placeholder={b.elsePlaceholder} aria-label={b.elseLabel} />
          <button aria-label={d.home.searchGo}>→</button>
        </form>
      </div>
    </>
  );
}
