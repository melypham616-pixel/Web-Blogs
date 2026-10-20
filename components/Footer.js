"use client";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const TOPICS = ["Hỏi về điểm đến", "Hợp tác", "Góp ý", "Chỉ muốn làm quen"];

export default function Footer() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [note, setNote] = useState("");

  // Mở ứng dụng email của người đọc với nội dung đã điền sẵn
  function send(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name").trim(), email = f.get("email").trim(), msg = f.get("msg").trim();
    const subject = `[${topic}] ${name}`;
    const body = `${msg}\n\n— ${name} (${email})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote("Cảm ơn bạn! Ứng dụng email sẽ mở để gửi.");
  }

  return (
    <footer id="contact">
      <div className="wrap ct">
        <div className="ct-info">
          <span className="kicker gold">Liên hệ</span>
          <h2>Cùng trò chuyện<br /><em>về những chuyến đi</em></h2>
          <p>Bạn có câu hỏi về một điểm đến, muốn hợp tác hay chỉ đơn giản là muốn kể cho mình nghe về chuyến đi của bạn? Mình luôn sẵn lòng lắng nghe và thường trả lời trong vòng 2–3 ngày.</p>
          <a className="ct-mail" href={`mailto:${CONTACT_EMAIL}`}>
            <span className="ic">@</span>
            <span className="t"><span className="l">Email</span><span>{CONTACT_EMAIL}</span></span>
          </a>
          <div className="socials">
            <a href="https://www.instagram.com/mely132001/" target="_blank" rel="noopener">Instagram</a>
            <a href="#" aria-disabled="true">TikTok</a>
            <a href="https://www.facebook.com/myduyen.meliora" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
        <form className="ct-form" onSubmit={send}>
          <div className="topics">
            <span className="l">Bạn muốn nói về</span>
            <div className="chips">
              {TOPICS.map(t => <button type="button" key={t} className={t === topic ? "on" : undefined} aria-pressed={t === topic} onClick={() => setTopic(t)}>{t}</button>)}
            </div>
          </div>
          <div className="two">
            <input id="ctName" name="name" required placeholder="Tên của bạn" aria-label="Tên của bạn" />
            <input id="ctEmail" name="email" type="email" required placeholder="Email" aria-label="Email" />
          </div>
          <textarea id="ctMsg" name="msg" required rows={5} placeholder="Viết lời nhắn cho mình…" aria-label="Lời nhắn" />
          <div className="send">
            <span className="note">{note}</span>
            <button type="submit">Gửi lời nhắn →</button>
          </div>
        </form>
      </div>
      <div className="ct-bottom"><div className="wrap">
        <span className="logo">Đi Rồi Kể</span>
        <span>© 2026 · Mely · Bảo lưu mọi quyền</span>
      </div></div>
    </footer>
  );
}
