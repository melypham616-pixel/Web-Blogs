import Link from "next/link";
import Photo from "@/components/Photo";
import GuideGrid from "@/components/GuideGrid";
import { mapPins, postUrl } from "@/lib/site";

export const metadata = {
  title: "Cẩm nang du lịch tự túc",
  description: "Ghi chép thực tế sau mỗi chuyến đi ở Việt Nam, Malaysia và Singapore: nên đến lúc nào, di chuyển ra sao, ăn gì và mẹo nhỏ cho hành trình suôn sẻ.",
  alternates: { canonical: "/cam-nang/" },
};

function MapPanel({ name, pins, flex }) {
  return (
    <div className="map" style={{ flex }}>
      <div className="cap"><b>{name}</b><span>{pins.length} điểm đến</span></div>
      {pins.map(p => (
        <Link key={p.id} href={postUrl(p.id)} className={"pin " + p.dir} style={{ left: p.x + "%", top: p.y + "%" }}><i /><span>{p.name}</span></Link>
      ))}
    </div>
  );
}

export default function Guide() {
  const pins = mapPins();
  return (
    <main className="v-guide">
      <GuideGrid banner={<>
        <div className="bg"><Photo id="guide-banner" eager /></div>
        <div className="shade" />
        <div className="inner">
          <div className="eyebrow"><span className="line" /><span>Sổ tay hành trình · Mely</span></div>
          <h1>Cẩm nang<br /><em>cho người thích đi</em></h1>
          <p>Những ghi chép thực tế sau mỗi chuyến đi: nên đến lúc nào, di chuyển ra sao, ăn gì và vài mẹo nhỏ để hành trình của bạn suôn sẻ hơn.</p>
          <div className="maps">
            <MapPanel name="Việt Nam" pins={pins.vn} flex="1 1 260px" />
            <MapPanel name="Malaysia · Singapore" pins={pins.my} flex="1.4 1 320px" />
          </div>
        </div>
      </>} />
    </main>
  );
}
