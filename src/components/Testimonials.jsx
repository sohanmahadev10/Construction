import { Quote, Star } from "lucide-react";
import { testimonials } from "../data";
import { Reveal, SectionEyebrow, TiltCard, TiltStage, WordReveal } from "./ui";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="glow-orb glow-orb-right" />
      <div className="grain" />

      <div className="shell relative">
        <div className="max-w-3xl">
          <Reveal>
            <SectionEyebrow tone="sand">Testimonials</SectionEyebrow>
          </Reveal>
          <WordReveal
            text="Clients choose ISHTA when trust matters as much as design."
            className="display-title text-white"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.1}>
              <TiltStage>
                <TiltCard className="testimonial-card" intensity={7} scale={1.015}>
                  <Quote className="text-ember" size={30} />
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star key={starIndex} size={15} className="fill-sand text-sand" />
                    ))}
                  </div>
                  <p className="testimonial-text">{item.text}</p>
                  <div className="testimonial-author">
                    <span className="testimonial-avatar">{item.name.charAt(0)}</span>
                    <span>
                      <strong>{item.name}</strong>
                      <em>{item.place}</em>
                    </span>
                  </div>
                </TiltCard>
              </TiltStage>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
