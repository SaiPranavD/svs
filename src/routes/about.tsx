import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SVS Nutraceuticals" },
      {
        name: "description",
        content:
          "SVS Nutraceuticals is a leading supplier and trader of high-quality nutraceutical raw materials, vitamins, minerals, herbal extracts, and excipients.",
      },
      { property: "og:title", content: "About — SVS Nutraceuticals" },
      { property: "og:description", content: "Our story and global reach." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="container-editorial py-16 md:py-24">
        <p className="eyebrow">About Us</p>
        <h1 className="mt-4 max-w-5xl font-display text-4xl leading-tight text-forest-deep md:text-6xl">
          Quality ingredients are the foundation of{" "}
          <em className="not-italic text-forest">superior healthcare products</em>.
        </h1>
      </section>

      <section className="container-editorial grid gap-14 pb-20 md:grid-cols-12">
        <div className="md:col-span-7 space-y-8 text-base leading-relaxed text-foreground/85">
          <p className="text-lg font-medium text-forest-deep leading-relaxed">
            At SVS Nutraceuticals, we believe that quality ingredients are the foundation of superior healthcare products. We specialize in sourcing and supplying a comprehensive range of nutraceutical raw materials and pharmaceutical excipients for manufacturers, contract manufacturers, research organizations, and healthcare companies.
          </p>
          <p>
            Our commitment to integrity, quality, and customer satisfaction has helped us build long-term relationships with clients throughout India.
          </p>
          
          <div className="border-l-2 border-forest pl-6 py-2 italic text-muted-foreground bg-sage-soft/30 rounded-r-sm">
            <h4 className="font-display font-semibold text-forest-deep not-italic mb-2">Our Commitment</h4>
            “At SVS Nutraceuticals, we are committed to delivering excellence through quality products, dependable service, and customer satisfaction. Our goal is to become your preferred partner for all nutraceutical ingredients, pharmaceutical excipients, and specialty raw material requirements.”
          </div>
        </div>

        <aside className="md:col-span-5 space-y-6">
          <div className="rounded-sm border border-border bg-card p-6">
            <h3 className="font-display text-xl text-forest-deep font-semibold">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To become one of India’s most trusted suppliers of nutraceutical ingredients and pharmaceutical excipients by delivering exceptional quality, reliable service, and innovative sourcing solutions.
            </p>
          </div>

          <div className="rounded-sm border border-border bg-card p-6">
            <h3 className="font-display text-xl text-forest-deep font-semibold">Our Mission</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              {[
                "To supply high-quality nutraceutical ingredients.",
                "To maintain international quality standards.",
                "To provide cost-effective sourcing solutions.",
                "To ensure timely delivery and excellent customer support.",
                "To build long-term business partnerships based on trust and reliability."
              ].map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-bone border-y border-border/40 py-20">
        <div className="container-editorial">
          <p className="eyebrow text-center">Value Proposition</p>
          <h2 className="mt-4 text-center font-display text-3xl text-forest-deep md:text-4xl">
            Why Choose SVS Nutraceuticals?
          </h2>
          
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[
              "Premium Quality Products",
              "Trusted Global & Indian Manufacturers",
              "Competitive Pricing",
              "Ready Stock Availability",
              "Fast & Safe Delivery",
              "Technical Support",
              "Flexible Supply Solutions",
              "Reliable Customer Service",
              "Customized Sourcing",
              "Complete Documentation Support"
            ].map((prop, idx) => (
              <div key={idx} className="rounded-sm border border-border/50 bg-background p-5 shadow-sm hover:shadow-md transition">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-soft text-forest mb-4 font-semibold">
                  ✓
                </div>
                <p className="text-sm font-medium text-forest-deep leading-snug">{prop}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY POLICY */}
      <section className="container-editorial py-20">
        <div className="mx-auto max-w-4xl rounded-sm border border-forest/20 bg-sage-soft/10 p-8 md:p-12 text-center">
          <p className="eyebrow">Quality Assurance</p>
          <h2 className="mt-4 font-display text-3xl text-forest-deep">Quality Policy</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground font-light max-w-3xl mx-auto">
            “Quality is our highest priority. Every product supplied by SVS Nutraceuticals is sourced from trusted manufacturers and undergoes strict quality checks to ensure compliance with industry standards.”
          </p>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="container-editorial pb-20">
        <p className="eyebrow">Registered details</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-forest-deep md:text-4xl">
          Corporate Office &amp; Operations
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["Legal Registrations", "Certifications & Compliance", "FSSAI Lic No: 13626999000489\nGST No: 36CEXPD2886J2ZQ\nTIN TR: 4095-297-0006"],
            ["Registered Office", "Corporate Address", "2-6-314, JAIPURI COLONY,\nBANDLAGUDA, CIRCLE 10,\nCIRCLE 10, HYDERABAD"],
          ].map(([city, dept, addr]) => (
            <div key={city} className="rounded-sm border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <p className="font-display text-2xl text-forest-deep">{city}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-forest">{dept}</p>
              </div>
              <p className="mt-6 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{addr}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
