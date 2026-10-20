import { allIds } from "@/lib/content";
import { LOCALES, route } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Mỗi trang xuất hiện ở mọi ngôn ngữ, kèm hreflang để Google biết các bản dịch của nhau.
const entries = (key, id, priority, changeFrequency) =>
  LOCALES.map(lang => ({
    url: SITE_URL + route(lang, key, id),
    changeFrequency,
    priority,
    alternates: { languages: Object.fromEntries(LOCALES.map(l => [l, SITE_URL + route(l, key, id)])) },
  }));

export default function sitemap() {
  return [
    ...entries("home", undefined, 1, "weekly"),
    ...["about", "guide", "blogs"].flatMap(key => entries(key, undefined, 0.8, "weekly")),
    ...allIds().flatMap(id => entries("post", id, 0.7, "monthly")),
  ];
}
