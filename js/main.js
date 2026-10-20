const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const smooth = () => (reduceMotion ? "auto" : "smooth");
const cname = c => c === "vn" ? "Việt Nam" : c === "my" ? "Malaysia" : c === "sg" ? "Singapore" : "Việt Nam, Malaysia & Singapore";
const label = p => cname(p.c) + " · " + p.cat;
const pad2 = n => String(n).padStart(2, "0");

// Ảnh chụp dùng ở trang chủ (đặt trong images/photos)
const PHOTO = n => "images/photos/" + n + ".jpeg";
const FEATURED = [["sa-pa", "IMG_3885"], ["ho-chi-minh", "IMG_0954"]];
const MALAYSIA_TILE = "images/photos/pasted-1792243942155-0.png";
const STRIP_PHOTOS = ["6D1F9B59-0AD3-43AB-B245-A229C11C33AA_1_105_c", "A067B649-3042-48E8-A7AD-9A668DA76998_1_105_c-002fb546", "8B1CE620-6431-4E2E-9399-B0C5EDA92DCD_1_105_c", "FCA17A9D-DD65-48F0-8167-DC07FC0B9F01_1_105_c", "32091226-1888-48E1-8BF9-DA86011DF290_1_105_c", "BCF7BA10-B0D9-4D22-A5F4-C5D8A126D495_1_105_c", "5EE5FC5F-A0FD-4237-9FA5-6BFDCB00DA98_1_105_c", "21B9F094-81D5-4D28-87D5-3665D1FEB35E_1_105_c", "8432327C-3B6D-4BA8-9C8F-EC82D3CC9702", "3471A5A6-AE71-4ED3-B93C-8F105CE7B1C4", "28FD83F8-B7B5-478B-9160-5170CCEEAD3A_1_105_c", "80F2269F-6AAC-4945-A41B-8F2C00052C1E_1_105_c", "F379357A-F423-41B1-9B28-E09C61FB0D08_1_105_c", "AB17D104-6F8A-48C9-95F1-6965AD6DF168_1_105_c", "511B17B4-0756-4F3A-9340-15FC74B43123_1_105_c", "5283F05A-5FCE-4BCB-AD01-2C5711CC027A_1_105_c", "40BCF89B-942A-49C7-B2EF-276DF1690F88_1_105_c", "D02A40C3-1B7B-4642-AC08-9EE0D4EE041B_1_105_c", "F5C94FD4-AC07-488A-BDBF-29F23B556162_1_105_c", "907D565A-D8B3-4B6D-A6BD-807E5F265D97_1_105_c", "746A1B30-ECFA-41F7-888C-A47B6A78E484_1_105_c", "7668CC11-DB91-4C70-8E66-B9680F459725_1_105_c", "87D13118-848A-412B-A8D0-3694D86ED75A_1_105_c", "FAE40637-FF2C-44B3-808E-BF7E95251F3C_1_105_c", "056F6A4C-2F99-4676-B1B1-2F4667DCC5C9_1_105_c", "6F1F1C30-3503-4C98-B35E-8FAE266B6D05_1_105_c", "1C7CEB60-9107-40D6-A6E5-FB97B348E198_1_105_c", "F0D44427-DB1B-4E5D-8928-5D0D55F04472_1_105_c", "B0445AAE-99FA-4D04-82DA-02A1F5C95AC0_1_105_c", "B1A3EA82-7F47-4935-86D2-BD9501B032E5_1_105_c", "EF167360-2A27-4A1F-A0C6-7BB3291A6FD8_1_105_c", "3A1578DF-0B19-42C2-95C2-24A6ACD0505B_1_105_c", "9CD6EBF4-6018-4C68-B892-83C049EBE4C4_1_201_a", "10ACA169-1927-4977-AB48-DAEBDC062F99_1_105_c", "75562693-6DBB-45ED-84CD-DB3EC87B52C7_1_105_c", "FAA75B00-4A02-40A6-B7ED-4C9AA3F46912_1_105_c", "80B88781-1C0E-47AA-B59B-13A5D4096813_1_105_c", "3AAE737B-6A36-4357-9259-397E0F0EC694_1_105_c", "EF8B56CC-FCCB-447E-B7A3-1D4EAE6DEE2D_1_105_c"].map(PHOTO);
const CONTACT_EMAIL = "myduyenwork123@gmail.com";

/* ---------- Khung ảnh ----------
   photo(slotId, fallback, caption): ưu tiên ảnh bạn đã đặt cho ô (SLOTS),
   sau đó tới fallback (đường dẫn ảnh, hoặc một bài viết để vẽ SVG), cuối cùng là ô trống có chú thích. */
