const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const smooth = () => (reduceMotion ? "auto" : "smooth");
const cname = c => c === "vn" ? "Việt Nam" : c === "my" ? "Malaysia" : c === "sg" ? "Singapore" : "Việt Nam, Malaysia & Singapore";
const label = p => cname(p.c) + " · " + p.cat;

// Ảnh chụp ở trang chủ (đặt trong images/photos)
const PHOTO = n => "images/photos/" + n + ".jpeg";
const SLIDE_PHOTOS = ["A41A68C0-A014-4B50-B12C-506B04EA1524_1_105_c", "1E8F7D6A-549C-4A02-9912-45BC0CE96CDE_1_105_c", "A067B649-3042-48E8-A7AD-9A668DA76998_1_105_c"].map(PHOTO);
const MALAYSIA_TILE = "images/photos/pasted-1792243942155-0.png";
const STRIP_PHOTOS = ["6D1F9B59-0AD3-43AB-B245-A229C11C33AA_1_105_c", "A067B649-3042-48E8-A7AD-9A668DA76998_1_105_c-002fb546", "8B1CE620-6431-4E2E-9399-B0C5EDA92DCD_1_105_c", "FCA17A9D-DD65-48F0-8167-DC07FC0B9F01_1_105_c", "32091226-1888-48E1-8BF9-DA86011DF290_1_105_c", "BCF7BA10-B0D9-4D22-A5F4-C5D8A126D495_1_105_c", "5EE5FC5F-A0FD-4237-9FA5-6BFDCB00DA98_1_105_c", "21B9F094-81D5-4D28-87D5-3665D1FEB35E_1_105_c", "8432327C-3B6D-4BA8-9C8F-EC82D3CC9702", "3471A5A6-AE71-4ED3-B93C-8F105CE7B1C4", "28FD83F8-B7B5-478B-9160-5170CCEEAD3A_1_105_c", "80F2269F-6AAC-4945-A41B-8F2C00052C1E_1_105_c", "F379357A-F423-41B1-9B28-E09C61FB0D08_1_105_c", "AB17D104-6F8A-48C9-95F1-6965AD6DF168_1_105_c", "511B17B4-0756-4F3A-9340-15FC74B43123_1_105_c", "5283F05A-5FCE-4BCB-AD01-2C5711CC027A_1_105_c", "40BCF89B-942A-49C7-B2EF-276DF1690F88_1_105_c", "D02A40C3-1B7B-4642-AC08-9EE0D4EE041B_1_105_c", "F5C94FD4-AC07-488A-BDBF-29F23B556162_1_105_c", "907D565A-D8B3-4B6D-A6BD-807E5F265D97_1_105_c", "746A1B30-ECFA-41F7-888C-A47B6A78E484_1_105_c", "7668CC11-DB91-4C70-8E66-B9680F459725_1_105_c", "87D13118-848A-412B-A8D0-3694D86ED75A_1_105_c", "FAE40637-FF2C-44B3-808E-BF7E95251F3C_1_105_c", "056F6A4C-2F99-4676-B1B1-2F4667DCC5C9_1_105_c", "6F1F1C30-3503-4C98-B35E-8FAE266B6D05_1_105_c", "1C7CEB60-9107-40D6-A6E5-FB97B348E198_1_105_c", "F0D44427-DB1B-4E5D-8928-5D0D55F04472_1_105_c", "B0445AAE-99FA-4D04-82DA-02A1F5C95AC0_1_105_c", "B1A3EA82-7F47-4935-86D2-BD9501B032E5_1_105_c", "EF167360-2A27-4A1F-A0C6-7BB3291A6FD8_1_105_c", "3A1578DF-0B19-42C2-95C2-24A6ACD0505B_1_105_c", "9CD6EBF4-6018-4C68-B892-83C049EBE4C4_1_201_a", "10ACA169-1927-4977-AB48-DAEBDC062F99_1_105_c", "75562693-6DBB-45ED-84CD-DB3EC87B52C7_1_105_c", "FAA75B00-4A02-40A6-B7ED-4C9AA3F46912_1_105_c", "80B88781-1C0E-47AA-B59B-13A5D4096813_1_105_c", "3AAE737B-6A36-4357-9259-397E0F0EC694_1_105_c", "EF8B56CC-FCCB-447E-B7A3-1D4EAE6DEE2D_1_105_c"].map(PHOTO);

/* ---------- Khung ảnh ----------
   photo(slotId, fallback, caption): ưu tiên ảnh bạn đã đặt cho ô (SLOTS),
   sau đó tới fallback (đường dẫn ảnh, hoặc một bài viết để vẽ SVG), cuối cùng là ô trống có chú thích. */
