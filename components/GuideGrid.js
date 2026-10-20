"use client";
import { useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { POSTS, cname, pad2, postUrl } from "@/lib/site";

const GP = POSTS.filter(p => p.cat === "Cẩm nang");
const TABS = [["", "Tất cả"], ["vn", "Việt Nam"], ["my", "Malaysia"], ["sg", "Singapore"]];

// Banner (phần tĩnh, render ở server) + tab lọc ở cuối banner + lưới thẻ cẩm nang
export default function GuideGrid({ banner }) {
  const [c, setC] = useState("");
  const items = GP.filter(p => !c || p.c === c);
  return (
    <>
      <section className="gd-banner">
        {banner}
        <div className="tabs">
          {TABS.map(([k, n]) => (
            <button type="button" key={k} className={c === k ? "on" : undefined} aria-pressed={c === k} onClick={() => setC(k)}>
              {n}<span className="n">{GP.filter(p => !k || p.c === k).length}</span>
            </button>
          ))}
        </div>
      </section>
      <div className="gd-grid wrap">
        {items.map((p, i) => (
          <Link className="gcard" href={postUrl(p.id)} key={p.id}>
            <div className="pic">
              <Photo id={"guide-" + p.id} fallback={p} caption={p.place} />
              <div className="foot"><span>{p.place}</span><em>{pad2(i + 1)}</em></div>
              <span className="badge">{cname(p.c)}</span>
            </div>
            <div className="body">
              <h3>{p.title}</h3>
              {p.tip && <div className="tip"><b>Mẹo nhỏ</b><span>{p.tip}</span></div>}
              <span className="go">Đọc cẩm nang →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
