import { Award, CheckCircle2 } from "lucide-react";
import { assetPath, interiorHighlights, reasons } from "../data";
import { ParallaxImage, Reveal, SectionEyebrow, TiltCard, TiltStage, WordReveal } from "./ui";

export function WhyUs() {
  return (
    <section id="why" className="section-light pt-0">
      <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal>
            <SectionEyebrow>Why choose us</SectionEyebrow>
          </Reveal>
          <WordReveal
            text="Premium does not mean complicated. It means well managed."
            className="display-title"
          />
          <Reveal delay={0.12}>
            <p className="lede text-coal/60">
              ISHTA keeps the building journey clear: accountable work, careful details, and
              decisions made with your budget and long-term comfort in mind.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.08} className="h-full">
              <article className="reason-card">
                <CheckCircle2 className="text-ember" size={22} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Interiors() {
  return (
    <section id="interiors" className="section-light">
      <div className="mesh-light" />
      <div className="shell relative grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <Reveal>
            <SectionEyebrow>Interiors</SectionEyebrow>
          </Reveal>
          <WordReveal
            text="Warmth, storage, lighting, and a finished rhythm."
            className="display-title"
          />
          <Reveal delay={0.12}>
            <p className="lede text-coal/60">
              We design interiors that feel premium without becoming fragile. Every room is planned
              for daily living: lighting mood, storage behaviour, material durability, and a calm
              visual flow.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {interiorHighlights.map(([Icon, label], index) => (
              <Reveal key={label} delay={0.16 + index * 0.07}>
                <div className="mini-card">
                  <span className="mini-icon">
                    <Icon size={20} />
                  </span>
                  {label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="relative">
          <TiltStage>
            <TiltCard className="interior-frame" intensity={8}>
              <ParallaxImage
                src={assetPath("assets/project-interior.png")}
                alt="Premium ISHTA interior project"
                className="h-full w-full"
                range={44}
              />
            </TiltCard>
          </TiltStage>
          <div className="interior-badge">
            <Award className="text-ember" size={24} />
            <p>Designed for comfort. Detailed for longevity.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
