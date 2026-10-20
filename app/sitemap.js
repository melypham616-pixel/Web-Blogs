import { ALL, SITE_URL, postUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  const pages = ["/", "/gioi-thieu/", "/cam-nang/", "/blogs/"].map(path => ({ url: SITE_URL + path, changeFrequency: "weekly", priority: path === "/" ? 1 : 0.8 }));
  const posts = ALL.map(p => ({ url: SITE_URL + postUrl(p.id), changeFrequency: "monthly", priority: 0.7 }));
  return [...pages, ...posts];
}
