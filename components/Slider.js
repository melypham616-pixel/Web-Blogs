"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { getDict } from "@/lib/i18n";
import { pad2, postUrl } from "@/lib/site";

/** slides: [{ post: bản rút gọn của bài, src: ảnh, label: "Quốc gia · Danh mục" }] */
export default function Slider({ lang, slides }) {
  const d = getDict(lang).home;
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const go = n => setI((n + slides.length) % slides.length);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!paused.current) setI(n => (n + 1) % slides.length); }, 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const { post: p, src, label } = slides[i];
  return (
    <section className="hero-box slider" aria-roledescription="carousel" aria-label={d.featured}
      onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="bg"><Photo key={p.id} id={"hero3-" + p.id} fallback={src} caption={p.place} eager /></div>
      <div className="box">
        <div className="label accent">{label}</div>
        <h2>{p.title}</h2>
        <Link className="btn" href={postUrl(lang, p.id)}>{d.readMore}</Link>
      </div>
      <div className="ctrl">
        <button className="arrow" onClick={() => go(i - 1)} aria-label={d.prev}>‹</button>
        <div className="counter"><span>{pad2(i + 1)}</span><span className="track"><i style={{ width: (i + 1) / slides.length * 100 + "%" }} /></span><span className="of">{pad2(slides.length)}</span></div>
        <button className="arrow" onClick={() => go(i + 1)} aria-label={d.next}>›</button>
      </div>
    </section>
  );
}