function photo(id, fallback, caption = "") {
  const sl = SLOTS[id];
  if (sl) {
    const framed = sl.s || sl.x || sl.y;
    return `<div class="ph"><img src="${sl.f}" alt="${esc(caption)}" loading="lazy"${framed ? ` class="framed" data-s="${sl.s || 1}" data-x="${sl.x || 0}" data-y="${sl.y || 0}"` : ""}></div>`;
  }
  if (typeof fallback === "string" && fallback) return `<div class="ph"><img src="${fallback}" alt="${esc(caption)}" loading="lazy"></div>`;
  if (fallback && typeof fallback === "object") return `<div class="ph">${art(fallback)}</div>`;
  return `<div class="ph blank"><span>${esc(caption)}</span></div>`;
}
const box = (id, fallback, caption, cls = "") => `<div${cls ? ` class="${cls}"` : ""}>${photo(id, fallback, caption)}</div>`;

// Ảnh có dịch/phóng: tính lại kích thước theo tỉ lệ khung (giống cách bản thiết kế cắt ảnh)
const ro = new ResizeObserver(entries => entries.forEach(e => frame(e.target.querySelector("img.framed"))));
function frame(img) {
  if (!img || !img.naturalWidth) return;
  const b = img.parentElement, fw = b.clientWidth, fh = b.clientHeight;
  if (!fw || !fh) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const k = Math.max(fw / iw, fh / ih) * +img.dataset.s;
  const w = iw * k / fw * 100, h = ih * k / fh * 100;
  // Khung trên web có thể khác tỉ lệ so với lúc cắt trong thiết kế: giới hạn độ dịch để ảnh luôn phủ kín khung
  const clamp = (v, lim) => Math.max(-lim, Math.min(lim, v));
  img.style.width = w + "%";
  img.style.height = h + "%";
  img.style.left = (50 + clamp(+img.dataset.x, w / 2 - 50)) + "%";
  img.style.top = (50 + clamp(+img.dataset.y, h / 2 - 50)) + "%";
}
function hydrate(root) {
  root.querySelectorAll("img.framed").forEach(img => {
    if (img.dataset.hooked) return;
    img.dataset.hooked = "1";
    if (img.complete) frame(img); else img.addEventListener("load", () => frame(img), { once: true });
    ro.observe(img.parentElement);
  });
}
function fill(sel, html) { const el = $(sel); el.innerHTML = html; hydrate(el); }

/* ---------- Trạng thái ---------- */
const S = { view: "home", filter: "", slide: 0, rtCat: "", rtQuery: "", guideC: "", topic: "Hỏi về điểm đến" };
const ALL = [...POSTS, ...GUIDES];
const VIEWS = { home: "#v-home", about: "#v-about", guide: "#v-guide", rt: "#v-rt" };
const HASH = { about: "#gioi-thieu", guide: "#cam-nang", rt: "#trach-nhiem" };
const TITLES = {
  home: "Đi Rồi Kể – Blog du lịch Việt Nam, Malaysia, Singapore của Mely",
  about: "Về Mely | Đi Rồi Kể",
  guide: "Cẩm nang du lịch tự túc | Đi Rồi Kể",
  rt: "Du lịch có trách nhiệm | Đi Rồi Kể"
};
const SITE_DESC = $('meta[name="description"]').content;
function setMeta(title, desc) {
  document.title = title;
  $('meta[name="description"]').setAttribute("content", desc || SITE_DESC);
}

/* ---------- Dropdown điểm đến ---------- */
["vn", "my", "sg"].forEach(c => {
  $("#m-" + c).innerHTML = POSTS.filter(p => p.c === c).map(p => `<button type="button" data-id="${p.id}">${esc(p.menu || p.place)}</button>`).join("");
});
const ddb = $("#dd-btn"), ddm = $("#dd-menu");
function closeMenu() { ddm.hidden = true; ddb.setAttribute("aria-expanded", "false"); }
ddb.addEventListener("click", e => {
  e.stopPropagation();
  ddm.hidden = !ddm.hidden;
  ddb.setAttribute("aria-expanded", String(!ddm.hidden));
});
document.addEventListener("click", e => { if (!e.target.closest(".dd")) closeMenu(); });

/* ---------- Trang chủ: slider ---------- */
const feat = FEATURED.map(([id, ph]) => [POSTS.find(p => p.id === id), PHOTO(ph)]).filter(([p]) => p);
function drawSlide() {
  const [p, src] = feat[S.slide];
  fill("#slider", `
    <div class="bg">${photo("hero3-" + p.id, src, p.place)}</div>
    <div class="box">
      <div class="label accent">${label(p)}</div>
      <h2>${esc(p.title)}</h2>
      <button class="btn" data-id="${p.id}">Đọc tiếp</button>
    </div>
    <div class="ctrl">
      <button class="arrow" data-slide="-1" aria-label="Bài trước">‹</button>
      <div class="counter"><span>${pad2(S.slide + 1)}</span><span class="track"><i style="width:${(S.slide + 1) / feat.length * 100}%"></i></span><span class="of">${pad2(feat.length)}</span></div>
      <button class="arrow" data-slide="1" aria-label="Bài sau">›</button>
    </div>`);
}
function go(i) { S.slide = (i + feat.length) % feat.length; drawSlide(); }
$("#slider").addEventListener("click", e => { const b = e.target.closest("[data-slide]"); if (b) go(S.slide + +b.dataset.slide); });
let paused = false;
$("#slider").addEventListener("mouseenter", () => paused = true);
$("#slider").addEventListener("mouseleave", () => paused = false);
if (!reduceMotion) setInterval(() => { if (!paused && S.view === "home" && $("#reader").hidden) go(S.slide + 1); }, 6000);
drawSlide();

