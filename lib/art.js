// Vẽ ảnh minh hoạ SVG cho mỗi bài từ scene + bảng màu.
// Nếu bài có trường img thì dùng ảnh thật thay cho SVG.
export function art(p) {
  if (p.img) return `<img src="${p.img}" alt="${p.place || ""}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">`;
  const [sky, sun, mid, front] = p.colors;
  const hill = (y, c, a) => `<path d="M0 ${y} C 80 ${y - a}, 160 ${y + a / 2}, 240 ${y - a / 3} S 360 ${y - a}, 400 ${y - a / 2} V300 H0Z" fill="${c}"/>`;
  let fg = "";
  switch (p.scene) {
    case "mount":
      fg = `<path d="M-20 240 L90 90 L170 200 L250 70 L420 240 V300 H-20Z" fill="${mid}"/>` + hill(250, front, 30);
      break;
    case "pine":
      fg = hill(190, mid, 50)
        + [40, 90, 140, 250, 310, 360].map((x, i) => `<path d="M${x} ${150 + i % 2 * 20} l18 70 h-36z" fill="${front}"/>`).join("")
        + hill(255, front, 15);
      break;
    case "lantern":
      fg = `<rect y="200" width="400" height="100" fill="${front}"/>`
        + [70, 150, 230, 310].map((x, i) => `<line x1="${x}" y1="0" x2="${x}" y2="${60 + i % 2 * 30}" stroke="${front}" stroke-width="2"/><ellipse cx="${x}" cy="${80 + i % 2 * 30}" rx="20" ry="26" fill="${i % 2 ? mid : sun}"/>`).join("");
      break;
    case "city":
      fg = `<rect x="170" y="70" width="22" height="190" fill="${front}"/><rect x="208" y="70" width="22" height="190" fill="${front}"/><rect x="186" y="150" width="28" height="6" fill="${front}"/>`
        + [[20, 170, 40], [70, 140, 36], [260, 150, 40], [310, 120, 34], [350, 180, 40], [120, 190, 40]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="${mid}"/>`).join("")
        + `<rect y="262" width="400" height="40" fill="${front}"/>`;
      break;
    case "sea":
      fg = `<rect y="190" width="400" height="110" fill="${mid}"/><path d="M0 220 Q 50 210 100 220 T 200 220 T 300 220 T 400 220 V300 H0Z" fill="${front}"/>`;
      break;
    case "tea":
      fg = hill(170, mid, 40)
        + [200, 225, 250, 275].map(y => `<path d="M0 ${y} Q 200 ${y - 30} 400 ${y}" stroke="${front}" stroke-width="10" fill="none" opacity=".7"/>`).join("")
        + hill(270, front, 20);
      break;
    case "forest": // Gardens by the Bay: cụm siêu cây
      fg = [[90, 120], [160, 90], [230, 130], [300, 100]].map(([x, y]) => `<path d="M${x - 6} 260 L${x - 2} ${y + 20} h4 L${x + 6} 260Z" fill="${front}"/><path d="M${x - 34} ${y} Q ${x} ${y + 40} ${x + 34} ${y}Z" fill="${mid}"/>`).join("")
        + hill(262, front, 12);
      break;
    case "farm": // rừng thưa Tây Nguyên: đồi + cây tán tròn
      fg = hill(200, mid, 35)
        + [[60, 165], [130, 180], [290, 160], [350, 175]].map(([x, y]) => `<rect x="${x - 3}" y="${y}" width="6" height="40" fill="${front}"/><circle cx="${x}" cy="${y}" r="22" fill="${front}"/>`).join("")
        + hill(260, front, 18);
      break;
  }
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="${sky}"/><circle cx="300" cy="85" r="38" fill="${sun}" opacity=".9"/>${fg}</svg>`;
}
