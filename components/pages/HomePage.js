import Slider from "@/components/Slider";
import HomeContent from "@/components/HomeContent";
import Photo from "@/components/Photo";
import { getPosts, brief, label } from "@/lib/content";
import { FEATURED, TILES, STRIP_PHOTOS } from "@/lib/site";

export default function HomePage({ lang }) {
  const posts = getPosts(lang).map(brief);
  const slides = FEATURED
    .map(([id, src]) => { const post = posts.find(p => p.id === id); return post && { post, src, label: label(post, lang) }; })
    .filter(Boolean);
  const tiles = TILES.map(([code, fb]) => ({ code, fallback: typeof fb === "string" ? fb : brief(fb) }));
  return (
    <main>
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
