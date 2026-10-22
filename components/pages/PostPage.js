import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import Story, { METRO_COLORS } from "@/components/Story";
import ReadProgress from "@/components/ReadProgress";
import BackButton from "@/components/BackButton";
import { SLOTS } from "@/data/slots";
import { findPost, getGuides, getPosts, isGuideId, label } from "@/lib/content";
import { relatedPosts, linkTargets, splitLinks } from "@/lib/links";
import { getDict, OG_LOCALE, route } from "@/lib/i18n";
import { pageMetadata, paths, trimDesc } from "@/lib/meta";
import { SITE_URL, pad2, postUrl } from "@/lib/site";

// Ảnh đại diện khi chia sẻ link: ảnh bìa bài, nếu chưa có thì ảnh đầu tiên trong bài
function shareImage(p) {
  const keys = ["cover-" + p.id, "list-" + p.id, "guide-" + p.id, ...Object.keys(SLOTS).filter(k => k.startsWith(p.id + "-"))];
  const k = keys.find(x => SLOTS[x]);
  return k ? "/" + SLOTS[k].f : undefined;
}

/** Metadata (tiêu đề, mô tả, ảnh chia sẻ, canonical, hreflang) cho một bài ở một ngôn ngữ. */
export function postMetadata(lang, id) {
  const p = findPost(id, lang);
  if (!p) return {};
  const img = shareImage(p);
  const url = postUrl(lang, id);
  const desc = trimDesc(p.desc || p.ex);
  const seoTitle = p.seo || p.title;
  return pageMetadata(lang, paths("post", id), {
    title: seoTitle,
    description: desc,
    openGraph: { type: "article", title: seoTitle, description: desc, url, locale: OG_LOCALE[lang], images: img ? [img] : undefined },
    twitter: { card: img ? "summary_large_image" : "summary", title: seoTitle, description: desc, images: img ? [img] : undefined },
  });
}

export default function PostPage({ lang, id }) {
  const p = findPost(id, lang);
  if (!p) notFound();
  const d = getDict(lang), t = d.post;

  const stories = p.stories || [];
  const hasChapter = stories.some(s => s.layout === "chapter");
  const related = relatedPosts(p.id, isGuideId(id) ? getGuides(lang) : getPosts(lang));
  const targets = linkTargets(p.id, lang), used = new Set();
  const img = shareImage(p);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: trimDesc(p.ex),
    inLanguage: lang,
    author: { "@type": "Person", name: "Mely" },
    publisher: { "@type": "Organization", name: "Đi Rồi Kể", url: SITE_URL, logo: { "@type": "ImageObject", url: SITE_URL + "/icon.png" } },
    image: img ? SITE_URL + img : undefined,
    mainEntityOfPage: SITE_URL + postUrl(lang, p.id),
    about: p.place,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: d.nav.home, item: SITE_URL + route(lang, "home") },
      { "@type": "ListItem", position: 2, name: p.title, item: SITE_URL + postUrl(lang, p.id) },
    ],
  };

  return (
    <main>
      <ReadProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <div className="wrap">
        <article className="article">
          <BackButton lang={lang} />
          <span className="label accent">{label(p, lang)}</span>
          <h1>{p.title}</h1>
          <div className="meta">{p.place}</div>
          <div className={"cover" + (hasChapter ? " bleed" : "")}><Photo id={"cover-" + p.id} fallback={p} caption={p.place} eager /></div>
          <p className="lede">{p.ex}</p>

          {(p.body || []).map(([h, text], k) => (
            <div className="sec" key={k}>
              {h && <h2>{h}</h2>}
              <p>{splitLinks(text, targets, used).map((part, n) => typeof part === "string" ? part : <Link key={n} className="inlink" href={postUrl(lang, part.id)}>{part.text}</Link>)}</p>
            </div>
          ))}

          {stories.some(s => s.layout === "metro") && (
            <div className="route">
              <div className="top"><span>{t.route(p.place)}</span><span>{t.stops(stories.length)}</span></div>
              <div className="stops">{stories.map((s, i) => (
                <div className="stop" key={i} style={{ "--c": METRO_COLORS[i % 4] }}><div className="rail" /><div className="nm"><b>{pad2(i + 1)}</b><span>{s.station || s.h}</span></div></div>
              ))}</div>
            </div>
          )}

          {stories.length > 0 && <div className="stories">{stories.map((st, i, arr) => <Story key={i} lang={lang} post={p} st={st} i={i} arr={arr} />)}</div>}

          {p.closing && (
            <section className="closing">
              <div className={"wide" + (hasChapter ? " bleed-x" : "")}><Photo id={p.id + "-closing"} caption={t.closingAlt} /></div>
              <div className="txt"><div className="rule" /><p>{p.closing}</p><div className="label accent">Mely</div></div>
            </section>
          )}

          <div className="tip"><span className="label accent">{t.tip}</span><span>{p.tip}</span></div>

          {p.sources && p.sources.length > 0 && (
            <div className="sources">
              <span className="label">{t.sources}</span>
              <ul>{p.sources.map(x => <li key={x.u}><a href={x.u} target="_blank" rel="noopener noreferrer">{x.t}</a></li>)}</ul>
            </div>
          )}

          {related.length > 0 && (
            <div className="related">
              <div className="sec-title"><span className="label">{t.related}</span></div>
              <div className="grid">{related.map(r => (
                <Link className="card zoom" href={postUrl(lang, r.id)} key={r.id}><div className="pic"><Photo id={"rel-" + r.id} fallback={r} caption={r.place} /></div><b>{r.title}</b></Link>
              ))}</div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
