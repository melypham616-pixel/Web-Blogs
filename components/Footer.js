"use client";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { getDict } from "@/lib/i18n";

// Khoá công khai của Web3Forms (đặt trong .env.local và trên Vercel: NEXT_PUBLIC_WEB3FORMS_KEY)
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Footer({ lang }) {
  const f = getDict(lang).footer;
  const [topic, setTopic] = useState(0);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  // Gửi form tới Web3Forms (về hộp thư của chủ blog). Chưa cấu hình khoá thì mở ứng dụng email như cũ.
  async function send(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name").trim(), email = data.get("email").trim(), msg = data.get("msg").trim();
    const subject = `[${f.topics[topic]}] ${name}`;
    if (data.get("botcheck")) return; // bẫy bot: người thật không thấy ô này
    if (!FORM_KEY) {
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`;
      setNote(f.mailOpen);
      return;
    }
    setBusy(true); setNote(f.sending);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject, from_name: "Đi Rồi Kể", name, email, replyto: email, topic: f.topics[topic], message: msg, lang }),
      });
      const out = await res.json();
      if (!out.success) throw new Error(out.message);
      form.reset(); setTopic(0); setNote(f.sent);
    } catch {
      setNote(f.failed);
    }
    setBusy(false);
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
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
          <textarea id="ctMsg" name="msg" required rows={5} placeholder={f.message} aria-label={f.messageLabel} />
          <div className="send">
            <span className="note" role="status" aria-live="polite">{note}</span>
            <button type="submit" disabled={busy}>{f.send}</button>
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
