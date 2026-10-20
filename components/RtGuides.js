"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { GUIDES, postUrl } from "@/lib/site";

const CATS = ["Tất cả", ...new Set(GUIDES.map(g => g.cat))];

export default function RtGuides() {
  const [cat, setCat] = useState("");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const q = query.toLowerCase();
  const items = GUIDES.filter(g => (!cat || g.cat === cat) && (!q || (g.title + g.ex + g.place + g.cat).toLowerCase().includes(q)));

  return (
    <>
      <div className="guides-wrap">
        <div className="sec-title"><span className="label">Cẩm nang đi có trách nhiệm</span></div>
        <div className="pills">
          {CATS.map(n => {
            const on = (n === "Tất cả" && !cat) || n === cat;
            return <button type="button" key={n} className={"pill" + (on ? " on" : "")} aria-pressed={on} onClick={() => setCat(n === "Tất cả" ? "" : n)}>{n}</button>;
          })}
        </div>
        <div ref={listRef}>
          {items.map(g => (
            <article className="g zoom" key={g.id}>
              <Link href={postUrl(g.id)} className="pic"><Photo id={"guide-" + g.id} fallback={g} caption={g.place} /></Link>
              <div className="txt">
                <div className="label accent">{g.cat} · {g.place}</div>
                <h3><Link href={postUrl(g.id)}>{g.title}</Link></h3>
                <p>{g.ex}</p>
                <Link className="more" href={postUrl(g.id)}>Đọc tiếp →</Link>
              </div>
            </article>
          ))}
        </div>
        {!items.length && <p className="empty">Chưa có bài nào cho “{query || cat}”. Thử từ khoá khác nhé.</p>}
      </div>

      <div className="else">
        <h3>Bạn đang tìm điều gì khác?</h3>
        <form className="search" onSubmit={e => { e.preventDefault(); setQuery(input.trim()); setCat(""); listRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
          <input id="rtq" value={input} onChange={e => setInput(e.target.value)} placeholder="Tìm bài viết…" aria-label="Tìm bài viết" />
          <button aria-label="Tìm">→</button>
        </form>
      </div>
    </>
  );
}
