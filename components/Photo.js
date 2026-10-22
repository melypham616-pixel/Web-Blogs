"use client";
import { useEffect, useRef } from "react";
import { SLOTS } from "@/data/slots";
import { art } from "@/lib/art";

// Ảnh trong /images/ được lấy từ Cloudinary (đã upload bằng scripts/upload-cloudinary.mjs, có tự đổi định dạng và nén).
// Đặt NEXT_PUBLIC_IMAGE_CDN="" (chuỗi rỗng) để quay lại dùng ảnh trong thư mục public.
const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN ?? "https://res.cloudinary.com/wzxppref/image/upload/f_auto,q_auto,a_exif/di-roi-ke";
const abs = src => {
  const p = src && !src.startsWith("/") && !src.startsWith("http") && !src.startsWith("data:") ? "/" + src : src;
  return CDN && p && p.startsWith("/images/") ? CDN + "/" + p.slice(8).replace(/\.[^./]+$/, "") : p;
};

// Ảnh có dịch/phóng: tính lại kích thước theo tỉ lệ khung (giống cách bản thiết kế cắt ảnh).
// Khung trên web có thể khác tỉ lệ so với lúc cắt, nên giới hạn độ dịch để ảnh luôn phủ kín khung.
function frame(img, { s = 1, x = 0, y = 0, r = 0 }) {
  if (!img || !img.naturalWidth) return;
  const box = img.parentElement, fw = box.clientWidth, fh = box.clientHeight;
  if (!fw || !fh) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const k = Math.max(fw / iw, fh / ih) * s;
  let w = iw * k / fw * 100, h = ih * k / fh * 100;
  const clamp = (v, lim) => Math.max(-lim, Math.min(lim, v));
  // Ảnh xoay nhẹ để nắn thẳng (r độ): phóng thêm vừa đủ để góc ảnh không lộ ra ngoài khung, kể cả khi ảnh bị dịch
  if (r) {
    const a = Math.abs(r) * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
    for (let n = 0; n < 4; n++) {
      const dx = Math.abs(clamp(x, w / 2 - 50)) * fw / 100, dy = Math.abs(clamp(y, h / 2 - 50)) * fh / 100;
      const ex = fw / 2 + dx, ey = fh / 2 + dy;
      const up = Math.max(1, (ex * c + ey * sn) / (w * fw / 200), (ex * sn + ey * c) / (h * fh / 200));
      if (up <= 1.0005) break;
      w *= up; h *= up;
    }
  }
  Object.assign(img.style, { width: w + "%", height: h + "%", left: 50 + clamp(x, w / 2 - 50) + "%", top: 50 + clamp(y, h / 2 - 50) + "%", transform: r ? `translate(-50%, -50%) rotate(${r}deg)` : "" });
}

/**
 * Một khung ảnh. Ưu tiên ảnh bạn đã đặt cho ô `id` trong bản thiết kế (SLOTS),
 * sau đó tới `fallback` (đường dẫn ảnh, hoặc một bài viết để vẽ SVG), cuối cùng là ô trống có chú thích.
 */
export default function Photo({ id, fallback, caption = "", eager = false }) {
  // Ô chưa có ảnh riêng mà dự phòng là một bài viết: dùng ảnh danh sách / ảnh bìa của bài đó
  const postSlot = fallback && typeof fallback === "object" && fallback.id && (SLOTS["list-" + fallback.id] || SLOTS["cover-" + fallback.id] || SLOTS["guide-" + fallback.id]);
  const sl = (id ? SLOTS[id] : null) || postSlot || null;
  const framed = sl && (sl.s || sl.x || sl.y || sl.r);
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
  if (sl) return <div className="ph"><img ref={ref} src={abs(sl.f)} alt={caption} loading={loading} fetchPriority={eager ? "high" : undefined} className={framed ? "framed" : undefined} /></div>;
  if (typeof fallback === "string" && fallback) return <div className="ph"><img src={abs(fallback)} alt={caption} loading={loading} /></div>;
  if (fallback && typeof fallback === "object") return <div className="ph" role="img" aria-label={caption} dangerouslySetInnerHTML={{ __html: art(fallback) }} />;
  return <div className="ph blank"><span>{caption}</span></div>;
}

// Một ô ảnh bọc trong div (dùng cho lưới ảnh)
export function Box({ id, fallback, caption, className }) {
  return <div className={className}><Photo id={id} fallback={fallback} caption={caption} /></div>;
}
