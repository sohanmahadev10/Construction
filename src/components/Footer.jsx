import { ArrowUp, Mail, MessageCircle, Phone } from "lucide-react";
import { email, navItems, phone, phoneHref, whatsappHref } from "../data";
import { Reveal } from "./ui";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="grain" />
      <div className="shell relative">
        <Reveal>
          <p className="footer-wordmark">ISHTA</p>
        </Reveal>

        <div className="footer-grid">
          <div>
            <p className="footer-lead">
              We build your vision — construction, interiors, and turnkey delivery across Mandya,
              Mysore, and Bangalore.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="footer-action" href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a className="footer-action" href={phoneHref}>
                <Phone size={16} />
                {phone}
              </a>
              <a className="footer-action" href={`mailto:${email}`}>
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="footer-heading">Explore</p>
            <ul>
              {navItems.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer-heading">Studio</p>
            <ul>
              <li>Mandya</li>
              <li>Mysore</li>
              <li>Bangalore</li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p>© {new Date().getFullYear()} ISHTA Construction and Interior. All rights reserved.</p>
          <a href="#hero" className="footer-top">
            Back to top
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
