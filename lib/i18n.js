// Đa ngôn ngữ: tiếng Việt là mặc định (đường dẫn giữ nguyên), English nằm dưới /en/.
// Thêm ngôn ngữ mới: thêm mã vào LOCALES, thêm một khối trong `dict`, một file data/<mã>/posts.js,
// một cặp layout trong app/(<mã>)/ và các file page tương ứng (xem app/(en)/en).

export const LOCALES = ["vi", "en"];
export const DEFAULT_LOCALE = "vi";
export const LANG_NAMES = { vi: "Tiếng Việt", en: "English" };
export const OG_LOCALE = { vi: "vi_VN", en: "en_US" };

export const isLocale = l => LOCALES.includes(l);
/** Đường dẫn trong site theo ngôn ngữ: pathFor("en", "/cam-nang/") → "/en/cam-nang/" */
export const pathFor = (lang, path = "/") => (lang === DEFAULT_LOCALE ? path : "/" + lang + (path === "/" ? "/" : path));
/** Bỏ tiền tố ngôn ngữ khỏi một đường dẫn: "/en/cam-nang/" → "/cam-nang/" */
export const stripLang = pathname => {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === "/" + l) return "/";
    if (pathname.startsWith("/" + l + "/")) return pathname.slice(l.length + 1);
  }
  return pathname;
};

// Đường dẫn từng trang theo ngôn ngữ (tên thư mục trong app/ phải khớp)
export const ROUTES = {
  home: { vi: "/", en: "/" },
  about: { vi: "/gioi-thieu/", en: "/about/" },
  guide: { vi: "/cam-nang/", en: "/guides/" },
  blogs: { vi: "/blogs/", en: "/blogs/" },
  post: { vi: "/bai/", en: "/posts/" }, // + <id>/
};
/** route("en", "post", "ha-giang") → "/en/posts/ha-giang/" */
export const route = (lang, key, id) => pathFor(lang, ROUTES[key][lang] + (id ? id + "/" : ""));
/** Địa chỉ của trang hiện tại ở ngôn ngữ khác, giữ đúng trang (và đúng bài viết). */
export function switchLang(pathname, toLang) {
  const rest = stripLang(pathname);
  const from = pathname === rest ? DEFAULT_LOCALE : LOCALES.find(l => l !== DEFAULT_LOCALE && pathname.startsWith("/" + l));
  for (const key of Object.keys(ROUTES)) {
    const base = ROUTES[key][from];
    if (key === "post") {
      if (rest.startsWith(base) && rest.length > base.length) return route(toLang, "post", rest.slice(base.length).replace(/\/$/, ""));
    } else if (rest === base) return route(toLang, key);
  }
  return route(toLang, "home");
}