/* ---------- Trang chủ: danh mục ---------- */
const sgIndex = Math.max(0, POSTS.findIndex(p => p.c === "sg"));
const TILES = [["Việt Nam", "vn", POSTS[0]], ["Malaysia", "my", MALAYSIA_TILE], ["Singapore", "sg", POSTS[sgIndex]]];
const countOf = n => POSTS.filter(p => cname(p.c) === n || p.cat === n).length;
fill("#tiles", TILES.map(([n, key, fb]) => `
  <button class="tile zoom" type="button" data-filter="${n}">
    ${photo("tile-" + key, fb, n)}
    <span class="name">${n}<span class="count">${countOf(n)}</span></span>
  </button>`).join(""));
$("#catlist").innerHTML = TILES.map(([n]) => `<button type="button" data-filter="${n}"><span>${n}</span><span class="count">${countOf(n)}</span></button>`).join("");

/* ---------- Trang chủ: danh sách bài ---------- */
function matches(p, f) {
  const q = f.toLowerCase();
  return cname(p.c) === f || p.cat === f || (p.place + " " + p.title + " " + p.ex).toLowerCase().includes(q);
}
function renderList() {
  const f = S.filter;
  const items = POSTS.filter(p => !f || matches(p, f));
  $("#listTitle").textContent = f ? `Kết quả · ${items.length} bài` : "Bài viết mới nhất";
  $("#filterChip").innerHTML = f ? `<div class="chip-row"><button type="button" class="chip" id="clearFilter">Đang lọc: <b>${esc(f)}</b> <span class="x">×</span></button></div>` : "";
  if (!items.length) { fill("#list", `<p class="empty">Chưa có bài viết cho “${esc(f)}”. Thử tìm một điểm đến khác.</p>`); return; }
  const [first, ...rest] = items;
  fill("#list", `
    <article class="lead zoom">
      <a href="#bai/${first.id}" class="pic" data-id="${first.id}">${photo("list-" + first.id, first, first.place)}</a>
      <div class="label accent">${label(first)}</div>
      <h3><a href="#bai/${first.id}" data-id="${first.id}">${esc(first.title)}</a></h3>
      <p>${esc(first.ex)}</p>
      <button class="btn" data-id="${first.id}">Đọc tiếp</button>
    </article>` + rest.map(p => `
    <article class="post zoom">
      <a href="#bai/${p.id}" class="pic" data-id="${p.id}">${photo("list-" + p.id, p, p.place)}</a>
      <div>
        <div class="label accent">${label(p)}</div>
        <h3><a href="#bai/${p.id}" data-id="${p.id}">${esc(p.title)}</a></h3>
        <p>${esc(p.ex)}</p>
        <button class="more" data-id="${p.id}">Đọc tiếp →</button>
      </div>
    </article>`).join(""));
}
function pick(f) {
  S.filter = f;
  closeMenu();
  closePost(false);
  if (S.view !== "home") show("home");
  renderList();
  requestAnimationFrame(() => $("#posts").scrollIntoView({ behavior: smooth() }));
}
document.addEventListener("click", e => { if (e.target.closest("#clearFilter")) { S.filter = ""; $("#q").value = ""; renderList(); } });
$("#sform").addEventListener("submit", e => { e.preventDefault(); pick($("#q").value.trim()); });
renderList();

fill("#aboutPic", photo("about-avatar", POSTS[5], "Mely"));
fill("#popular", POSTS.slice(2, 5).map(p => `
  <button type="button" class="mini" data-id="${p.id}">
    <div class="pic">${photo("pop-" + p.id, p, p.place)}</div>
    <div><b>${esc(p.title)}</b><small>${cname(p.c)}</small></div>
  </button>`).join(""));
fill("#strip", STRIP_PHOTOS.map((src, i) => `<div>${photo("strip-mely-" + i, src)}</div>`).join(""));

