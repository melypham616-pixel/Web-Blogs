"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { POSTS, postUrl } from "@/lib/site";

const GROUPS = [["vn", "Việt Nam"], ["my", "Malaysia"], ["sg", "Singapore"]];

export default function Nav() {
  const path = usePathname();
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

  const on = p => (path.startsWith(p) ? "on" : undefined);
  return (
    <nav className="nav" aria-label="Menu chính"><div className="wrap">
      <Link href="/" className={path === "/" ? "on" : undefined}>Trang chủ</Link>
      <div className="dd" ref={dd}>
        <button type="button" aria-expanded={open} aria-controls="dd-menu" onClick={() => setOpen(o => !o)}>Điểm đến <span className="caret">▼</span></button>
        <div className="menu" id="dd-menu" hidden={!open}>
          {GROUPS.map(([c, name]) => (
            <div className="col" key={c}>
              <div className="grp">{name}</div>
              <div>{POSTS.filter(p => p.c === c).map(p => <Link key={p.id} href={postUrl(p.id)}>{p.menu || p.place}</Link>)}</div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/cam-nang/" className={on("/cam-nang")}>Cẩm nang</Link>
      <Link href="/blogs/" className={on("/blogs")}>Blogs</Link>
    </div></nav>
  );
}