const vi = {
  siteTitle: "Đi Rồi Kể – Blog du lịch Việt Nam, Malaysia, Singapore của Mely",
  siteDesc: "Blog du lịch tự túc của Mely: kinh nghiệm, lịch trình, món ngon và những câu chuyện trải nghiệm ở Việt Nam, Malaysia và Singapore.",
  ogTitle: "Đi Rồi Kể – Blog du lịch của Mely",
  ogDesc: "Kinh nghiệm du lịch tự túc và những câu chuyện trên đường đi ở Việt Nam, Malaysia, Singapore.",
  brandTagline: "Những nơi đã đi qua, những món đã thưởng thức và những ngày muốn nhớ",
  topbar: { left: "Blog & trải nghiệm", about: "Giới thiệu", contact: "Liên hệ", language: "Ngôn ngữ" },
  nav: { label: "Menu chính", home: "Trang chủ", destinations: "Điểm đến", guide: "Cẩm nang", blogs: "Blogs" },
  countries: { vn: "Việt Nam", my: "Malaysia", sg: "Singapore", all: "Việt Nam, Malaysia & Singapore", mySg: "Malaysia · Singapore" },
  cats: { "Cẩm nang": "Cẩm nang", "Ăn gì": "Ăn gì", "Biển": "Biển", "Sống xanh": "Sống xanh", "Trekking": "Trekking", "Động vật": "Động vật", "Văn hoá": "Văn hoá", "Di chuyển": "Di chuyển" },
  all: "Tất cả",
  home: {
    featured: "Bài nổi bật", prev: "Bài trước", next: "Bài sau",
    latest: "Bài viết mới nhất", results: n => `Kết quả · ${n} bài`, filtering: "Đang lọc:",
    none: f => `Chưa có bài viết cho “${f}”. Thử tìm một điểm đến khác.`,
    readMore: "Đọc tiếp", readMoreArrow: "Đọc tiếp →",
    hello: "Xin chào",
    aboutText: "Mình là Mely, một người yêu thích du lịch, khám phá những vùng đất mới và lưu giữ những khoảnh khắc qua ống kính. Đây là góc nhỏ để mình chia sẻ những câu chuyện, trải nghiệm, món ngon và những địa điểm thú vị trên hành trình của mình. Hy vọng những điều mình viết sẽ mang đến cho bạn một chút cảm hứng để xách ba lô lên và khám phá thế giới theo cách riêng của mình.",
    search: "Tìm kiếm", searchPlaceholder: "Tìm điểm đến…", searchGo: "Tìm",
    categories: "Danh mục", popular: "Đọc nhiều",
  },
  footer: {
    kicker: "Liên hệ", title1: "Cùng trò chuyện", title2: "về những chuyến đi",
    text: "Bạn có câu hỏi về một điểm đến, muốn hợp tác hay chỉ đơn giản là muốn kể cho mình nghe về chuyến đi của bạn? Mình luôn sẵn lòng lắng nghe và thường trả lời trong vòng 2–3 ngày.",
    emailLabel: "Email", aboutTopic: "Bạn muốn nói về",
    topics: ["Hỏi về điểm đến", "Hợp tác", "Góp ý", "Chỉ muốn làm quen"],
    name: "Tên của bạn", email: "Email", message: "Viết lời nhắn cho mình…", messageLabel: "Lời nhắn",
    send: "Gửi lời nhắn →", sent: "Cảm ơn bạn! Ứng dụng email sẽ mở để gửi.",
    rights: "© 2026 · Mely · Bảo lưu mọi quyền",
  },
  about: {
    title: "Về Mely",
    desc: "Mely là người yêu du lịch, từng sống hai năm ở Malaysia. Đi Rồi Kể là nơi Mely chia sẻ những chuyến đi chậm ở Việt Nam, Malaysia và Singapore.",
    kicker: "Về mình", h1a: "Xin chào,", h1b: "mình là Mely",
    intro: "Mình là Mely, một người yêu thích du lịch, khám phá những vùng đất mới và lưu giữ những khoảnh khắc qua ống kính. Đây là góc nhỏ để mình chia sẻ những câu chuyện, trải nghiệm, món ngon và những địa điểm thú vị trên hành trình của mình.",
    readBlog: "Đọc blog", contact: "Liên hệ",
    stats: ["Quốc gia", "Điểm đến", "Bài viết", "Năm sống ở Malaysia"],
    portrait: "Ảnh chân dung của bạn", onTheRoad: "Ảnh trên đường đi", klMemory: "Kỷ niệm ở Kuala Lumpur", journeyPhoto: "Ảnh hành trình",
    storyKicker: "Câu chuyện của mình", storyTitle: "Hành trình bắt đầu từ chiếc ba lô đầu tiên",
    story1: "Malaysia là đất nước đầu tiên mình đặt chân đến khi ra nước ngoài, cũng là nơi mình gắn bó suốt hai năm thanh xuân, vừa đi làm, vừa khám phá. Những ngày ở Kuala Lumpur cho mình thật nhiều kỷ niệm, từ những ngày vui vẻ đến những khoảng thời gian không mấy dễ dàng.",
    story2: "Trở về Việt Nam, mình tiếp tục xách ba lô lên và đi, từ những cung đường vùng cao Hà Giang đến phố núi Đà Lạt. Hy vọng những điều mình viết sẽ mang đến cho bạn một chút cảm hứng để khám phá thế giới theo cách riêng của mình.",
    valuesKicker: "Điều mình tin", valuesTitle: "Vì sao mình viết blog này",
    values: [
      ["Đi chậm", "Không chạy theo lịch trình dày đặc, mình thích ngồi lại một quán nhỏ, đi bộ qua những con phố và cảm nhận nhịp sống của từng nơi."],
      ["Chân thật", "Mọi bài viết đều từ trải nghiệm của chính mình, có chỗ đẹp, có chỗ chưa như mong đợi, để bạn có cái nhìn thật nhất trước mỗi chuyến đi."],
      ["Sẻ chia", "Từ cách di chuyển, món nên thử đến những mẹo nhỏ, mình mong blog là cuốn sổ tay giúp hành trình của bạn suôn sẻ hơn."],
    ],
    placesKicker: "Những nơi mình đã đi",
    ctaTitle: "Cùng mình đi tiếp nhé?", ctaText: "Nếu bạn có câu hỏi về một điểm đến, muốn hợp tác hay chỉ đơn giản là muốn trò chuyện, đừng ngại nhắn cho mình.", ctaButton: "Liên hệ với mình",
  },
  guide: {
    title: "Cẩm nang du lịch tự túc",
    desc: "Ghi chép thực tế sau mỗi chuyến đi ở Việt Nam, Malaysia và Singapore: nên đến lúc nào, di chuyển ra sao, ăn gì và mẹo nhỏ cho hành trình suôn sẻ.",
    eyebrow: "Sổ tay hành trình · Mely", h1a: "Cẩm nang", h1b: "cho người thích đi",
    text: "Những ghi chép thực tế sau mỗi chuyến đi: nên đến lúc nào, di chuyển ra sao, ăn gì và vài mẹo nhỏ để hành trình của bạn suôn sẻ hơn.",
    places: n => `${n} điểm đến`, readGuide: "Đọc cẩm nang →", tip: "Mẹo nhỏ",
  },
  blogs: {
    title: "Du lịch có trách nhiệm",
    desc: "Những cách đi nhẹ nhàng hơn với thiên nhiên và con người ở Việt Nam, Malaysia và Singapore: ít rác nhựa, tôn trọng văn hoá, ủng hộ người dân địa phương.",
    kicker: "Đi nhẹ nhàng", h1: "Du lịch có trách nhiệm", sub: "Đi xa mà vẫn để lại những nơi mình qua đẹp như lúc mình đến.",
    intro1: "Càng đi nhiều, mình càng nhận ra mỗi chuyến đi đều để lại dấu vết: một chai nhựa trên bãi biển, một con đường mòn bị giẫm nát, hay một quán ăn gia đình được sống thêm nhờ khách ghé. Dấu vết đó tốt hay xấu phần lớn tuỳ vào cách mình chọn đi.",
    pull: "Mình không cần trở thành người du lịch hoàn hảo. Chỉ cần mỗi chuyến đi tử tế hơn chuyến trước một chút.",
    intro2: "Du lịch là một ngành rất lớn, và dấu chân carbon của nó cũng không nhỏ. Một nghiên cứu đăng trên Nature Climate Change năm 2018 ước tính du lịch chiếm khoảng 8% lượng khí thải nhà kính toàn cầu, phần lớn đến từ việc đi lại, đặc biệt là máy bay.",
    intro3: "Với mình, du lịch có trách nhiệm đơn giản là ba điều: giảm tác động xấu lên thiên nhiên, tôn trọng văn hoá nơi mình đến, và để tiền của mình đi vào túi người dân địa phương.",
    section: "Cẩm nang đi có trách nhiệm",
    none: q => `Chưa có bài nào cho “${q}”. Thử từ khoá khác nhé.`,
    elseTitle: "Bạn đang tìm điều gì khác?", elsePlaceholder: "Tìm bài viết…", elseLabel: "Tìm bài viết",
    aboutKicker: "Về Đi Rồi Kể", aboutTitle: "Một blog nhỏ về những chuyến đi chậm",
    aboutText: "Đi Rồi Kể là nơi mình chia sẻ trải nghiệm thật ở Việt Nam, Malaysia và Singapore: lịch trình, món ăn và những cách đi nhẹ nhàng hơn với thiên nhiên và con người nơi mình đến.",
    backHome: "Về trang chủ",
  },
  post: {
    back: "← Quay lại", tip: "Mẹo nhỏ", related: "Đọc tiếp",
    route: place => `Tuyến hành trình · ${place}`, stops: n => `${n} ga`, stop: s => `Ga ${s}`,
    closingAlt: "Ảnh khép lại hành trình", photo: n => `Ảnh ${n}`,
    mainPhoto: h => `Ảnh chính: ${h}`, panorama: h => `Toàn cảnh ${h}`, detail: "Ảnh chi tiết",
    fullCaps: ["Không gian", "Đồ uống", "Góc chụp ảnh", "Chi tiết", "View"],
    mosaicCaps: ["Mặt hồ xanh ngọc", "Chi tiết", "Chân dung", "Đồi thông", "Góc check-in", "Panorama đồi và hồ"],
    portraitCap: "Chân dung",
  },
  notFound: { title: "Trang này đi lạc mất rồi", text: "Có thể đường dẫn đã thay đổi. Bạn quay về trang chủ để tìm bài viết nhé.", home: "Về trang chủ" },
};

