// Cây khu vực của Việt Nam cho menu "Điểm đến": Miền → Vùng/Thành phố → Bài viết.
// Muốn chuyển một bài sang khu vực khác chỉ cần đổi id của nó ở đây.
export const VN_REGIONS = [
  {
    key: "north", name: { vi: "Miền Bắc", en: "Northern Vietnam" },
    areas: [
      { name: { vi: "Hà Nội và vùng lân cận", en: "Hanoi & surroundings" }, ids: ["ha-noi", "ba-vi", "lang-van-hoa"] },
      { name: { vi: "Vùng núi phía Bắc", en: "Northern mountains" }, ids: ["ha-giang", "sa-pa"] },
    ],
  },
  {
    key: "south", name: { vi: "Miền Nam", en: "Southern Vietnam" },
    areas: [
      { name: { vi: "Đông Nam Bộ", en: "Southeast" }, ids: ["ho-chi-minh", "vung-tau", "nui-ba-den"] },
      { name: { vi: "Đồng bằng sông Cửu Long", en: "Mekong Delta" }, ids: ["con-thoi-son"] },
      { name: { vi: "Tây Nguyên", en: "Central Highlands" }, ids: ["da-lat"] },
    ],
  },
];
