import Link from "next/link";
import Photo, { Box } from "@/components/Photo";
import { POSTS, postUrl } from "@/lib/site";

export const metadata = {
  title: "Về Mely",
  description: "Mely là người yêu du lịch, từng sống hai năm ở Malaysia. Đi Rồi Kể là nơi Mely chia sẻ những chuyến đi chậm ở Việt Nam, Malaysia và Singapore.",
  alternates: { canonical: "/gioi-thieu/" },
};

const VALUES = [
  ["Đi chậm", "Không chạy theo lịch trình dày đặc, mình thích ngồi lại một quán nhỏ, đi bộ qua những con phố và cảm nhận nhịp sống của từng nơi."],
  ["Chân thật", "Mọi bài viết đều từ trải nghiệm của chính mình, có chỗ đẹp, có chỗ chưa như mong đợi, để bạn có cái nhìn thật nhất trước mỗi chuyến đi."],
  ["Sẻ chia", "Từ cách di chuyển, món nên thử đến những mẹo nhỏ, mình mong blog là cuốn sổ tay giúp hành trình của bạn suôn sẻ hơn."],
];

export default function About() {
  const stats = [[new Set(POSTS.map(p => p.c)).size, "Quốc gia"], [new Set(POSTS.map(p => p.place)).size, "Điểm đến"], [POSTS.length, "Bài viết"], [2, "Năm sống ở Malaysia"]];
  const places = POSTS.filter((p, i, a) => a.findIndex(q => q.place === p.place) === i);
  return (
    <main>
      <section className="ab-hero wrap">
        <div className="ab-text">
          <span className="kicker">Về mình</span>
          <h1>Xin chào,<br /><em>mình là Mely</em></h1>
          <p>Mình là Mely, một người yêu thích du lịch, khám phá những vùng đất mới và lưu giữ những khoảnh khắc qua ống kính. Đây là góc nhỏ để mình chia sẻ những câu chuyện, trải nghiệm, món ngon và những địa điểm thú vị trên hành trình của mình.</p>
          <div className="ab-cta">
            <Link className="pill-btn solid" href="/">Đọc blog</Link>
            <a className="pill-btn" href="#contact">Liên hệ</a>
          </div>
        </div>
        <div className="ab-photos">
          <div className="arch"><Photo id="about-hero" caption="Ảnh chân dung của bạn" eager /></div>
          <div className="inset"><Photo id="about-hero-2" caption="Ảnh trên đường đi" /></div>
        </div>
      </section>

      <section className="ab-stats"><div className="wrap">
        {stats.map(([n, l]) => <div key={l}><span className="n">{n}</span><span className="l">{l}</span></div>)}
      </div></section>

      <section className="ab-story wrap">
        <div className="ab-grid">
          <Box id="about-story-a" caption="Kỷ niệm ở Kuala Lumpur" />
          <Box id="about-story-b" caption="Ảnh hành trình" />
          <Box id="about-story-c" caption="Ảnh hành trình" />
        </div>
        <div className="ab-text">
          <span className="kicker">Câu chuyện của mình</span>
          <h2>Hành trình bắt đầu từ chiếc ba lô đầu tiên</h2>
          <p>Malaysia là đất nước đầu tiên mình đặt chân đến khi ra nước ngoài, cũng là nơi mình gắn bó suốt hai năm thanh xuân, vừa đi làm, vừa khám phá. Những ngày ở Kuala Lumpur cho mình thật nhiều kỷ niệm, từ những ngày vui vẻ đến những khoảng thời gian không mấy dễ dàng.</p>
          <p>Trở về Việt Nam, mình tiếp tục xách ba lô lên và đi, từ những cung đường vùng cao Hà Giang đến phố núi Đà Lạt. Hy vọng những điều mình viết sẽ mang đến cho bạn một chút cảm hứng để khám phá thế giới theo cách riêng của mình.</p>
          <div className="script-sig">Mely</div>
        </div>
      </section>

      <section className="ab-values"><div className="wrap">
        <div className="head">
          <span className="kicker">Điều mình tin</span>
          <h2>Vì sao mình viết blog này</h2>
        </div>
        <div className="cards">
          {VALUES.map(([h, t], i) => <div className="card" key={h}><span className="no">0{i + 1}</span><h3>{h}</h3><p>{t}</p></div>)}
        </div>
      </div></section>

      <section className="ab-places wrap">
        <span className="kicker">Những nơi mình đã đi</span>
        <div className="places">
          {places.map(p => <Link key={p.id} href={postUrl(p.id)}>{p.place}</Link>)}
        </div>
      </section>

      <section className="ab-cta-box">
        <h2>Cùng mình đi tiếp nhé?</h2>
        <p>Nếu bạn có câu hỏi về một điểm đến, muốn hợp tác hay chỉ đơn giản là muốn trò chuyện, đừng ngại nhắn cho mình.</p>
        <a className="pill-btn solid" href="#contact">Liên hệ với mình</a>
      </section>
    </main>
  );
}
