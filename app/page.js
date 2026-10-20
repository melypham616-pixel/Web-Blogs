import Slider from "@/components/Slider";
import HomeContent from "@/components/HomeContent";
import Photo from "@/components/Photo";
import { STRIP_PHOTOS } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <div className="wrap">
        <Slider />
        <HomeContent />
      </div>
      <div className="strip">
        {STRIP_PHOTOS.map((src, i) => <div key={i}><Photo id={"strip-mely-" + i} fallback={src} /></div>)}
      </div>
    </main>
  );
}
