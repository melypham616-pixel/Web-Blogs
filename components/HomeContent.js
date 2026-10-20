"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { getDict } from "@/lib/i18n";
import { postUrl } from "@/lib/site";

/**
 * posts: danh sách bài đã dịch (bản rút gọn). tiles: [{ code, fallback }] cho 3 ô quốc gia.
 * filter là { code } (chọn quốc gia) hoặc { text } (tìm kiếm).
 */
export default function HomeContent({ lang, posts, tiles }) {
  const d = getDict(lang);
  const h = d.home;
  const [filter, setFilter] = useState(null);
  const [q, setQ] = useState("");
  const listRef = useRef(null);

  const pick = f => {
    setFilter(f);
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };
  const label = p => d.countries[p.c] + " · " + (d.cats[p.cat] || p.cat);
  const matches = p => {
    if (!filter) return true;
    if (filter.code) return p.c === filter.code;
    const needle = filter.text.toLowerCase();
    return (p.place + " " + p.title + " " + p.ex + " " + label(p)).toLowerCase().includes(needle);
  };
  const filterName = filter ? (filter.code ? d.countries[filter.code] : filter.text) : "";
  const items = posts.filter(matches);
  const [first, ...rest] = items;
  const countOf = code => posts.filter(p => p.c === code).length;
  const popular = posts.slice(2, 5);
  const about = posts[5];

  return (
    <>
      <section className="tiles">
        {tiles.map(t => (
          <button className="tile zoom" type="button" key={t.code} onClick={() => pick({ code: t.code })}>
            <Photo id={"tile-" + t.code} fallback={t.fallback} caption={d.countries[t.code]} />
            <span className="name">{d.countries[t.code]}<span className="count">{countOf(t.code)}</span></span>
          </button>
        ))}
      </section>

      <div className="main">
        <section id="posts" ref={listRef}>
          <div className="sec-title"><span className="label">{filter ? h.results(items.length) : h.latest}</span></div>
          {filter && (
            <div className="chip-row">
              <button type="button" className="chip" onClick={() => { setFilter(null); setQ(""); }}>{h.filtering} <b>{filterName}</b> <span className="x">×</span></button>
            </div>
          )}
          {!first && <p className="empty">{h.none(filterName)}</p>}
          {first && (
            <article className="lead zoom">
              <Link href={postUrl(lang, first.id)} className="pic"><Photo id={"list-" + first.id} fallback={first} caption={first.place} /></Link>
              <div className="label accent">{label(first)}</div>
              <h3><Link href={postUrl(lang, first.id)}>{first.title}</Link></h3>
              <p>{first.ex}</p>
              <Link className="btn" href={postUrl(lang, first.id)}>{h.readMore}</Link>
            </article>
          )}
          {rest.map(p => (
            <article className="post zoom" key={p.id}>
              <Link href={postUrl(lang, p.id)} className="pic"><Photo id={"list-" + p.id} fallback={p} caption={p.place} /></Link>
              <div>
                <div className="label accent">{label(p)}</div>
                <h3><Link href={postUrl(lang, p.id)}>{p.title}</Link></h3>
                <p>{p.ex}</p>
                <Link className="more" href={postUrl(lang, p.id)}>{h.readMoreArrow}</Link>
              </div>
            </article>
          ))}
        </section>

        <aside>
          <div className="widget about" id="about">
            <h4>{h.hello}</h4>
            <div className="avatar"><Photo id="about-avatar" fallback={about} caption="Mely" /></div>
            <p>{h.aboutText}</p>
            <div className="sig">Mely</div>
          </div>
          <div className="widget">
            <h4>{h.search}</h4>
            <form className="search" onSubmit={e => { e.preventDefault(); pick(q.trim() ? { text: q.trim() } : null); }}>
              <input id="q" value={q} onChange={e => setQ(e.target.value)} placeholder={h.searchPlaceholder} aria-label={h.searchPlaceholder} />
              <button aria-label={h.searchGo}>→</button>
            </form>
          </div>
          <div className="widget">
            <h4>{h.categories}</h4>
            <div className="catlist">
              {tiles.map(t => <button type="button" key={t.code} onClick={() => pick({ code: t.code })}><span>{d.countries[t.code]}</span><span className="count">{countOf(t.code)}</span></button>)}
            </div>
          </div>
          <div className="widget">
            <h4>{h.popular}</h4>
            <div className="popular">
              {popular.map(p => (
                <Link className="mini" href={postUrl(lang, p.id)} key={p.id}>
                  <div className="pic"><Photo id={"pop-" + p.id} fallback={p} caption={p.place} /></div>
                  <div><b>{p.title}</b><small>{d.countries[p.c]}</small></div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