/* ---------- Trang Giới thiệu ---------- */
fill("#abHero", photo("about-hero", null, "Ảnh chân dung của bạn"));
fill("#abHero2", photo("about-hero-2", null, "Ảnh trên đường đi"));
fill("#abStory", box("about-story-a", null, "Kỷ niệm ở Kuala Lumpur") + box("about-story-b", null, "Ảnh hành trình") + box("about-story-c", null, "Ảnh hành trình"));
$("#abStats").innerHTML = [[new Set(POSTS.map(p => p.c)).size, "Quốc gia"], [new Set(POSTS.map(p => p.place)).size, "Điểm đến"], [POSTS.length, "Bài viết"], [2, "Năm sống ở Malaysia"]]
  .map(([n, l]) => `<div><span class="n">${n}</span><span class="l">${l}</span></div>`).join("");
$("#abPlaces").innerHTML = POSTS.filter((p, i, a) => a.findIndex(q => q.place === p.place) === i)
  .map(p => `<button type="button" data-id="${p.id}">${esc(p.place)}</button>`).join("");

/* ---------- Trang Cẩm nang ---------- */
const GP = POSTS.filter(p => p.cat === "Cẩm nang");
fill("#gdBanner", photo("guide-banner", null, ""));
// Bản đồ: vị trí thật (vĩ độ, kinh độ) chiếu lên khung; hướng nhãn r/l/t
const GEO = { "ha-giang": [22.82, 104.98, "Hà Giang", "r"], "sa-pa": [22.34, 103.84, "Sa Pa", "l"], "ha-noi": [21.03, 105.85, "Hà Nội", "r"], "da-lat": [11.94, 108.44, "Đà Lạt", "l"], "nui-ba-den": [11.37, 106.17, "Núi Bà Đen", "t"], "ho-chi-minh": [10.78, 106.70, "Hồ Chí Minh", "l"], "vung-tau": [10.35, 107.08, "Vũng Tàu", "r"], "penang": [5.41, 100.33, "Penang", "r"], "ipoh": [4.60, 101.09, "Ipoh", "t"], "cameron": [4.47, 101.38, "Cameron Highlands", "r"], "pangkor": [4.21, 100.57, "Pangkor", "l"], "genting": [3.42, 101.79, "Genting", "t"], "colmar-tropicale": [3.30, 102.05, "Colmar Tropicale", "r"], "kuala-lumpur": [3.14, 101.69, "Kuala Lumpur", "l"], "malacca": [2.19, 102.25, "Malacca", "r"] };
const BOUNDS = { vn: [9.8, 23.6, 103.0, 109.6], my: [0.9, 5.9, 99.9, 104.4] };
(function drawMaps() {
  const pins = { vn: [], my: [] };
  let sgDone = false;
  POSTS.forEach(p => {
    let g = GEO[p.id];
    const panel = p.c === "vn" ? "vn" : "my";
    if (p.c === "sg") { if (sgDone) return; sgDone = true; g = [1.29, 103.85, "Singapore", "l"]; }
    if (!g || pins[panel].some(x => x.name === g[2])) return;
    const b = BOUNDS[panel];
    pins[panel].push({ id: p.id, name: g[2], dir: g[3], x: ((g[1] - b[2]) / (b[3] - b[2]) * 80 + 10).toFixed(1), y: ((b[1] - g[0]) / (b[1] - b[0]) * 76 + 14).toFixed(1) });
  });
  const panelHTML = (name, list, flex) => `
    <div class="map" style="flex:${flex}">
      <div class="cap"><b>${name}</b><span>${list.length} điểm đến</span></div>
      ${list.map(p => `<button type="button" class="pin ${p.dir}" style="left:${p.x}%;top:${p.y}%" data-id="${p.id}"><i></i><span>${esc(p.name)}</span></button>`).join("")}
    </div>`;
  $("#gdMaps").innerHTML = panelHTML("Việt Nam", pins.vn, "1 1 260px") + panelHTML("Malaysia · Singapore", pins.my, "1.4 1 320px");
})();
function renderGuidePage() {
  $("#gdTabs").innerHTML = [["", "Tất cả"], ["vn", "Việt Nam"], ["my", "Malaysia"], ["sg", "Singapore"]].map(([c, n]) =>
    `<button type="button" class="${S.guideC === c ? "on" : ""}" data-gc="${c}" aria-pressed="${S.guideC === c}">${n}<span class="n">${GP.filter(p => !c || p.c === c).length}</span></button>`).join("");
  fill("#gdGrid", GP.filter(p => !S.guideC || p.c === S.guideC).map((p, i) => `
    <button type="button" class="gcard" data-id="${p.id}">
      <div class="pic">${photo("guide-" + p.id, p, p.place)}
        <div class="foot"><span>${esc(p.place)}</span><em>${pad2(i + 1)}</em></div>
        <span class="badge">${cname(p.c)}</span>
      </div>
      <div class="body">
        <h3>${esc(p.title)}</h3>
        ${p.tip ? `<div class="tip"><b>Mẹo nhỏ</b><span>${esc(p.tip)}</span></div>` : ""}
        <span class="go">Đọc cẩm nang →</span>
      </div>
    </button>`).join(""));
}
$("#gdTabs").addEventListener("click", e => { const b = e.target.closest("[data-gc]"); if (b) { S.guideC = b.dataset.gc; renderGuidePage(); } });
renderGuidePage();

