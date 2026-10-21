"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, route } from "@/lib/i18n";
import { postUrl } from "@/lib/site";

export default function Nav({ lang, groups }) {
  const path = usePathname();
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const dd = useRef(null);
  const first = useRef(path);

  useEffect(() => {
    setOpen(false);
    if (path !== first.current) window.__driInApp = true; // để nút "Quay lại" biết có trang trước trong blog
  }, [path]);
  useEffect(() => {
    const onDoc = e => { if (!dd.current?.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const home = route(lang, "home"), guide = route(lang, "guide"), blogs = route(lang, "blogs");
  return (
    <nav className="nav" aria-label={d.nav.label}><div className="wrap">
      <Link href={home} className={path === home ? "on" : undefined}>{d.nav.home}</Link>
      <div className="dd" ref={dd}>
        <button type="button" aria-expanded={open} aria-controls="dd-menu" onClick={() => setOpen(o => !o)}>{d.nav.destinations} <span className="caret">▼</span></button>
        <div className="menu" id="dd-menu" hidden={!open}>
          {groups.map(g => (
            <div className="col" key={g.code}>
              <div className="grp">{g.name}</div>
              {g.regions
                ? g.regions.map(r => (
                    <div className="reg" key={r.name}>
                      <div className="rname">{r.name}</div>
                      {r.areas.map(a => (
                        <div className="area" key={a.name}>
                          <div className="sub">{a.name}</div>
                          {a.items.map(it => <Link key={it.id} href={postUrl(lang, it.id)}>{it.name}</Link>)}
                        </div>
                      ))}
                    </div>
                  ))
                : <div>{g.items.map(it => <Link key={it.id} href={postUrl(lang, it.id)}>{it.name}</Link>)}</div>}
            </div>
          ))}
        </div>
      </div>
      <Link href={guide} className={path.startsWith(guide) ? "on" : undefined}>{d.nav.guide}</Link>
      <Link href={blogs} className={path.startsWith(blogs) ? "on" : undefined}>{d.nav.blogs}</Link>
    </div></nav>
  );
}
