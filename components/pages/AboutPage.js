import Link from "next/link";
import Photo, { Box } from "@/components/Photo";
import { getPosts } from "@/lib/content";
import { getDict, route } from "@/lib/i18n";
import { postUrl } from "@/lib/site";

export default function AboutPage({ lang }) {
  const d = getDict(lang), a = d.about;
  const posts = getPosts(lang);
  const stats = [new Set(posts.map(p => p.c)).size, new Set(posts.map(p => p.place)).size, posts.length, 2];
  const places = posts.filter((p, i, arr) => arr.findIndex(q => q.place === p.place) === i);
  return (
    <main>
      <section className="ab-hero wrap">
        <div className="ab-text">
          <span className="kicker">{a.kicker}</span>
          <h1>{a.h1a}<br /><em>{a.h1b}</em></h1>
          <p>{a.intro}</p>
          <div className="ab-cta">
            <Link className="pill-btn solid" href={route(lang, "home")}>{a.readBlog}</Link>
            <a className="pill-btn" href="#contact">{a.contact}</a>
          </div>
        </div>
        <div className="ab-photos">
          <div className="arch"><Photo id="about-hero" caption={a.portrait} eager /></div>
          <div className="inset"><Photo id="about-hero-2" caption={a.onTheRoad} /></div>
        </div>
      </section>

      <section className="ab-stats"><div className="wrap">
        {stats.map((n, i) => <div key={i}><span className="n">{n}</span><span className="l">{a.stats[i]}</span></div>)}
      </div></section>

      <section className="ab-story wrap">
        <div className="ab-grid">
          <Box id="about-story-a" caption={a.klMemory} />
          <Box id="about-story-b" caption={a.journeyPhoto} />
          <Box id="about-story-c" caption={a.journeyPhoto} />
        </div>
        <div className="ab-text">
          <span className="kicker">{a.storyKicker}</span>
          <h2>{a.storyTitle}</h2>
          <p>{a.story1}</p>
          <p>{a.story2}</p>
          <div className="script-sig">Mely</div>
        </div>
      </section>

      <section className="ab-values"><div className="wrap">
        <div className="head">
          <span className="kicker">{a.valuesKicker}</span>
          <h2>{a.valuesTitle}</h2>
        </div>
        <div className="cards">
          {a.values.map(([h, t], i) => <div className="card" key={i}><span className="no">0{i + 1}</span><h3>{h}</h3><p>{t}</p></div>)}
        </div>
      </div></section>

      <section className="ab-places wrap">
        <span className="kicker">{a.placesKicker}</span>
        <div className="places">
          {places.map(p => <Link key={p.id} href={postUrl(lang, p.id)}>{p.place}</Link>)}
        </div>
      </section>

      <section className="ab-cta-box">
        <h2>{a.ctaTitle}</h2>
        <p>{a.ctaText}</p>
        <a className="pill-btn solid" href="#contact">{a.ctaButton}</a>
      </section>
    </main>
  );
}
