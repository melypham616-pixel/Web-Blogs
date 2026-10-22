import Slider from "@/components/Slider";
import HomeContent from "@/components/HomeContent";
import Photo from "@/components/Photo";
import { getPosts, brief, label } from "@/lib/content";
import { FEATURED, TILES, STRIP_PHOTOS, SITE_URL } from "@/lib/site";
import { getDict, route } from "@/lib/i18n";

export default function HomePage({ lang }) {
  const posts = getPosts(lang).map(brief);
  const slides = FEATURED
    .map(([id, src]) => { const post = posts.find(p => p.id === id); return post && { post, src, label: label(post, lang) }; })
    .filter(Boolean);
  const tiles = TILES.map(([code, fb]) => ({ code, fallback: typeof fb === "string" ? fb : brief(fb) }));
  const d = getDict(lang);
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "WebSite", name: "Đi Rồi Kể", url: SITE_URL + route(lang, "home"),
      inLanguage: lang, description: d.siteDesc,
      publisher: { "@type": "Person", name: "Mely" },
    },
    { "@context": "https://schema.org", "@type": "Person", name: "Mely", url: SITE_URL, image: SITE_URL + "/icon.png", description: d.siteDesc },
  ];
  return (
    <main>
      <h1 className="sr-only">{d.siteTitle}</h1>
      {jsonLd.map((j, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />)}
      <div className="wrap">
        <Slider lang={lang} slides={slides} />
        <HomeContent lang={lang} posts={posts} tiles={tiles} />
      </div>
      <div className="strip">
        {STRIP_PHOTOS.map((src, i) => <div key={i}><Photo id={"strip-mely-" + i} fallback={src} /></div>)}
      </div>
    </main>
  );
}
