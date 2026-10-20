import Photo, { Box } from "@/components/Photo";
import { pad2 } from "@/lib/site";

export const METRO_COLORS = ["#D6334A", "#2F6FB3", "#D98E04", "#2E9466"];
const LETTERS = "abcdefghijkl";
const GALLERY_AR = ["3/4", "4/3", "1/1", "4/5", "3/2", "3/4", "1/1", "4/3", "3/4"];

const Dash = () => <div className="dash"><i /><i /><i /></div>;
const Text = ({ t }) => <p className="st-t">{t}</p>;

/**
 * Một đoạn câu chuyện trong bài. `st.layout` chọn bố cục:
 * essay, cloud, tide, postcard, gallery, terrace, story, night, chapter, metro, mosaic, single;
 * không có layout: "full" (k = "Cà phê" hoặc full: true) hoặc "split".
 * Mã ô ảnh giữ đúng như bản thiết kế để ảnh khớp với SLOTS.
 */
export default function Story({ post, st, i, arr }) {
  const base = st.sid ? post.id + "-" + st.sid : post.id;
  const id = st.sid ? base : post.id + "-st-" + arr.slice(0, i).filter(x => !x.sid).length;
  const ph = st.ph || [];
  const cap = (n, d) => ph[n] || d;
  const slot = (s, c, cls) => <Box id={id + "-" + s} caption={c} className={cls} />;
  const num = pad2(i + 1);
  const flip = i % 2 ? " flip" : "";
  const notLast = i < arr.length - 1;
  const p1 = cap(0, st.layout === "mosaic" ? "Toàn cảnh " + st.h : "Ảnh chính: " + st.h);
  const s2 = cap(1, "Ảnh chi tiết"), s3 = cap(2, "Ảnh chi tiết");

  switch (st.layout) {
    case "essay":
      return (
        <section className="st-essay">
          <div className="side">
            <span className="num">{num}</span><span className="k">{st.k}</span><h3>{st.h}</h3><div className="where">{st.where}</div>
            {ph.length > 0 && slot("a", p1, "pic")}
          </div>
          <div className="main-col">{st.quote && <blockquote>“{st.quote}”</blockquote>}<Text t={st.t} /></div>
        </section>
      );
    case "cloud":
      return (
        <section className={"st-cloud bleed-x" + flip}>
          <div className="hero">
            <div className="fill"><Photo id={id + "-a"} caption={p1} /></div><div className="shade" />
            <div className="glass"><div className="top"><b>{num}</b><span>{st.k}</span></div><h3>{st.h}</h3><div className="where">{st.where}</div><Text t={st.t} /></div>
          </div>
          <div className="grid">{slot("b", s2)}{slot("c", s3)}{ph.slice(3).map((c, k) => <Box key={k} id={base + "-" + "defgh"[k]} caption={c} />)}</div>
        </section>
      );
    case "tide": {
      const bg = ["#E6F4F3", "#FBEBD8", "#E3EEF4", "#F6EFDF"][i % 4], acc = ["#1E7F86", "#D9774A", "#2D6C8C", "#B7863E"][i % 4];
      return (
        <section className={"st-tide bleed-x" + flip} style={{ "--tbg": bg, "--tacc": acc }}>
          <div className="wide"><Photo id={id + "-a"} caption={p1} /><div className="wave" /></div>
          <div className="panel">
            <div className="txt"><div className="top"><b>{num}</b><span>{st.k}</span></div><h3>{st.h}</h3><div className="where">{st.where}</div><Text t={st.t} /></div>
            <div className="side">{slot("b", s2)}{slot("c", s3)}</div>
          </div>
        </section>
      );
    }
    case "postcard":
      return (
        <section className={"st-postcard" + flip}>
          <div className="card">
            <div className="left">
              <div className="polaroid">{slot("a", p1)}</div>
              {st.inner && <div className="inner-pic">{slot("e", st.inner)}</div>}
            </div>
            <div className="right">
              <div className="head">
                <div><span className="k">— {st.k} —</span><h3>{st.h}</h3></div>
                <div className="stamp"><div className="perf"><div className="face"><b>{num}</b><small>{post.stamp || post.place.toUpperCase() + " · MY"}</small></div></div><div className="pmark">MALAYSIA<br />· 1928 ·</div></div>
              </div>
              <div className="where">{st.where}</div><Text t={st.t} />
            </div>
          </div>
          <div className="taped">
            <figure>{slot("b", s2)}</figure><figure>{slot("c", s3)}</figure>
            {ph.length === 4 && <figure>{slot("d", cap(3, "Chân dung"))}</figure>}
          </div>
        </section>
      );
    case "gallery": {
      const items = ph.map((c, k) => ({ c, L: LETTERS[k], ar: GALLERY_AR[k % 9], src: (st.imgs || [])[k] || "" })).filter(g => !(st.hide || []).includes(g.L));
      return (
        <section className="st-gallery">
          <div className="head">
            <div><div className="green-num"><b>{num}</b><span>{st.k}</span></div><h3>{st.h}</h3><div className="where">{st.where}</div></div>
            <Text t={st.t} />
          </div>
          <div className="masonry">{items.map(g => <div key={g.L} style={{ aspectRatio: g.ar }}><Photo id={base + "-" + g.L} fallback={g.src} caption={g.c} /></div>)}</div>
          {notLast && <Dash />}
        </section>
      );
    }
    case "terrace":
      return (
        <section className={"st-terrace" + flip}>
          <div className="row">
            {slot("a", p1, "pic")}
            <div className="card"><div className="green-num"><b>{num}</b><span>{st.k}</span></div><h3>{st.h}</h3><div className="where">{st.where}</div><Text t={st.t} /></div>
          </div>
          <div className="pair">{slot("b", s2)}{slot("c", s3)}</div>
          {notLast && <Dash />}
        </section>
      );
    case "story":
      return (
        <section className="st-story">
          <div className="head">
            <div className="meta-line"><span>{st.k}</span><i /><span>{st.time || st.where || ""}</span></div>
            <h3>{st.h}</h3>
            {st.time && st.where && <div className="st-where">{st.where}</div>}
          </div>
          {slot("a", p1, "wide")}
          <Text t={st.t} />
          <div className="row">{ph.slice(1).map((c, j) => <figure key={j}><Box id={base + "-" + "bcd"[j]} caption={c} /><figcaption>{c}</figcaption></figure>)}</div>
          {notLast && <div className="dots"><i /><i /></div>}
        </section>
      );
    case "night":
      return (
        <section className="st-night bleed-x">
          <div className="wide">
            <Photo id={id + "-a"} caption={p1} /><div className="shade" />
            <div className="cap"><div className="top"><b>{num}</b><i /><span>{st.k}</span></div><h3>{st.h}</h3></div>
          </div>
          <div className="body"><div className="where">{st.where}</div><Text t={st.t} /><div className="pair">{slot("b", s2)}{slot("c", s3)}</div></div>
        </section>
      );
    case "chapter": {
      const vars = i % 2
        ? { "--chbg": "#F6EDE4", "--chink": "#1F1D1C", "--chsub": "#6F6A66", "--chacc": "#B5552F", "--chrule": "#E2D6CA" }
        : { "--chbg": "#22394A", "--chink": "#F5F3F1", "--chsub": "#C9D3D9", "--chacc": "#F2B57A", "--chrule": "#3A5265" };
      const four = ph.length === 4;
      return (
        <section className={"st-chapter bleed-x" + flip} style={vars}>
          <div className="head"><span className="big">{num}</span><div><div className="k">{st.k}</div><h3>{st.h}</h3></div><div className="where">{st.where}</div></div>
          <div className="body"><Text t={st.t} /><div className={"imgs" + (four ? " four" : "")}>{slot("a", p1)}{slot("b", s2)}{slot("c", s3)}{four && slot("d", cap(3, "Chân dung"))}</div></div>
          {ph.length > 4 && <div className="strip4">{ph.slice(3).map((c, j) => <Box key={j} id={base + "-" + "defg"[j]} caption={c} />)}</div>}
        </section>
      );
    }
    case "metro": {
      const mc = METRO_COLORS[i % 4];
      const last = i === arr.length - 1;
      const line = last ? `linear-gradient(${mc} 40%, transparent)` : `linear-gradient(${mc} 60%, ${METRO_COLORS[(i + 1) % 4]})`;
      return (
        <section className="st-metro" style={{ "--mc": mc, "--mline": line, "--mbottom": last ? "0px" : "-48px" }}>
          <div className="rail"><div className="dot">{num}</div></div>
          <div className="content">
            <div className="st-head"><div className="tags"><span className="ga">Ga {st.station || ""}</span><span>{st.k}</span></div><h3>{st.h}</h3><div className="st-where plain">{st.where}</div></div>
            <div className="imgs">{slot("a", p1)}{slot("b", s2)}{slot("c", s3)}</div>
            <Text t={st.t} />
            {ph.length > 4 && <div className="hstrip">{ph.slice(3).map((c, j) => <figure key={j}><Box id={base + "-" + "defg"[j]} caption={c} /><figcaption>{c}</figcaption></figure>)}</div>}
          </div>
        </section>
      );
    }
    case "mosaic": {
      const caps = [p1, cap(1, "Mặt hồ xanh ngọc"), cap(2, "Chi tiết"), cap(3, "Chân dung"), cap(4, "Đồi thông"), cap(5, "Góc check-in"), cap(6, "Panorama đồi và hồ")];
      return (
        <section className="st-mosaic bleed-x">
          <div className="top"><div><div className="label st-k">{num} · {st.k}</div><h3>{st.h}</h3><div className="st-where">{st.where}</div></div><Text t={st.t} /></div>
          <div className="imgs">{caps.map((c, n) => <Box key={n} id={id + "-" + LETTERS[n]} caption={c} />)}</div>
        </section>
      );
    }
  }
  if (st.layout && st.layout !== "single") return null; // kiểu chưa hỗ trợ

  const head = <div className="st-head"><div className="label st-k">{num} · {st.k}</div><h3>{st.h}</h3><div className="st-where">{st.where}</div><Text t={st.t} /></div>;
  if (!st.layout && (st.k === "Cà phê" || st.full)) {
    const caps = [p1, cap(1, "Không gian"), cap(2, "Đồ uống"), cap(3, "Góc chụp ảnh"), cap(4, "Chi tiết"), cap(5, "View")];
    return <section className="st-full">{head}<div className="imgs">{caps.map((c, n) => <Box key={n} id={id + "-" + LETTERS[n]} caption={c} />)}</div></section>;
  }
  return (
    <section className={"st-split" + flip}>
      <div className="imgs">{slot("a", p1)}{st.layout !== "single" && <>{slot("b", s2)}{slot("c", s3)}</>}</div>
      {head}
    </section>
  );
}
