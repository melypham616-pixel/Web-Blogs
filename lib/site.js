import { POSTS } from "@/data/posts";
import { route } from "@/lib/i18n";

export const SITE_URL = "https://blogs.mely.io.vn";
export const SITE_NAME = "Đi Rồi Kể";
export const CONTACT_EMAIL = "myduyenwork123@gmail.com";

export const pad2 = n => String(n).padStart(2, "0");
/** Đường dẫn bài viết theo ngôn ngữ: postUrl("en", "ha-giang") → "/en/posts/ha-giang/" */
export const postUrl = (lang, id) => route(lang, "post", id);

// Ảnh chụp dùng ở trang chủ (public/images/photos)
const PHOTO = n => "/images/photos/" + n + ".jpeg";
export const FEATURED = [["penang", PHOTO("penang-hero")], ["ho-chi-minh", PHOTO("IMG_0954")]];
export const MALAYSIA_TILE = "/images/photos/pasted-1792243942155-0.png";
export const STRIP_PHOTOS = ["6D1F9B59-0AD3-43AB-B245-A229C11C33AA_1_105_c", "A067B649-3042-48E8-A7AD-9A668DA76998_1_105_c-002fb546", "8B1CE620-6431-4E2E-9399-B0C5EDA92DCD_1_105_c", "FCA17A9D-DD65-48F0-8167-DC07FC0B9F01_1_105_c", "32091226-1888-48E1-8BF9-DA86011DF290_1_105_c", "BCF7BA10-B0D9-4D22-A5F4-C5D8A126D495_1_105_c", "5EE5FC5F-A0FD-4237-9FA5-6BFDCB00DA98_1_105_c", "21B9F094-81D5-4D28-87D5-3665D1FEB35E_1_105_c", "8432327C-3B6D-4BA8-9C8F-EC82D3CC9702", "3471A5A6-AE71-4ED3-B93C-8F105CE7B1C4", "28FD83F8-B7B5-478B-9160-5170CCEEAD3A_1_105_c", "80F2269F-6AAC-4945-A41B-8F2C00052C1E_1_105_c", "F379357A-F423-41B1-9B28-E09C61FB0D08_1_105_c", "AB17D104-6F8A-48C9-95F1-6965AD6DF168_1_105_c", "511B17B4-0756-4F3A-9340-15FC74B43123_1_105_c", "5283F05A-5FCE-4BCB-AD01-2C5711CC027A_1_105_c", "40BCF89B-942A-49C7-B2EF-276DF1690F88_1_105_c", "D02A40C3-1B7B-4642-AC08-9EE0D4EE041B_1_105_c", "F5C94FD4-AC07-488A-BDBF-29F23B556162_1_105_c", "907D565A-D8B3-4B6D-A6BD-807E5F265D97_1_105_c", "746A1B30-ECFA-41F7-888C-A47B6A78E484_1_105_c", "7668CC11-DB91-4C70-8E66-B9680F459725_1_105_c", "87D13118-848A-412B-A8D0-3694D86ED75A_1_105_c", "FAE40637-FF2C-44B3-808E-BF7E95251F3C_1_105_c", "056F6A4C-2F99-4676-B1B1-2F4667DCC5C9_1_105_c", "6F1F1C30-3503-4C98-B35E-8FAE266B6D05_1_105_c", "1C7CEB60-9107-40D6-A6E5-FB97B348E198_1_105_c", "F0D44427-DB1B-4E5D-8928-5D0D55F04472_1_105_c", "B0445AAE-99FA-4D04-82DA-02A1F5C95AC0_1_105_c", "B1A3EA82-7F47-4935-86D2-BD9501B032E5_1_105_c", "EF167360-2A27-4A1F-A0C6-7BB3291A6FD8_1_105_c", "3A1578DF-0B19-42C2-95C2-24A6ACD0505B_1_105_c", "9CD6EBF4-6018-4C68-B892-83C049EBE4C4_1_201_a", "10ACA169-1927-4977-AB48-DAEBDC062F99_1_105_c", "75562693-6DBB-45ED-84CD-DB3EC87B52C7_1_105_c", "FAA75B00-4A02-40A6-B7ED-4C9AA3F46912_1_105_c", "80B88781-1C0E-47AA-B59B-13A5D4096813_1_105_c", "3AAE737B-6A36-4357-9259-397E0F0EC694_1_105_c", "EF8B56CC-FCCB-447E-B7A3-1D4EAE6DEE2D_1_105_c"].map(PHOTO);

