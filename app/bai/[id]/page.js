import Link from "next/link";
import { notFound } from "next/navigation";
import Photo, { Box } from "@/components/Photo";
import Story, { METRO_COLORS } from "@/components/Story";
import ReadProgress from "@/components/ReadProgress";
import BackButton from "@/components/BackButton";
import { SLOTS } from "@/data/slots";
import { ALL, GUIDES, POSTS, SITE_URL, findPost, isGuide, label, pad2, postUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL.map(p => ({ id: p.id }));
}

// Ảnh đại diện khi chia sẻ link: ảnh bìa bài, nếu chưa có thì ảnh đầu tiên trong bài
function shareImage(p) {
  const keys = ["cover-" + p.id, "list-" + p.id, "guide-" + p.id, ...Object.keys(SLOTS).filter(k => k.startsWith(p.id + "-"))];
  const k = keys.find(x => SLOTS[x]);
  return k ? "/" + SLOTS[k].f : undefined;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = findPost(id);
  if (!p) return {};
  const img = shareImage(p);
  return {
    title: p.title,
    description: p.ex,
    alternates: { canonical: postUrl(p.id) },
    openGraph: { type: "article", title: p.title, description: p.ex, url: postUrl(p.id), images: img ? [img] : undefined },
    twitter: { card: img ? "summary_large_image" : "summary", title: p.title, description: p.ex, images: img ? [img] : undefined },
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const p = findPost(id);
  if (!p) notFound();

  const stories = p.stories || [];
  const hasChapter = stories.some(s => s.layout === "chapter");
  const related = (isGuide(p) ? GUIDES : POSTS).filter(x => x.id !== p.id).slice(0, 3);
  const img = shareImage(p);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.ex,
    inLanguage: "vi",
    author: { "@type": "Person", name: "Mely" },
    image: img ? SITE_URL + img : undefined,
    mainEntityOfPage: SITE_URL + postUrl(p.id),
    about: p.place,
  };

  return (
    <main>
      <ReadProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <article className="article">
          <BackButton />
          <span className="label accent">{label(p)}</span>
          <h1>{p.title}</h1>
          <div className="meta">{p.place}</div>
          <div className={"cover" + (hasChapter ? " bleed" : "")}><Photo id={"cover-" + p.id} fallback={p} caption={p.place} eager /></div>
          <p className="lede">{p.ex}</p>

          {(p.body || []).map(([h, t], k) => (
            <div className="sec" key={k}>
              {h && <h2>{h}</h2>}
              <p>{t}</p>
              {t.startsWith("Bukit Bintang tiện") && <div className="gallery">{[1, 2, 3, 4, 5, 6].map(n => <Box key={n} id={"kl-khu-" + n} caption={"Ảnh " + n} />)}</div>}
            </div>
          ))}

          {stories.some(s => s.layout === "metro") && (
            <div className="route">
              <div className="top"><span>Tuyến hành trình · {p.place}</span><span>{stories.length} ga</span></div>
              <div className="stops">{stories.map((s, i) => (
                <div className="stop" key={i} style={{ "--c": METRO_COLORS[i % 4] }}><div className="rail" /><div className="nm"><b>{pad2(i + 1)}</b><span>{s.station || s.h}</span></div></div>
              ))}</div>
            </div>
          )}

          {stories.length > 0 && <div className="stories">{stories.map((st, i, arr) => <Story key={i} post={p} st={st} i={i} arr={arr} />)}</div>}

          {p.closing && (
            <section className="closing">
              <div className={"wide" + (hasChapter ? " bleed-x" : "")}><Photo id={p.id + "-closing"} caption="Ảnh khép lại hành trình" /></div>
              <div className="txt"><div className="rule" /><p>{p.closing}</p><div className="label accent">Mely</div></div>
            </section>
          )}

          <div className="tip"><span className="label accent">Mẹo nhỏ</span><span>{p.tip}</span></div>

          {related.length > 0 && (
            <div className="related">
              <div className="sec-title"><span className="label">Đọc tiếp</span></div>
              <div className="grid">{related.map(r => (
                <Link className="card zoom" href={postUrl(r.id)} key={r.id}><div className="pic"><Photo id={"rel-" + r.id} fallback={r} caption={r.place} /></div><b>{r.title}</b></Link>
              ))}</div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