const en = {
  siteTitle: "Đi Rồi Kể – Mely's travel blog on Vietnam, Malaysia and Singapore",
  siteDesc: "Mely's independent travel blog: tips, itineraries, food and personal stories from Vietnam, Malaysia and Singapore.",
  ogTitle: "Đi Rồi Kể – Mely's travel blog",
  ogDesc: "Independent travel tips and stories from the road in Vietnam, Malaysia and Singapore.",
  brandTagline: "Places I've been, food I've enjoyed and days worth remembering",
  topbar: { left: "Blog & stories", about: "About", contact: "Contact", language: "Language" },
  nav: { label: "Main menu", home: "Home", destinations: "Destinations", guide: "Guides", blogs: "Blogs" },
  countries: { vn: "Vietnam", my: "Malaysia", sg: "Singapore", all: "Vietnam, Malaysia & Singapore", mySg: "Malaysia · Singapore" },
  cats: { "Cẩm nang": "Guide", "Ăn gì": "Food", "Biển": "Beach", "Sống xanh": "Green living", "Trekking": "Trekking", "Động vật": "Wildlife", "Văn hoá": "Culture", "Di chuyển": "Transport" },
  all: "All",
  home: {
    featured: "Featured posts", prev: "Previous post", next: "Next post",
    latest: "Latest posts", results: n => `Results · ${n} ${n === 1 ? "post" : "posts"}`, filtering: "Filtering:",
    none: f => `No posts found for “${f}”. Try another destination.`,
    readMore: "Read more", readMoreArrow: "Read more →",
    hello: "Hello",
    aboutText: "I'm Mely, someone who loves travelling, exploring new places and keeping moments through the lens. This little corner is where I share stories, experiences, good food and lovely places from my journeys. I hope what I write gives you a little inspiration to pack your bag and discover the world in your own way.",
    search: "Search", searchPlaceholder: "Search destinations…", searchGo: "Search",
    categories: "Categories", popular: "Most read",
  },
  footer: {
    kicker: "Contact", title1: "Let's talk", title2: "about travel",
    text: "Have a question about a destination, want to collaborate, or simply want to tell me about your own trip? I'm always happy to listen and usually reply within 2–3 days.",
    emailLabel: "Email", aboutTopic: "I'd like to talk about",
    topics: ["A destination question", "Collaboration", "Feedback", "Just saying hi"],
    name: "Your name", email: "Email", message: "Write me a message…", messageLabel: "Message",
    send: "Send message →", sent: "Thank you! Your email app will open to send it.",
    rights: "© 2026 · Mely · All rights reserved",
  },
  about: {
    title: "About Mely",
    desc: "Mely loves travelling and lived in Malaysia for two years. Đi Rồi Kể is where she shares slow trips across Vietnam, Malaysia and Singapore.",
    kicker: "About me", h1a: "Hello,", h1b: "I'm Mely",
    intro: "I'm Mely, someone who loves travelling, exploring new places and keeping moments through the lens. This little corner is where I share stories, experiences, good food and lovely places from my journeys.",
    readBlog: "Read the blog", contact: "Contact",
    stats: ["Countries", "Destinations", "Posts", "Years living in Malaysia"],
    portrait: "Your portrait", onTheRoad: "A photo from the road", klMemory: "A memory from Kuala Lumpur", journeyPhoto: "Journey photo",
    storyKicker: "My story", storyTitle: "My journey began with a first backpack",
    story1: "Malaysia was the first country I set foot in after leaving home, and where I spent two years of my youth, working and exploring at the same time. My days in Kuala Lumpur gave me so many memories, from happy days to times that were not so easy.",
    story2: "Back in Vietnam, I kept shouldering my backpack and going, from the mountain roads of Ha Giang to the hill town of Da Lat. I hope what I write gives you a little inspiration to discover the world in your own way.",
    valuesKicker: "What I believe in", valuesTitle: "Why I write this blog",
    values: [
      ["Travel slowly", "I don't chase packed schedules. I like to sit in a small café, walk through the streets and feel the rhythm of each place."],
      ["Be honest", "Every post comes from my own experience, with the lovely parts and the ones that did not live up to expectations, so you get the truest picture before each trip."],
      ["Share", "From how to get around and what to eat to small tips, I hope this blog is a notebook that makes your journey run a little more smoothly."],
    ],
    placesKicker: "Places I've been",
    ctaTitle: "Shall we keep going together?", ctaText: "If you have a question about a destination, want to collaborate or simply want to chat, don't hesitate to message me.", ctaButton: "Get in touch",
  },
  guide: {
    title: "Independent travel guides",
    desc: "Practical notes after every trip in Vietnam, Malaysia and Singapore: when to go, how to get around, what to eat and small tips for a smooth journey.",
    eyebrow: "Travel notebook · Mely", h1a: "Guides", h1b: "for people who love to go",
    text: "Practical notes after each trip: when to go, how to get around, what to eat and a few small tips to make your journey smoother.",
    places: n => `${n} ${n === 1 ? "destination" : "destinations"}`, readGuide: "Read the guide →", tip: "Tip",
  },
  blogs: {
    title: "Responsible travel",
    desc: "Gentler ways to travel for nature and people in Vietnam, Malaysia and Singapore: less plastic, respect for culture and support for local communities.",
    kicker: "Travel lightly", h1: "Responsible travel", sub: "Go far, yet leave the places I pass as beautiful as I found them.",
    intro1: "The more I travel, the more I realise every trip leaves a mark: a plastic bottle on the beach, a trail trampled flat, or a family restaurant that survives a little longer thanks to visitors. Whether that mark is good or bad depends mostly on how I choose to travel.",
    pull: "I don't need to become a perfect traveller. I only need each trip to be a little kinder than the last.",
    intro2: "Tourism is a very large industry, and its carbon footprint is not small either. A 2018 study in Nature Climate Change estimated that tourism accounts for about 8% of global greenhouse gas emissions, mostly from travel, especially flying.",
    intro3: "To me, responsible travel is simply three things: reduce harm to nature, respect the culture of the place I visit, and let my money reach local people.",
    section: "Responsible travel guides",
    none: q => `No posts found for “${q}”. Try another keyword.`,
    elseTitle: "Looking for something else?", elsePlaceholder: "Search posts…", elseLabel: "Search posts",
    aboutKicker: "About Đi Rồi Kể", aboutTitle: "A small blog about slow travel",
    aboutText: "Đi Rồi Kể is where I share real experiences in Vietnam, Malaysia and Singapore: itineraries, food and gentler ways to travel for the nature and people I meet.",
    backHome: "Back to home",
  },
  post: {
    back: "← Back", tip: "Tip", related: "Keep reading",
    route: place => `Route · ${place}`, stops: n => `${n} ${n === 1 ? "stop" : "stops"}`, stop: s => `Stop ${s}`,
    closingAlt: "Closing photo of the journey", photo: n => `Photo ${n}`,
    mainPhoto: h => `Main photo: ${h}`, panorama: h => `Panorama of ${h}`, detail: "Detail photo",
    fullCaps: ["The space", "Drinks", "Photo spot", "Detail", "View"],
    mosaicCaps: ["Turquoise lake", "Detail", "Portrait", "Pine hills", "Check-in spot", "Panorama of hills and lake"],
    portraitCap: "Portrait",
  },
  notFound: { title: "This page got lost", text: "The link may have changed. Head back to the home page to find the posts.", home: "Back to home" },
};

export const dict = { vi, en };
export const getDict = lang => dict[lang] || dict[DEFAULT_LOCALE];
