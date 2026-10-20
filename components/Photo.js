"use client";
import { useEffect, useRef } from "react";
import { SLOTS } from "@/data/slots";
import { art } from "@/lib/art";

const abs = src => (src && !src.startsWith("/") && !src.startsWith("http") && !src.startsWith("data:") ? "/" + src : src);

// Ảnh có dịch/phóng: tính lại kích thước theo tỉ lệ khung (giống cách bản thiết kế cắt ảnh).
// Khung trên web có thể khác tỉ lệ so với lúc cắt, nên giới hạn độ dịch để ảnh luôn phủ kín khung.
function frame(img, { s = 1, x = 0, y = 0 }) {
  if (!img || !img.naturalWidth) return;
  const box = img.parentElement, fw = box.clientWidth, fh = box.clientHeight;
  if (!fw || !fh) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const k = Math.max(fw / iw, fh / ih) * s;
  const w = iw * k / fw * 100, h = ih * k / fh * 100;
  const clamp = (v, lim) => Math.max(-lim, Math.min(lim, v));
  Object.assign(img.style, { width: w + "%", height: h + "%", left: 50 + clamp(x, w / 2 - 50) + "%", top: 50 + clamp(y, h / 2 - 50) + "%" });
}

/**
 * Một khung ảnh. Ưu tiên ảnh bạn đã đặt cho ô `id` trong bản thiết kế (SLOTS),
 * sau đó tới `fallback` (đường dẫn ảnh, hoặc một bài viết để vẽ SVG), cuối cùng là ô trống có chú thích.
 */
export default function Photo({ id, fallback, caption = "", eager = false }) {
  const sl = id ? SLOTS[id] : null;
  const framed = sl && (sl.s || sl.x || sl.y);
  const ref = useRef(null);

  useEffect(() => {
    if (!framed) return;
    const img = ref.current;
    const run = () => frame(img, sl);
    if (img.complete) run(); else img.addEventListener("load", run, { once: true });
    const ro = new ResizeObserver(run);
    ro.observe(img.parentElement);
    return () => ro.disconnect();
  }, [framed, sl]);

  const loading = eager ? "eager" : "lazy";
  if (sl) return <div className="ph"><img ref={ref} src={abs(sl.f)} alt={caption} loading={loading} className={framed ? "framed" : undefined} /></div>;
  if (typeof fallback === "string" && fallback) return <div className="ph"><img src={abs(fallback)} alt={caption} loading={loading} /></div>;
  if (fallback && typeof fallback === "object") return <div className="ph" role="img" aria-label={caption} dangerouslySetInnerHTML={{ __html: art(fallback) }} />;
  return <div className="ph blank"><span>{caption}</span></div>;
}

// Một ô ảnh bọc trong div (dùng cho lưới ảnh)
export function Box({ id, fallback, caption, className }) {
  return <div className={className}><Photo id={id} fallback={fallback} caption={caption} /></div>;
}