// Ô danh mục ở trang chủ: [mã quốc gia, ảnh dự phòng]. Tên hiển thị lấy từ từ điển (dict.countries).
const sgIndex = Math.max(0, POSTS.findIndex(p => p.c === "sg"));
export const TILES = [["vn", POSTS[0]], ["my", MALAYSIA_TILE], ["sg", POSTS[sgIndex]]];

// Bản đồ trang Cẩm nang: vị trí thật (vĩ độ, kinh độ) chiếu lên khung; hướng nhãn r/l/t
const GEO = { "ha-giang": [22.82, 104.98, "Hà Giang", "r"], "sa-pa": [22.34, 103.84, "Sa Pa", "l"], "ha-noi": [21.03, 105.85, "Hà Nội", "r"], "ba-vi": [21.08, 105.37, "Ba Vì", "l"], "lang-van-hoa": [21.05, 105.47, "Làng Văn hóa", "r"], "da-lat": [11.94, 108.44, "Đà Lạt", "l"], "nui-ba-den": [11.37, 106.17, "Núi Bà Đen", "t"], "ho-chi-minh": [10.78, 106.70, "Hồ Chí Minh", "l"], "vung-tau": [10.35, 107.08, "Vũng Tàu", "r"], "con-thoi-son": [10.30, 106.37, "Cồn Thới Sơn", "l"], "penang": [5.41, 100.33, "Penang", "r"], "ipoh": [4.60, 101.09, "Ipoh", "t"], "cameron": [4.47, 101.38, "Cameron Highlands", "r"], "pangkor": [4.21, 100.57, "Pangkor", "l"], "genting": [3.42, 101.79, "Genting", "t"], "colmar-tropicale": [3.35, 101.83, "Colmar Tropicale", "r"], "kuala-lumpur": [3.14, 101.69, "Kuala Lumpur", "l"], "malacca": [2.19, 102.25, "Malacca", "r"] };
// Tên ghim bằng tiếng Anh (tiếng Việt lấy từ GEO)
const GEO_EN = { "Hà Giang": "Ha Giang", "Hà Nội": "Hanoi", "Ba Vì": "Ba Vi", "Làng Văn hóa": "Ethnic Villages", "Đà Lạt": "Da Lat", "Núi Bà Đen": "Ba Den Mountain", "Hồ Chí Minh": "Ho Chi Minh City", "Vũng Tàu": "Vung Tau", "Cồn Thới Sơn": "Con Thoi Son", "Colmar Tropicale": "Colmar Tropicale" };
const BOUNDS = { vn: [9.8, 23.6, 103.0, 109.6], my: [0.9, 5.9, 99.9, 104.4] };
export function mapPins(lang) {
  const pins = { vn: [], my: [] };
  const seen = new Set();
  POSTS.forEach(p => {
    let g = GEO[p.id];
    const panel = p.c === "vn" ? "vn" : "my";
    if (p.c === "sg") g = [1.29, 103.85, "Singapore", "l"]; // các bài ở Singapore dùng chung một ghim
    if (!g || seen.has(g[2])) return;
    seen.add(g[2]);
    const b = BOUNDS[panel];
    const name = lang === "en" ? (GEO_EN[g[2]] || g[2]) : g[2];
    pins[panel].push({ id: p.id, name, dir: g[3], x: ((g[1] - b[2]) / (b[3] - b[2]) * 80 + 10).toFixed(1), y: ((b[1] - g[0]) / (b[1] - b[0]) * 76 + 14).toFixed(1) });
  });
  return pins;
}
