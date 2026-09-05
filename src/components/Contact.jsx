import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { assetPath, email, phone, phoneHref, whatsappHref } from "../data";
import { Magnetic, Reveal, SectionEyebrow, WordReveal } from "./ui";

export default function Contact() {
  const submitContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nLocation: ${data.get(
        "location"
      )}\nService: ${data.get("service")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="contact"
      style={{ "--contact-bg": `url(${assetPath("assets/project-exterior.png")})` }}
    >
      <div className="contact-veil" />
      <div className="glow-orb glow-orb-left" />
      <div className="grain" />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <SectionEyebrow tone="sand">Contact</SectionEyebrow>
          </Reveal>
          <WordReveal text="Tell us what you want to build." className="display-title text-white" />
          <Reveal delay={0.12}>
            <p className="lede text-white/60">
              Share your location, project type, and timeline. ISHTA will help you shape the next
              step clearly.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3">
            <a className="contact-row" href={phoneHref}>
              <span className="contact-icon">
                <Phone size={18} />
              </span>
              <span>
                <em>Call us</em>
                <strong>{phone}</strong>
              </span>
            </a>
            <a className="contact-row" href={`mailto:${email}`}>
              <span className="contact-icon">
                <Mail size={18} />
              </span>
              <span>
                <em>Email</em>
                <strong className="break-all">{email}</strong>
              </span>
            </a>
            <a className="contact-row" href={whatsappHref} target="_blank" rel="noreferrer">
              <span className="contact-icon">
                <MessageCircle size={18} />
              </span>
              <span>
                <em>WhatsApp</em>
                <strong>Chat with the team</strong>
              </span>
            </a>
            <div className="contact-row">
              <span className="contact-icon">
                <MapPin size={18} />
              </span>
              <span>
                <em>Service area</em>
                <strong>Mandya, Mysore, Bangalore</strong>
              </span>
            </div>
          </div>
        </div>

        <Reveal delay={0.12}>
          <form onSubmit={submitContact} className="contact-form">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span>Name</span>
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" required placeholder="+91 ..." />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span>Location</span>
                <select name="location" defaultValue="Mandya">
                  <option>Mandya</option>
                  <option>Mysore</option>
                  <option>Bangalore</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                <span>Service</span>
                <select name="service" defaultValue="Construction">
                  <option>Construction</option>
                  <option>Interior Design</option>
                  <option>Renovation</option>
                  <option>Consultation</option>
                </select>
              </label>
            </div>
            <label>
              <span>Project details</span>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Tell us about the site, size, timeline, and vision."
              />
            </label>
            <Magnetic strength={0.18} className="w-full">
              <button className="btn-primary w-full justify-center" type="submit">
                Send enquiry
                <ArrowRight size={18} />
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
