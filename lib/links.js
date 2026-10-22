import { getAll } from "@/lib/content";
import { VN_REGIONS } from "@/lib/regions";

// Miền (Bắc/Nam) và vùng của một bài ở Việt Nam, để bổ sung gợi ý cùng khu vực
const areaOf = id => { for (const r of VN_REGIONS) for (const a of r.areas) if (a.ids.includes(id)) return [r.key, a.name.vi]; return []; };

// Bài nào nên gợi ý cho bài nào (cùng khu vực / cùng chuyến đi), theo thứ tự ưu tiên.
export const NEARBY = {
  "ha-noi": ["van-mieu", "ba-vi", "lang-van-hoa"],
  "van-mieu": ["ha-noi", "lang-van-hoa", "ba-vi"],
  "ba-vi": ["lang-van-hoa", "ha-noi", "van-mieu"],
  "lang-van-hoa": ["ba-vi", "ha-noi", "van-mieu"],
  "ha-giang": ["sa-pa", "ha-noi"],
  "sa-pa": ["ha-giang", "ha-noi"],
  "ho-chi-minh": ["vung-tau", "con-thoi-son", "binh-phuoc"],
  "vung-tau": ["ho-chi-minh", "con-thoi-son"],
  "con-thoi-son": ["ho-chi-minh", "vung-tau"],
  "binh-phuoc": ["ho-chi-minh", "nui-ba-den"],
  "nui-ba-den": ["ho-chi-minh", "binh-phuoc"],
  "da-lat": ["ho-chi-minh", "vung-tau"],
  "kuala-lumpur": ["genting", "colmar-tropicale", "malacca"],
  "genting": ["kuala-lumpur", "colmar-tropicale"],
  "colmar-tropicale": ["genting", "kuala-lumpur"],
  "malacca": ["kuala-lumpur", "penang"],
  "penang": ["ipoh", "cameron", "pangkor"],
  "ipoh": ["cameron", "penang", "pangkor"],
  "cameron": ["ipoh", "penang"],
  "pangkor": ["ipoh", "penang"],
  "merlion-park": ["gardens-by-the-bay", "clarke-quay", "chinatown-sg"],
  "gardens-by-the-bay": ["merlion-park", "clarke-quay", "chinatown-sg"],
  "clarke-quay": ["merlion-park", "chinatown-sg", "gardens-by-the-bay"],
  "chinatown-sg": ["clarke-quay", "merlion-park", "gardens-by-the-bay"],
};

// Tên gọi khác của một nơi, để nhận ra khi bài khác nhắc tới (ngoài tên menu/địa điểm của bài)
const ALIASES = {
  vi: { "ho-chi-minh": ["Sài Gòn", "TP.HCM", "Hồ Chí Minh"], "ha-noi": ["Hà Nội"], "van-mieu": ["Văn Miếu"], "lang-van-hoa": ["Làng Văn hóa"] },
  en: { "ho-chi-minh": ["Saigon", "Ho Chi Minh City"], "ha-noi": ["Hanoi"], "van-mieu": ["Temple of Literature"], "lang-van-hoa": ["Ethnic Villages"] },
};

/** Các bài liên quan: ưu tiên bài cùng khu vực (NEARBY), rồi bổ sung bài cùng nhóm cho đủ `n` bài. */
export function relatedPosts(id, pool, n = 3) {
  const byId = new Map(pool.map(p => [p.id, p]));
  const out = (NEARBY[id] || []).map(x => byId.get(x)).filter(Boolean);
  const me = byId.get(id);
  const [region, area] = areaOf(id);
  const tiers = [p => area && areaOf(p.id)[1] === area, p => region && areaOf(p.id)[0] === region, p => me && p.c === me.c];
  for (const ok of tiers) for (const p of pool) {
    if (out.length >= n) break;
    if (p.id !== id && !out.includes(p) && ok(p)) out.push(p);
  }
  for (const p of pool) { if (out.length >= n) break; if (p.id !== id && !out.includes(p)) out.push(p); }
  return out.slice(0, n);
}

/** Danh sách [cụm từ, id bài] để tự gắn liên kết trong đoạn mở đầu của bài `id`. */
export function linkTargets(id, lang) {
  const all = getAll(lang);
  return (NEARBY[id] || []).map(x => all.find(p => p.id === x)).filter(Boolean).flatMap(p => {
    const names = [...(ALIASES[lang]?.[p.id] || []), p.menu, p.place].filter(Boolean);
    return [...new Set(names)].map(n => [n, p.id]);
  });
}

const isLetter = ch => !!ch && /\p{L}/u.test(ch);

/** Tách đoạn văn thành các phần: chuỗi thường và { text, id } cho chỗ cần liên kết (mỗi bài chỉ liên kết lần nhắc đầu tiên). */
export function splitLinks(text, targets, used = new Set()) {
  const hits = [];
  for (const [name, id] of targets) {
    if (used.has(id)) continue;
    let from = 0, at = -1;
    while ((at = text.indexOf(name, from)) !== -1) {
      if (!isLetter(text[at - 1]) && !isLetter(text[at + name.length])) break;
      from = at + 1; at = -1;
    }
    if (at !== -1) hits.push({ at, name, id });
  }
  hits.sort((a, b) => a.at - b.at || b.name.length - a.name.length);
  const parts = []; let pos = 0;
  for (const h of hits) {
    if (h.at < pos || used.has(h.id)) continue;
    if (h.at > pos) parts.push(text.slice(pos, h.at));
    parts.push({ text: h.name, id: h.id }); used.add(h.id); pos = h.at + h.name.length;
  }
  if (pos < text.length) parts.push(text.slice(pos));
  return parts;
}
