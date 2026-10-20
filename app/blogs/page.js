import Link from "next/link";
import Photo from "@/components/Photo";
import RtGuides from "@/components/RtGuides";

export const metadata = {
  title: "Du lịch có trách nhiệm",
  description: "Những cách đi nhẹ nhàng hơn với thiên nhiên và con người ở Việt Nam, Malaysia và Singapore: ít rác nhựa, tôn trọng văn hoá, ủng hộ người dân địa phương.",
  alternates: { canonical: "/blogs/" },
};

export default function Blogs() {
  return (
    <main>
      <div className="wrap">
        <section className="hero-box rt-hero">
          <div className="bg"><Photo id="rt-hero" fallback={{ scene: "tea", colors: ["#E6ECDD", "#E9B663", "#79A061", "#2F5A35"] }} caption="Du lịch có trách nhiệm" eager /></div>
          <div className="box">
            <div className="label accent">Đi nhẹ nhàng</div>
            <h1>Du lịch có trách nhiệm</h1>
            <p>Đi xa mà vẫn để lại những nơi mình qua đẹp như lúc mình đến.</p>
          </div>
        </section>

        <div className="intro">
          <p>Càng đi nhiều, mình càng nhận ra mỗi chuyến đi đều để lại dấu vết: một chai nhựa trên bãi biển, một con đường mòn bị giẫm nát, hay một quán ăn gia đình được sống thêm nhờ khách ghé. Dấu vết đó tốt hay xấu phần lớn tuỳ vào cách mình chọn đi.</p>
          <blockquote className="pull">Mình không cần trở thành người du lịch hoàn hảo. Chỉ cần mỗi chuyến đi tử tế hơn chuyến trước một chút.</blockquote>
          <p>Du lịch là một ngành rất lớn, và dấu chân carbon của nó cũng không nhỏ. Một nghiên cứu đăng trên Nature Climate Change năm 2018 ước tính du lịch chiếm khoảng 8% lượng khí thải nhà kính toàn cầu, phần lớn đến từ việc đi lại, đặc biệt là máy bay.</p>
          <p>Với mình, du lịch có trách nhiệm đơn giản là ba điều: giảm tác động xấu lên thiên nhiên, tôn trọng văn hoá nơi mình đến, và để tiền của mình đi vào túi người dân địa phương.</p>
        </div>

        <RtGuides />

        <div className="rt-about">
          <div className="label accent">Về Đi Rồi Kể</div>
          <h2>Một blog nhỏ về những chuyến đi chậm</h2>
          <p>Đi Rồi Kể là nơi mình chia sẻ trải nghiệm thật ở Việt Nam, Malaysia và Singapore: lịch trình, món ăn và những cách đi nhẹ nhàng hơn với thiên nhiên và con người nơi mình đến.</p>
          <Link className="btn" href="/">Về trang chủ</Link>
        </div>
      </div>
    </main>
  );
}
