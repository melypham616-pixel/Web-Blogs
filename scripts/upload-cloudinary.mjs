// Upload toàn bộ ảnh trong public/images lên Cloudinary.
// Cách dùng (khoá bí mật chỉ nằm trong terminal của bạn, không lưu vào code):
//   CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME" node scripts/upload-cloudinary.mjs
// Chỉ thử không upload: thêm --dry
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, relative, basename } from "node:path";

const url = process.env.CLOUDINARY_URL;
const dry = process.argv.includes("--dry");
const m = url && url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
if (!m && !dry) { console.error("Thiếu CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME"); process.exit(1); }
const [, key, secret, cloud] = m || [];

const ROOT = "public/images";
const FOLDER = "di-roi-ke";
const OK = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else if (OK.has(extname(e.name).toLowerCase())) yield p;
  }
}

const out = {};
let n = 0;
for await (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);                       // ví dụ slots/cover-ba-vi.jpg
  const publicId = rel.replace(/\.[^.]+$/, "");           // bỏ đuôi file
  n++;
  if (dry) { console.log("sẽ upload:", rel); continue; }
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { folder: FOLDER, overwrite: "true", public_id: publicId, timestamp };
  const toSign = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
  const signature = createHash("sha1").update(toSign + secret).digest("hex");
  const form = new FormData();
  form.append("file", new Blob([await readFile(file)]), basename(file));
  for (const [k, v] of Object.entries({ ...params, api_key: key, signature })) form.append(k, String(v));
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body: form });
  const j = await res.json();
  if (!res.ok) { console.error("Lỗi", rel, j.error?.message); process.exit(1); }
  out["images/" + rel] = j.secure_url;
  console.log(`${n} ✓ ${rel}`);
}
if (!dry) { await writeFile("cloudinary-map.json", JSON.stringify(out, null, 1)); console.log(`Xong ${n} ảnh. Bản đồ đường dẫn: cloudinary-map.json`); }
else console.log(`${n} ảnh sẽ được upload vào thư mục "${FOLDER}".`);
