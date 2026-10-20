"use client";
import { useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { getDict } from "@/lib/i18n";
import { pad2, postUrl } from "@/lib/site";

/** Banner (phần tĩnh, render ở server) + tab lọc ở cuối banner + lưới thẻ cẩm nang. items: bài thuộc mục Cẩm nang. */
export default function GuideGrid({ lang, items: all, banner }) {
  const d = getDict(lang);
  const g = d.guide;
  const [c, setC] = useState("");
  const tabs = [["", d.all], ["vn", d.countries.vn], ["my", d.countries.my], ["sg", d.countries.sg]];
  const items = all.filter(p => !c || p.c === c);
  return (
    <>
      <section className="gd-banner">
        {banner}
        <div className="tabs">
          {tabs.map(([k, n]) => (
            <button type="button" key={k} className={c === k ? "on" : undefined} aria-pressed={c === k} onClick={() => setC(k)}>
              {n}<span className="n">{all.filter(p => !k || p.c === k).length}</span>
            </button>
          ))}
        </div>
      </section>
      <div className="gd-grid wrap">
        {items.map((p, i) => (
          <Link className="gcard" href={postUrl(lang, p.id)} key={p.id}>
            <div className="pic">
              <Photo id={"guide-" + p.id} fallback={p} caption={p.place} />
              <div className="foot"><span>{p.place}</span><em>{pad2(i + 1)}</em></div>
              <span className="badge">{d.countries[p.c]}</span>
            </div>
            <div className="body">
              <h3>{p.title}</h3>
              {p.tip && <div className="tip"><b>{g.tip}</b><span>{p.tip}</span></div>}
              <span className="go">{g.readGuide}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