/* ---------- Trang Blogs ---------- */
fill("#rtArt", photo("rt-hero", { scene: "tea", colors: ["#E6ECDD", "#E9B663", "#79A061", "#2F5A35"] }, "Du lịch có trách nhiệm"));
function renderGuides() {
  const cats = ["Tất cả", ...new Set(GUIDES.map(g => g.cat))];
  $("#rtCats").innerHTML = cats.map(n => {
    const on = (n === "Tất cả" && !S.rtCat) || n === S.rtCat;
    return `<button type="button" class="pill${on ? " on" : ""}" data-rtcat="${n === "Tất cả" ? "" : n}" aria-pressed="${on}">${n}</button>`;
  }).join("");
  const q = S.rtQuery.toLowerCase();
  const items = GUIDES.filter(g => (!S.rtCat || g.cat === S.rtCat) && (!q || (g.title + g.ex + g.place + g.cat).toLowerCase().includes(q)));
  fill("#guides", items.map(g => `
    <article class="g zoom">
      <a href="#bai/${g.id}" class="pic" data-id="${g.id}">${photo("guide-" + g.id, g, g.place)}</a>
      <div class="txt">
        <div class="label accent">${esc(g.cat)} · ${esc(g.place)}</div>
        <h3><a href="#bai/${g.id}" data-id="${g.id}">${esc(g.title)}</a></h3>
        <p>${esc(g.ex)}</p>
        <button class="more" data-id="${g.id}">Đọc tiếp →</button>
      </div>
    </article>`).join(""));
  const none = $("#noGuides");
  none.hidden = items.length > 0;
  none.textContent = `Chưa có bài nào cho “${S.rtQuery || S.rtCat}”. Thử từ khoá khác nhé.`;
}
$("#rtCats").addEventListener("click", e => { const b = e.target.closest("[data-rtcat]"); if (b) { S.rtCat = b.dataset.rtcat; renderGuides(); } });
$("#rtform").addEventListener("submit", e => {
  e.preventDefault();
  S.rtQuery = $("#rtq").value.trim();
  S.rtCat = "";
  renderGuides();
  $("#guides").scrollIntoView({ behavior: smooth() });
});
renderGuides();

/* ---------- Liên hệ ---------- */
const TOPICS = ["Hỏi về điểm đến", "Hợp tác", "Góp ý", "Chỉ muốn làm quen"];
function renderTopics() {
  $("#ctTopics").innerHTML = TOPICS.map(t => `<button type="button" class="${S.topic === t ? "on" : ""}" data-topic="${t}" aria-pressed="${S.topic === t}">${t}</button>`).join("");
}
$("#ctTopics").addEventListener("click", e => { const b = e.target.closest("[data-topic]"); if (b) { S.topic = b.dataset.topic; renderTopics(); } });
renderTopics();
// Mở ứng dụng email của người đọc với nội dung đã điền sẵn
$("#ctForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#ctName").value.trim(), email = $("#ctEmail").value.trim(), msg = $("#ctMsg").value.trim();
  const subject = `[${S.topic}] ${name}`;
  const body = `${msg}\n\n— ${name} (${email})`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $("#ctNote").textContent = "Cảm ơn bạn! Ứng dụng email sẽ mở để gửi.";
});

