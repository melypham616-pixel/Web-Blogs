"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { POSTS, TILES, cname, countOf, label, postUrl } from "@/lib/site";

function matches(p, f) {
  const q = f.toLowerCase();
  return cname(p.c) === f || p.cat === f || (p.place + " " + p.title + " " + p.ex).toLowerCase().includes(q);
}

export default function HomeContent() {
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  const listRef = useRef(null);

  const pick = f => {
    setFilter(f);
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };
  const items = POSTS.filter(p => !filter || matches(p, filter));
  const [first, ...rest] = items;

  return (
    <>
      <section className="tiles">
        {TILES.map(([n, key, fb]) => (
          <button className="tile zoom" type="button" key={key} onClick={() => pick(n)}>
            <Photo id={"tile-" + key} fallback={fb} caption={n} />
            <span className="name">{n}<span className="count">{countOf(n)}</span></span>
          </button>
        ))}
      </section>

      <div className="main">
        <section id="posts" ref={listRef}>
          <div className="sec-title"><span className="label">{filter ? `Kết quả · ${items.length} bài` : "Bài viết mới nhất"}</span></div>
          {filter && (
            <div className="chip-row">
              <button type="button" className="chip" onClick={() => { setFilter(""); setQ(""); }}>Đang lọc: <b>{filter}</b> <span className="x">×</span></button>
            </div>
          )}
          {!first && <p className="empty">Chưa có bài viết cho “{filter}”. Thử tìm một điểm đến khác.</p>}
          {first && (
            <article className="lead zoom">
              <Link href={postUrl(first.id)} className="pic"><Photo id={"list-" + first.id} fallback={first} caption={first.place} /></Link>
              <div className="label accent">{label(first)}</div>
              <h3><Link href={postUrl(first.id)}>{first.title}</Link></h3>
              <p>{first.ex}</p>
              <Link className="btn" href={postUrl(first.id)}>Đọc tiếp</Link>
            </article>
          )}
          {rest.map(p => (
            <article className="post zoom" key={p.id}>
              <Link href={postUrl(p.id)} className="pic"><Photo id={"list-" + p.id} fallback={p} caption={p.place} /></Link>
              <div>
                <div className="label accent">{label(p)}</div>
                <h3><Link href={postUrl(p.id)}>{p.title}</Link></h3>
                <p>{p.ex}</p>
                <Link className="more" href={postUrl(p.id)}>Đọc tiếp →</Link>
              </div>
            </article>
          ))}
        </section>

        <aside>
          <div className="widget about" id="about">
            <h4>Xin chào</h4>
            <div className="avatar"><Photo id="about-avatar" fallback={POSTS[5]} caption="Mely" /></div>
            <p>Mình là Mely, một người yêu thích du lịch, khám phá những vùng đất mới và lưu giữ những khoảnh khắc qua ống kính. Đây là góc nhỏ để mình chia sẻ những câu chuyện, trải nghiệm, món ngon và những địa điểm thú vị trên hành trình của mình. Hy vọng những điều mình viết sẽ mang đến cho bạn một chút cảm hứng để xách ba lô lên và khám phá thế giới theo cách riêng của mình.</p>
            <div className="sig">Mely</div>
          </div>
          <div className="widget">
            <h4>Tìm kiếm</h4>
            <form className="search" onSubmit={e => { e.preventDefault(); pick(q.trim()); }}>
              <input id="q" value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm điểm đến…" aria-label="Tìm điểm đến" />
              <button aria-label="Tìm">→</button>
            </form>
          </div>
          <div className="widget">
            <h4>Danh mục</h4>
            <div className="catlist">
              {TILES.map(([n, key]) => <button type="button" key={key} onClick={() => pick(n)}><span>{n}</span><span className="count">{countOf(n)}</span></button>)}
            </div>
          </div>
          <div className="widget">
            <h4>Đọc nhiều</h4>
            <div className="popular">
              {POSTS.slice(2, 5).map(p => (
                <Link className="mini" href={postUrl(p.id)} key={p.id}>
                  <div className="pic"><Photo id={"pop-" + p.id} fallback={p} caption={p.place} /></div>
                  <div><b>{p.title}</b><small>{cname(p.c)}</small></div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
