import Link from "next/link";
import Photo from "@/components/Photo";
import RtGuides from "@/components/RtGuides";
import { getGuides, brief } from "@/lib/content";
import { getDict, route } from "@/lib/i18n";

export default function BlogsPage({ lang }) {
  const b = getDict(lang).blogs;
  const items = getGuides(lang).map(brief);
  return (
    <main>
      <div className="wrap">
        <section className="hero-box rt-hero">
          <div className="bg"><Photo id="rt-hero" fallback={{ scene: "tea", colors: ["#E6ECDD", "#E9B663", "#79A061", "#2F5A35"] }} caption={b.h1} eager /></div>
          <div className="box">
            <div className="label accent">{b.kicker}</div>
            <h1>{b.h1}</h1>
            <p>{b.sub}</p>
          </div>
        </section>

        <div className="intro">
          <p>{b.intro1}</p>
          <blockquote className="pull">{b.pull}</blockquote>
          <p>{b.intro2}</p>
          <p>{b.intro3}</p>
        </div>

        <RtGuides lang={lang} items={items} />

        <div className="rt-about">
          <div className="label accent">{b.aboutKicker}</div>
          <h2>{b.aboutTitle}</h2>
          <p>{b.aboutText}</p>
          <Link className="btn" href={route(lang, "home")}>{b.backHome}</Link>
        </div>
      </div>
    </main>
  );
}
