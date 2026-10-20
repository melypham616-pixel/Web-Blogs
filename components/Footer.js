"use client";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { getDict } from "@/lib/i18n";

export default function Footer({ lang }) {
  const f = getDict(lang).footer;
  const [topic, setTopic] = useState(0);
  const [note, setNote] = useState("");

  // Mở ứng dụng email của người đọc với nội dung đã điền sẵn
  function send(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name").trim(), email = data.get("email").trim(), msg = data.get("msg").trim();
    const subject = `[${f.topics[topic]}] ${name}`;
    const body = `${msg}\n\n— ${name} (${email})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote(f.sent);
  }

  return (
    <footer id="contact">
      <div className="wrap ct">
        <div className="ct-info">
          <span className="kicker gold">{f.kicker}</span>
          <h2>{f.title1}<br /><em>{f.title2}</em></h2>
          <p>{f.text}</p>
          <a className="ct-mail" href={`mailto:${CONTACT_EMAIL}`}>
            <span className="ic">@</span>
            <span className="t"><span className="l">{f.emailLabel}</span><span>{CONTACT_EMAIL}</span></span>
          </a>
          <div className="socials">
            <a href="https://www.instagram.com/mely132001/" target="_blank" rel="noopener">Instagram</a>
            <a href="#" aria-disabled="true">TikTok</a>
            <a href="https://www.facebook.com/myduyen.meliora" target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
        <form className="ct-form" onSubmit={send}>
          <div className="topics">
            <span className="l">{f.aboutTopic}</span>
            <div className="chips">
              {f.topics.map((t, i) => <button type="button" key={t} className={i === topic ? "on" : undefined} aria-pressed={i === topic} onClick={() => setTopic(i)}>{t}</button>)}
            </div>
          </div>
          <div className="two">
            <input id="ctName" name="name" required placeholder={f.name} aria-label={f.name} />
            <input id="ctEmail" name="email" type="email" required placeholder={f.email} aria-label={f.email} />
          </div>
          <textarea id="ctMsg" name="msg" required rows={5} placeholder={f.message} aria-label={f.messageLabel} />
          <div className="send">
            <span className="note">{note}</span>
            <button type="submit">{f.send}</button>
          </div>
        </form>
      </div>
      <div className="ct-bottom"><div className="wrap">
        <span className="logo">Đi Rồi Kể</span>
        <span>{f.rights}</span>
      </div></div>
    </footer>
  );
}