/* ---------- Đọc bài: các kiểu câu chuyện ---------- */
const METRO_COLORS = ["#D6334A", "#2F6FB3", "#D98E04", "#2E9466"];
const LETTERS = "abcdefghijkl";
function storyHTML(post, st, i, arr) {
  const base = st.sid ? post.id + "-" + st.sid : post.id;
  const id = st.sid ? base : post.id + "-st-" + arr.slice(0, i).filter(x => !x.sid).length;
  const ph = st.ph || [];
  const cap = (n, d) => ph[n] || d;
  const slot = (s, c, cls) => box(id + "-" + s, null, c, cls);
  const num = pad2(i + 1);
  const flip = i % 2 ? " flip" : "";
  const notLast = i < arr.length - 1;
  const t = `<p class="st-t">${esc(st.t)}</p>`;
  const p1 = cap(0, st.layout === "mosaic" ? "Toàn cảnh " + st.h : "Ảnh chính: " + st.h);
  const s2 = cap(1, "Ảnh chi tiết"), s3 = cap(2, "Ảnh chi tiết");
  const dash = notLast ? `<div class="dash"><i></i><i></i><i></i></div>` : "";

  switch (st.layout) {
    case "essay":
      return `<section class="st-essay">
        <div class="side"><span class="num">${num}</span><span class="k">${esc(st.k)}</span><h3>${esc(st.h)}</h3><div class="where">${esc(st.where)}</div>
          ${ph.length ? slot("a", p1, "pic") : ""}</div>
        <div class="main-col">${st.quote ? `<blockquote>“${esc(st.quote)}”</blockquote>` : ""}${t}</div>
      </section>`;
    case "cloud":
      return `<section class="st-cloud bleed-x${flip}">
        <div class="hero"><div class="fill">${photo(id + "-a", null, p1)}</div><div class="shade"></div>
          <div class="glass"><div class="top"><b>${num}</b><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3><div class="where">${esc(st.where)}</div>${t}</div>
        </div>
        <div class="grid">${slot("b", s2)}${slot("c", s3)}${ph.slice(3).map((c, k) => box(base + "-" + "defgh"[k], null, c)).join("")}</div>
      </section>`;
    case "tide": {
      const bg = ["#E6F4F3", "#FBEBD8", "#E3EEF4", "#F6EFDF"][i % 4], acc = ["#1E7F86", "#D9774A", "#2D6C8C", "#B7863E"][i % 4];
      return `<section class="st-tide bleed-x${flip}" style="--tbg:${bg};--tacc:${acc}">
        <div class="wide">${photo(id + "-a", null, p1)}<div class="wave"></div></div>
        <div class="panel">
          <div class="txt"><div class="top"><b>${num}</b><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3><div class="where">${esc(st.where)}</div>${t}</div>
          <div class="side">${slot("b", s2)}${slot("c", s3)}</div>
        </div>
      </section>`;
    }
    case "postcard":
      return `<section class="st-postcard${flip}">
        <div class="card">
          <div class="left"><div class="polaroid">${slot("a", p1)}</div>${st.inner ? `<div class="inner-pic">${slot("e", st.inner)}</div>` : ""}</div>
          <div class="right">
            <div class="head">
              <div><span class="k">— ${esc(st.k)} —</span><h3>${esc(st.h)}</h3></div>
              <div class="stamp"><div class="perf"><div class="face"><b>${num}</b><small>${esc(post.stamp || (post.place.toUpperCase() + " · MY"))}</small></div></div><div class="pmark">MALAYSIA<br>· 1928 ·</div></div>
            </div>
            <div class="where">${esc(st.where)}</div>${t}
          </div>
        </div>
        <div class="taped"><figure>${slot("b", s2)}</figure><figure>${slot("c", s3)}</figure>${ph.length === 4 ? `<figure>${slot("d", cap(3, "Chân dung"))}</figure>` : ""}</div>
      </section>`;
    case "gallery": {
      const AR = ["3/4", "4/3", "1/1", "4/5", "3/2", "3/4", "1/1", "4/3", "3/4"];
      const items = ph.map((c, k) => ({ c, L: LETTERS[k], ar: AR[k % 9], src: (st.imgs || [])[k] || "" })).filter(g => !(st.hide || []).includes(g.L));
      return `<section class="st-gallery">
        <div class="head"><div><div class="green-num"><b>${num}</b><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3><div class="where">${esc(st.where)}</div></div>${t}</div>
        <div class="masonry">${items.map(g => `<div style="aspect-ratio:${g.ar}">${photo(base + "-" + g.L, g.src, g.c)}</div>`).join("")}</div>
        ${dash}
      </section>`;
    }
    case "terrace":
      return `<section class="st-terrace${flip}">
        <div class="row">${slot("a", p1, "pic")}
          <div class="card"><div class="green-num"><b>${num}</b><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3><div class="where">${esc(st.where)}</div>${t}</div>
        </div>
        <div class="pair">${slot("b", s2)}${slot("c", s3)}</div>
        ${dash}
      </section>`;
    case "story":
      return `<section class="st-story">
        <div class="head"><div class="meta-line"><span>${esc(st.k)}</span><i></i><span>${esc(st.time || st.where || "")}</span></div><h3>${esc(st.h)}</h3></div>
        ${slot("a", p1, "wide")}
        ${t}
        <div class="row">${ph.slice(1).map((c, j) => `<figure>${box(base + "-" + "bcd"[j], null, c)}<figcaption>${esc(c)}</figcaption></figure>`).join("")}</div>
        ${notLast ? `<div class="dots"><i></i><i></i></div>` : ""}
      </section>`;
    case "night":
      return `<section class="st-night bleed-x">
        <div class="wide">${photo(id + "-a", null, p1)}<div class="shade"></div>
          <div class="cap"><div class="top"><b>${num}</b><i></i><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3></div></div>
        <div class="body"><div class="where">${esc(st.where)}</div>${t}<div class="pair">${slot("b", s2)}${slot("c", s3)}</div></div>
      </section>`;
    case "chapter": {
      const odd = i % 2;
      const vars = odd ? "--chbg:#F6EDE4;--chink:#1F1D1C;--chsub:#6F6A66;--chacc:#B5552F;--chrule:#E2D6CA" : "--chbg:#22394A;--chink:#F5F3F1;--chsub:#C9D3D9;--chacc:#F2B57A;--chrule:#3A5265";
      const four = ph.length === 4;
      return `<section class="st-chapter bleed-x${flip}" style="${vars}">
        <div class="head"><span class="big">${num}</span><div><div class="k">${esc(st.k)}</div><h3>${esc(st.h)}</h3></div><div class="where">${esc(st.where)}</div></div>
        <div class="body">${t}<div class="imgs${four ? " four" : ""}">${slot("a", p1)}${slot("b", s2)}${slot("c", s3)}${four ? slot("d", cap(3, "Chân dung")) : ""}</div></div>
        ${ph.length > 4 ? `<div class="strip4">${ph.slice(3).map((c, j) => box(base + "-" + "defg"[j], null, c)).join("")}</div>` : ""}
      </section>`;
    }
    case "metro": {
      const mc = METRO_COLORS[i % 4];
      const last = i === arr.length - 1;
      const line = last ? `linear-gradient(${mc} 40%, transparent)` : `linear-gradient(${mc} 60%, ${METRO_COLORS[(i + 1) % 4]})`;
      return `<section class="st-metro" style="--mc:${mc};--mline:${line};--mbottom:${last ? "0px" : "-48px"}">
        <div class="rail"><div class="dot">${num}</div></div>
        <div class="content">
          <div class="st-head"><div class="tags"><span class="ga">Ga ${esc(st.station || "")}</span><span>${esc(st.k)}</span></div><h3>${esc(st.h)}</h3><div class="st-where" style="border:0;padding:0">${esc(st.where)}</div></div>
          <div class="imgs">${slot("a", p1)}${slot("b", s2)}${slot("c", s3)}</div>
          ${t}
          ${ph.length > 4 ? `<div class="hstrip">${ph.slice(3).map((c, j) => `<figure>${box(base + "-" + "defg"[j], null, c)}<figcaption>${esc(c)}</figcaption></figure>`).join("")}</div>` : ""}
        </div>
      </section>`;
    }
    case "mosaic": {
      const caps = [p1, cap(1, "Mặt hồ xanh ngọc"), cap(2, "Chi tiết"), cap(3, "Chân dung"), cap(4, "Đồi thông"), cap(5, "Góc check-in"), cap(6, "Panorama đồi và hồ")];
      return `<section class="st-mosaic bleed-x">
        <div class="top"><div><div class="label st-k">${num} · ${esc(st.k)}</div><h3>${esc(st.h)}</h3><div class="st-where">${esc(st.where)}</div></div>${t}</div>
        <div class="imgs">${caps.map((c, n) => slot(LETTERS[n], c)).join("")}</div>
      </section>`;
    }
  }
  if (st.layout && st.layout !== "single") return ""; // kiểu chưa hỗ trợ
  const head = `<div class="st-head"><div class="label st-k">${num} · ${esc(st.k)}</div><h3>${esc(st.h)}</h3><div class="st-where">${esc(st.where)}</div>${t}</div>`;
  if (!st.layout && (st.k === "Cà phê" || st.full)) {
    const caps = [p1, cap(1, "Không gian"), cap(2, "Đồ uống"), cap(3, "Góc chụp ảnh"), cap(4, "Chi tiết"), cap(5, "View")];
    return `<section class="st-full">${head}<div class="imgs">${caps.map((c, n) => slot(LETTERS[n], c)).join("")}</div></section>`;
  }
  const multi = st.layout !== "single";
  return `<section class="st-split${flip}">
    <div class="imgs">${slot("a", p1)}${multi ? slot("b", s2) + slot("c", s3) : ""}</div>
    ${head}
  </section>`;
}

