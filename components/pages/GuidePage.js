import Link from "next/link";
import Photo from "@/components/Photo";
import GuideGrid from "@/components/GuideGrid";
import { getPosts, brief } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { mapPins, postUrl } from "@/lib/site";

function MapPanel({ lang, name, count, pins, flex }) {
  const g = getDict(lang).guide;
  return (
    <div className="map" style={{ flex }}>
      <div className="cap"><b>{name}</b><span>{g.places(count)}</span></div>
      {pins.map(p => (
        <Link key={p.id} href={postUrl(lang, p.id)} className={"pin " + p.dir} style={{ left: p.x + "%", top: p.y + "%" }}><i /><span>{p.name}</span></Link>
      ))}
    </div>
  );
}

export default function GuidePage({ lang }) {
  const d = getDict(lang), g = d.guide;
  const pins = mapPins(lang);
  const items = getPosts(lang).filter(p => p.cat === "Cẩm nang").map(brief);
  return (
    <main className="v-guide">
      <GuideGrid lang={lang} items={items} banner={<>
        <div className="bg"><Photo id="guide-banner" eager /></div>
        <div className="shade" />
        <div className="inner">
          <div className="eyebrow"><span className="line" /><span>{g.eyebrow}</span></div>
          <h1>{g.h1a}<br /><em>{g.h1b}</em></h1>
          <p>{g.text}</p>
          <div className="maps">
            <MapPanel lang={lang} name={d.countries.vn} count={pins.vn.length} pins={pins.vn} flex="1 1 260px" />
            <MapPanel lang={lang} name={d.countries.mySg} count={pins.my.length} pins={pins.my} flex="1.4 1 320px" />
          </div>
        </div>
      </>} />
    </main>
  );
}