function photo(id, fallback, caption = "") {
  const sl = SLOTS[id];
  if (sl) {
    const framed = sl.s || sl.x || sl.y;
    return `<div class="ph"><img src="${sl.f}" alt="${esc(caption)}" loading="lazy"${framed ? ` class="framed" data-s="${sl.s || 1}" data-x="${sl.x || 0}" data-y="${sl.y || 0}"` : ""}></div>`;
  }
  if (typeof fallback === "string") return `<div class="ph"><img src="${fallback}" alt="${esc(caption)}" loading="lazy"></div>`;
  if (fallback) return `<div class="ph">${art(fallback)}</div>`;
  return `<div class="ph blank"><span>${esc(caption)}</span></div>`;
}

// Ảnh có dịch/phóng: tính lại kích thước theo tỉ lệ khung (giống cách bản thiết kế cắt ảnh)
const ro = new ResizeObserver(entries => entries.forEach(e => frame(e.target.querySelector("img.framed"))));
function frame(img) {
  if (!img || !img.naturalWidth) return;
  const box = img.parentElement, fw = box.clientWidth, fh = box.clientHeight;
  if (!fw || !fh) return;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const k = Math.max(fw / iw, fh / ih) * +img.dataset.s;
  img.style.width = (iw * k / fw * 100) + "%";
  img.style.height = (ih * k / fh * 100) + "%";
  img.style.left = (50 + +img.dataset.x) + "%";
  img.style.top = (50 + +img.dataset.y) + "%";
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
const S = { view: "home", filter: "", slide: 0, rtCat: "", rtQuery: "" };
const ALL = [...POSTS, ...GUIDES];

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

/* ---------- Slider ---------- */
const feat = POSTS.slice(0, 3);
function drawSlide() {
  const p = feat[S.slide];
  fill("#slider", `
    <div class="bg">${photo("hero2-" + p.id, SLIDE_PHOTOS[S.slide], p.place)}</div>
    <div class="box">
      <div class="label accent">${label(p)}</div>
      <h2>${esc(p.title)}</h2>
      <button class="btn" data-id="${p.id}">Đọc tiếp</button>
    </div>
    <div class="ctrl">
      <button class="arrow" data-slide="-1" aria-label="Bài trước">‹</button>
      <div class="counter"><span>0${S.slide + 1}</span><span class="track"><i style="width:${(S.slide + 1) / feat.length * 100}%"></i></span><span class="of">0${feat.length}</span></div>
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

/* ---------- Danh mục ---------- */
const TILES = [["Việt Nam", "vn", 0], ["Malaysia", "my", 3], ["Singapore", "sg", Math.max(0, POSTS.findIndex(p => p.c === "sg"))], ["Cẩm nang", "guide", 1]];
const countOf = n => POSTS.filter(p => cname(p.c) === n || p.cat === n).length;
fill("#tiles", TILES.map(([n, key, i]) => `
  <button class="tile zoom" type="button" data-filter="${n}">
    ${photo("tile-" + key, n === "Malaysia" ? MALAYSIA_TILE : POSTS[i], n)}
    <span class="name">${n}<span class="count">${countOf(n)}</span></span>
  </button>`).join(""));
$("#catlist").innerHTML = TILES.map(([n]) => `<button type="button" data-filter="${n}"><span>${n}</span><span class="count">${countOf(n)}</span></button>`).join("");

/* ---------- Danh sách bài ---------- */
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
      <a href="#" class="pic" data-id="${first.id}">${photo("list-" + first.id, first, first.place)}</a>
      <div class="label accent">${label(first)}</div>
      <h3><a href="#" data-id="${first.id}">${esc(first.title)}</a></h3>
      <p>${esc(first.ex)}</p>
      <button class="btn" data-id="${first.id}">Đọc tiếp</button>
    </article>` + rest.map(p => `
    <article class="post zoom">
      <a href="#" class="pic" data-id="${p.id}">${photo("list-" + p.id, p, p.place)}</a>
      <div>
        <div class="label accent">${label(p)}</div>
        <h3><a href="#" data-id="${p.id}">${esc(p.title)}</a></h3>
        <p>${esc(p.ex)}</p>
        <button class="more" data-id="${p.id}">Đọc tiếp →</button>
      </div>
    </article>`).join(""));
}
function pick(f) {
  S.filter = f;
  closeMenu();
  closePost();
  if (S.view !== "home") show("home");
  renderList();
  requestAnimationFrame(() => $("#posts").scrollIntoView({ behavior: smooth() }));
}
document.addEventListener("click", e => { if (e.target.closest("#clearFilter")) { S.filter = ""; $("#q").value = ""; renderList(); } });
$("#sform").addEventListener("submit", e => { e.preventDefault(); pick($("#q").value.trim()); });
renderList();

/* ---------- Sidebar, dải ảnh ---------- */
fill("#aboutPic", photo("about-avatar", POSTS[5], "Mely"));
fill("#popular", POSTS.slice(2, 5).map(p => `
  <button type="button" class="mini" data-id="${p.id}">
    <div class="pic">${photo("pop-" + p.id, p, p.place)}</div>
    <div><b>${esc(p.title)}</b><small>${cname(p.c)}</small></div>
  </button>`).join(""));
fill("#strip", STRIP_PHOTOS.map((src, i) => `<div>${photo("strip-mely-" + i, src)}</div>`).join(""));

/* ---------- Bản tin ---------- */
$("#nform").addEventListener("submit", e => {
  e.preventDefault();
  // TODO: nối với dịch vụ email (Mailchimp, Buttondown, Google Form…) khi đưa lên mạng.
  $("#nform").hidden = true;
  $("#ok").hidden = false;
});

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
      <a href="#" class="pic" data-id="${g.id}">${photo("guide-" + g.id, g, g.place)}</a>
      <div class="txt">
        <div class="label accent">${esc(g.cat)} · ${esc(g.place)}</div>
        <h3><a href="#" data-id="${g.id}">${esc(g.title)}</a></h3>
        <p>${esc(g.ex)}</p>
        <button class="more" data-id="${g.id}">Đọc tiếp →</button>
      </div>
    </article>`).join(""));
  const none = $("#noGuides");
  none.hidden = items.length > 0;
  none.textContent = `Chưa có bài nào cho “${S.rtQuery || S.rtCat}”. Thử từ khoá khác nhé.`;
}
$("#rtCats").addEventListener("click", e => {
  const b = e.target.closest("[data-rtcat]");
  if (b) { S.rtCat = b.dataset.rtcat; renderGuides(); }
});
$("#rtform").addEventListener("submit", e => {
  e.preventDefault();
  S.rtQuery = $("#rtq").value.trim();
  S.rtCat = "";
  renderGuides();
  $("#guides").scrollIntoView({ behavior: smooth() });
});
renderGuides();

/* ---------- Đọc bài ---------- */
// Bố cục mỗi câu chuyện: mosaic (7 ảnh), full (6 ảnh), split (1 hoặc 3 ảnh, xen kẽ trái/phải)
function storyHTML(post, st, i, arr) {
  const id = st.sid ? post.id + "-" + st.sid : post.id + "-st-" + arr.slice(0, i).filter(x => !x.sid).length;
  const ph = st.ph || [];
  const cap = (n, d) => ph[n] || d;
  const slot = (s, c) => `<div>${photo(id + "-" + s, null, c)}</div>`;
  const num = String(i + 1).padStart(2, "0");
  const kicker = `<div class="label st-k">${num} · ${esc(st.k)}</div>`;
  const where = `<div class="st-where">${esc(st.where)}</div>`;
  const text = `<p class="st-t">${esc(st.t)}</p>`;

  if (st.layout === "mosaic") {
    const caps = [cap(0, "Toàn cảnh " + st.h), cap(1, "Mặt hồ xanh ngọc"), cap(2, "Chi tiết"), cap(3, "Chân dung"), cap(4, "Đồi thông"), cap(5, "Góc check-in"), cap(6, "Panorama đồi và hồ")];
    return `<section class="st-mosaic">
      <div class="top"><div>${kicker}<h3>${esc(st.h)}</h3>${where}</div>${text}</div>
      <div class="imgs">${caps.map((c, n) => slot("abcdefg"[n], c)).join("")}</div>
    </section>`;
  }
  if (st.k === "Cà phê" || st.full) {
    const caps = [cap(0, "Ảnh chính: " + st.h), cap(1, "Không gian"), cap(2, "Đồ uống"), cap(3, "Góc chụp ảnh"), cap(4, "Chi tiết"), cap(5, "View")];
    return `<section class="st-full">
      <div class="st-head">${kicker}<h3>${esc(st.h)}</h3>${where}${text}</div>
      <div class="imgs">${caps.map((c, n) => slot("abcdef"[n], c)).join("")}</div>
    </section>`;
  }
  const multi = st.layout !== "single";
  return `<section class="st-split${i % 2 ? " flip" : ""}">
    <div class="imgs">${slot("a", cap(0, "Ảnh chính: " + st.h))}${multi ? slot("b", cap(1, "Ảnh chi tiết")) + slot("c", cap(2, "Ảnh chi tiết")) : ""}</div>
    <div class="st-head">${kicker}<h3>${esc(st.h)}</h3>${where}${text}</div>
  </section>`;
}

let lastFocus = null;
function openPost(id, push = true) {
  const p = ALL.find(x => x.id === id);
  if (!p) return;
  const isGuide = GUIDES.includes(p);
  const related = (isGuide ? GUIDES : POSTS).filter(x => x.id !== p.id).slice(0, 3);
  const sections = (p.body || []).map(([h, t]) => `<div class="sec">${h ? `<h2>${esc(h)}</h2>` : ""}<p>${esc(t)}</p>${t.startsWith("Bukit Bintang tiện")
    ? `<div class="gallery">${[1, 2, 3, 4, 5, 6].map(n => `<div>${photo("kl-khu-" + n, null, "Ảnh " + n)}</div>`).join("")}</div>` : ""}</div>`).join("");
  const stories = p.stories && p.stories.length ? `<div class="stories">${p.stories.map((st, i, arr) => storyHTML(p, st, i, arr)).join("")}</div>` : "";
  const closing = p.closing ? `<section class="closing">
      <div class="wide">${photo(p.id + "-closing", null, "Ảnh khép lại hành trình")}</div>
      <div class="txt"><div class="rule"></div><p>${esc(p.closing)}</p><div class="label accent">Mely</div></div>
    </section>` : "";
  fill("#article", `
    <span class="label accent">${label(p)}</span>
    <h1>${esc(p.title)}</h1>
    <div class="meta">${esc(p.place)}</div>
    <div class="cover">${photo("cover-" + p.id, p, p.place)}</div>
    <p class="lede">${esc(p.ex)}</p>
    ${sections}${stories}${closing}
    <div class="tip"><span class="label accent">Mẹo nhỏ</span><span>${esc(p.tip)}</span></div>
    ${related.length ? `<div class="related"><div class="sec-title"><span class="label">Đọc tiếp</span></div><div class="grid">${related.map(r => `
      <button type="button" class="card zoom" data-id="${r.id}"><div class="pic">${photo("rel-" + r.id, r, r.place)}</div><b>${esc(r.title)}</b></button>`).join("")}</div></div>` : ""}`);
  if ($("#reader").hidden) lastFocus = document.activeElement;
  $("#reader").hidden = false;
  $("#reader").scrollTop = 0;
  $("#progress").style.width = "0";
  document.body.style.overflow = "hidden";
  document.title = p.title + " · Đi Rồi Kể";
  closeMenu();
  $("#back").focus({ preventScroll: true });
  if (push) history.pushState(null, "", "#bai/" + id);
}
function closePost(push = true) {
  if ($("#reader").hidden) return;
  $("#reader").hidden = true;
  document.body.style.overflow = "";
  document.title = "Đi Rồi Kể";
  if (lastFocus) lastFocus.focus({ preventScroll: true });
  if (push) history.pushState(null, "", S.view === "rt" ? "#trach-nhiem" : location.pathname);
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
  $("#top").hidden = view !== "home";
  $("#rt").hidden = view !== "rt";
  $("#rt-link").classList.toggle("on", view === "rt");
  closePost(false);
  closeMenu();
  scrollTo(0, 0);
  if (push) history.pushState(null, "", view === "rt" ? "#trach-nhiem" : location.pathname);
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
  // Liên kết neo (#about, #news…) khi đang ở trang Blogs → về trang chủ rồi cuộn tới
  const a = e.target.closest('.topbar a[href^="#"]');
  if (a && S.view !== "home") {
    e.preventDefault();
    show("home");
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView();
  }
});

// Đồng bộ với URL (nút Back của trình duyệt, chia sẻ link bài viết)
function route() {
  const h = location.hash;
  if (h.startsWith("#bai/")) {
    const id = h.slice(5);
    const wantRT = GUIDES.some(g => g.id === id);
    if (wantRT !== (S.view === "rt")) show(wantRT ? "rt" : "home", false);
    openPost(id, false);
  } else if (h === "#trach-nhiem") {
    show("rt", false);
  } else {
    closePost(false);
    if (S.view !== "home") show("home", false);
  }
}
window.addEventListener("popstate", route);
route();