let lastFocus = null;
function openPost(id, push = true) {
  const p = ALL.find(x => x.id === id);
  if (!p) return;
  const isGuide = GUIDES.includes(p);
  const stories = p.stories || [];
  const hasChapter = stories.some(s => s.layout === "chapter");
  const related = (isGuide ? GUIDES : POSTS).filter(x => x.id !== p.id).slice(0, 3);
  const sections = (p.body || []).map(([h, tx]) => `<div class="sec">${h ? `<h2>${esc(h)}</h2>` : ""}<p>${esc(tx)}</p>${tx.startsWith("Bukit Bintang tiện")
    ? `<div class="gallery">${[1, 2, 3, 4, 5, 6].map(n => box("kl-khu-" + n, null, "Ảnh " + n)).join("")}</div>` : ""}</div>`).join("");
  const route = stories.some(s => s.layout === "metro") ? `<div class="route">
      <div class="top"><span>Tuyến hành trình · ${esc(p.place)}</span><span>${stories.length} ga</span></div>
      <div class="stops">${stories.map((s, i) => `<div class="stop" style="--c:${METRO_COLORS[i % 4]}"><div class="rail"></div><div class="nm"><b>${pad2(i + 1)}</b><span>${esc(s.station || s.h)}</span></div></div>`).join("")}</div>
    </div>` : "";
  const storyBlock = stories.length ? `<div class="stories">${stories.map((st, i, arr) => storyHTML(p, st, i, arr)).join("")}</div>` : "";
  const closing = p.closing ? `<section class="closing">
      <div class="wide${hasChapter ? " bleed-x" : ""}">${photo(p.id + "-closing", null, "Ảnh khép lại hành trình")}</div>
      <div class="txt"><div class="rule"></div><p>${esc(p.closing)}</p><div class="label accent">Mely</div></div>
    </section>` : "";
  fill("#article", `
    <span class="label accent">${label(p)}</span>
    <h1>${esc(p.title)}</h1>
    <div class="meta">${esc(p.place)}</div>
    <div class="cover${hasChapter ? " bleed" : ""}">${photo("cover-" + p.id, p, p.place)}</div>
    <p class="lede">${esc(p.ex)}</p>
    ${sections}${route}${storyBlock}${closing}
    <div class="tip"><span class="label accent">Mẹo nhỏ</span><span>${esc(p.tip)}</span></div>
    ${related.length ? `<div class="related"><div class="sec-title"><span class="label">Đọc tiếp</span></div><div class="grid">${related.map(r => `
      <button type="button" class="card zoom" data-id="${r.id}"><div class="pic">${photo("rel-" + r.id, r, r.place)}</div><b>${esc(r.title)}</b></button>`).join("")}</div></div>` : ""}`);
  if ($("#reader").hidden) lastFocus = document.activeElement;
  $("#reader").hidden = false;
  $("#reader").scrollTop = 0;
  $("#progress").style.width = "0";
  document.body.style.overflow = "hidden";
  setMeta(p.title + " | Đi Rồi Kể", p.ex);
  closeMenu();
  $("#back").focus({ preventScroll: true });
  if (push) history.pushState(null, "", "#bai/" + id);
}
function closePost(push = true) {
  if ($("#reader").hidden) return;
  $("#reader").hidden = true;
  document.body.style.overflow = "";
  setMeta(TITLES[S.view]);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
  if (push) history.pushState(null, "", HASH[S.view] || location.pathname);
}
$("#reader").addEventListener("scroll", () => {
  const r = $("#reader"), max = r.scrollHeight - r.clientHeight;
  $("#progress").style.width = (max > 0 ? r.scrollTop / max * 100 : 0) + "%";
});
$("#back").onclick = () => closePost();
document.addEventListener("keydown", e => { if (e.key === "Escape") { closePost(); closeMenu(); } });

