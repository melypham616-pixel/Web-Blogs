import { SITE_URL, SITE_NAME } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE, OG_LOCALE, getDict, route } from "@/lib/i18n";

/** Ảnh chia sẻ mặc định cho trang không có ảnh riêng (ảnh banner trang chủ). */
export const DEFAULT_OG_IMAGE = "/images/photos/penang-hero.jpeg";

/** Rút gọn mô tả còn tối đa ~155 ký tự (Google thường cắt ở khoảng 155–160), ưu tiên dừng ở cuối câu hoặc cuối từ. */
export function trimDesc(text = "", max = 155) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const dot = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (dot > max * 0.6) return cut.slice(0, dot + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:–-]\s*$/, "") + "…";
}

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/** Metadata chung cho layout gốc của từng ngôn ngữ. */
export function layoutMetadata(lang) {
  const d = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.siteTitle, template: "%s | Đi Rồi Kể" },
    description: d.siteDesc,
    // Google Search Console: mã xác minh dạng meta tag (có thể ghi đè bằng NEXT_PUBLIC_GSC_VERIFICATION)
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "dJ8LhRyY584-VPZc34FrXTeUAK0gATI8ypgwYfeLLTc" },
    openGraph: { type: "website", siteName: SITE_NAME, locale: OG_LOCALE[lang], title: d.ogTitle, description: d.ogDesc, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: d.ogTitle, description: d.ogDesc, images: [DEFAULT_OG_IMAGE] },
  };
}

/**
 * Metadata cho một trang: canonical + hreflang cho mọi ngôn ngữ.
 * `paths` là địa chỉ của cùng trang đó ở từng ngôn ngữ, ví dụ { vi: "/cam-nang/", en: "/en/guides/" }.
 */
export function pageMetadata(lang, paths, extra = {}) {
  const languages = Object.fromEntries(LOCALES.map(l => [l, paths[l]]));
  languages["x-default"] = paths[DEFAULT_LOCALE];
  return { ...extra, alternates: { canonical: paths[lang], languages } };
}

/** Địa chỉ của cùng một trang ở mọi ngôn ngữ: paths("guide") → { vi: "/cam-nang/", en: "/en/guides/" } */
export const paths = (key, id) => Object.fromEntries(LOCALES.map(l => [l, route(l, key, id)]));
