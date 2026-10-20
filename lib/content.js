import { POSTS, GUIDES } from "@/data/posts";
import { EN } from "@/data/en/posts";
import { getDict } from "@/lib/i18n";

// Bản dịch theo ngôn ngữ: { mã ngôn ngữ: { id bài: { title, ex, place, ..., stories: [...] } } }
// Tiếng Việt là nội dung gốc trong data/posts.js nên không cần bản dịch.
const TRANSLATIONS = { en: EN };

const TEXT_FIELDS = ["title", "ex", "place", "menu", "body", "closing", "tip"];

/** Trả về bài đã ghép bản dịch. Trường nào chưa dịch thì dùng tiếng Việt. */
export function localize(p, lang) {
  const tr = TRANSLATIONS[lang]?.[p.id];
  if (!tr) return p;
  const out = { ...p };
  for (const k of TEXT_FIELDS) if (tr[k] !== undefined) out[k] = tr[k];
  if (p.stories) out.stories = p.stories.map((s, i) => ({ ...s, ...(tr.stories?.[i] || {}) }));
  return out;
}

export const getPosts = lang => POSTS.map(p => localize(p, lang));
export const getGuides = lang => GUIDES.map(p => localize(p, lang));
export const getAll = lang => [...getPosts(lang), ...getGuides(lang)];
export const allIds = () => [...POSTS, ...GUIDES].map(p => p.id);
export const isGuideId = id => GUIDES.some(g => g.id === id);
export const findPost = (id, lang) => getAll(lang).find(p => p.id === id);

/** Bản rút gọn của bài để truyền xuống component client (chỉ những trường cần hiển thị). */
export const brief = p => ({ id: p.id, c: p.c, cat: p.cat, place: p.place, menu: p.menu || null, title: p.title, ex: p.ex, tip: p.tip || null, scene: p.scene, colors: p.colors });

/** Nhãn "Quốc gia · Danh mục" theo ngôn ngữ. */
export function label(p, lang) {
  const d = getDict(lang);
  return d.countries[p.c] + " · " + (d.cats[p.cat] || p.cat);
}