/* ---------- Chuyển trang ---------- */
function show(view, push = true) {
  S.view = view;
  Object.entries(VIEWS).forEach(([v, sel]) => { $(sel).hidden = v !== view; });
  document.querySelectorAll("[data-nav]").forEach(b => b.classList.toggle("on", b.dataset.nav === view));
  closePost(false);
  closeMenu();
  setMeta(TITLES[view]);
  scrollTo(0, 0);
  if (push) history.pushState(null, "", HASH[view] || location.pathname);
}

document.addEventListener("click", e => {
  const idEl = e.target.closest("[data-id]");
  if (idEl) { e.preventDefault(); openPost(idEl.dataset.id); return; }
  const f = e.target.closest("[data-filter]");
  if (f) { e.preventDefault(); pick(f.dataset.filter); return; }
  const v = e.target.closest("[data-view]");
  if (v) {
    e.preventDefault();
    if (v.dataset.view === "home") { S.filter = ""; $("#q").value = ""; renderList(); }
    show(v.dataset.view);
    return;
  }
  // Liên kết tới #contact khi đang mở bài: đóng bài rồi cuộn tới
  const a = e.target.closest('a[href="#contact"]');
  if (a) { e.preventDefault(); closePost(false); $("#contact").scrollIntoView({ behavior: smooth() }); }
});

// Đồng bộ với URL (nút Back của trình duyệt, chia sẻ link bài viết)
const VIEW_OF_HASH = Object.fromEntries(Object.entries(HASH).map(([v, h]) => [h, v]));
function route() {
  const h = location.hash;
  if (h.startsWith("#bai/")) {
    const id = h.slice(5);
    if (GUIDES.some(g => g.id === id) && S.view !== "rt") show("rt", false);
    openPost(id, false);
  } else if (VIEW_OF_HASH[h]) {
    if (S.view !== VIEW_OF_HASH[h]) show(VIEW_OF_HASH[h], false);
    else closePost(false);
  } else if (h === "#contact" || h === "#about") {
    closePost(false);
  } else {
    closePost(false);
    if (S.view !== "home") show("home", false);
  }
}
window.addEventListener("popstate", route);
route();
