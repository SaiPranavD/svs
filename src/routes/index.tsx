import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  Leaf,
  FlaskConical,
  CheckCircle2,
  Sparkles,
  Target,
  Compass,
  Truck,
  HeartHandshake,
  PackageCheck,
  Layers,
  Dna,
} from "lucide-react";
import heroBannerImg from "@/assets/hero-exact-banner-2x.jpg";
import labImg from "@/assets/research-lab.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "SVS Nutraceuticals — Quality Ingredients. Better Solutions. Stronger Partnerships.",
      },
      {
        name: "description",
        content:
          "Your trusted partner for Nutraceutical Ingredients, Vitamins, Herbal Extracts, Amino Acids, Minerals and Specialty Ingredients.",
      },
      {
        property: "og:title",
        content: "SVS Nutraceuticals — Quality Ingredients. Better Solutions. Stronger Partnerships.",
      },
      {
        property: "og:description",
        content:
          "Your trusted partner for Nutraceutical Ingredients, Vitamins, Herbal Extracts, Amino Acids, Minerals and Specialty Ingredients.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* 1. STARTING PAGE HERO SECTION - EXACT DESIGN WITH AUTHENTIC MARBLE BACKGROUND */}
      <section className="relative w-full bg-[#E5E5DF] overflow-hidden">
        <div className="relative w-full max-w-[1920px] mx-auto">
          {/* High-Resolution Exact Banner: Preserves Natural Marble Background, 4 Badges, SVS Logo */}
          <div className="relative aspect-[2048/1092] w-full overflow-hidden shadow-xs">
            <img
              src={heroBannerImg}
              alt="SVS Nutraceuticals — Quality Ingredients. Better Solutions. Stronger Partnerships."
              className="w-full h-full object-cover object-center"
              loading="eager"
            />

            {/* Clickable Overlay for "EXPLORE OUR PRODUCTS" Button */}
            <Link
              to="/products"
              className="absolute left-[5.8%] bottom-[8.5%] w-[25%] h-[10.5%] rounded-full cursor-pointer z-20 focus:outline-none focus:ring-4 focus:ring-amber-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Explore Our Products"
            >
              <span className="sr-only">Explore Our Products</span>
            </Link>

            {/* Clickable Overlay for Bottom Ticker Categories */}
            <div className="absolute inset-x-0 bottom-0 h-[8%] z-20 grid grid-cols-6">
              {[
                "nutraceuticals",
                "vitamins",
                "herbal-extracts",
                "amino-acids",
                "minerals",
                "specialty-ingredients",
              ].map((cat) => (
                <Link
                  key={cat}
                  to="/products"
                  className="h-full w-full cursor-pointer hover:bg-white/5 transition-colors"
                  aria-label={`Browse ${cat}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about-us" className="py-24 bg-card border-b border-border/40 scroll-mt-20">
        <div className="container-editorial reveal">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Narrative Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="eyebrow">ABOUT US</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-forest-deep font-semibold leading-tight">
                  Welcome to <br />
                  <span className="text-forest italic font-normal">SVS Nutraceuticals</span>
                </h2>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-foreground/85 font-normal">
                <p className="text-lg font-medium text-forest-deep leading-relaxed">
                  SVS Nutraceuticals is dedicated to supplying a comprehensive range of high-quality ingredients for the nutraceutical, dietary supplement, pharmaceutical, food, and wellness industries.
                </p>

                <p>
                  Our product portfolio includes nutraceutical ingredients, vitamins, herbal extracts, botanical extracts, amino acids, minerals, and specialty functional ingredients.
                </p>

                <p>
                  We understand that reliable sourcing and consistent quality are essential for successful products. Our focus is to support our customers with dependable supply solutions and professional service.
                </p>

                <p>
                  At SVS Nutraceuticals, we believe in building long-term business relationships based on quality, trust, reliability, and customer satisfaction.
                </p>
              </div>

              <div className="pt-2">
                <div className="rounded-lg border-l-4 border-forest bg-sage-soft/30 p-5">
                  <p className="font-display text-forest-deep italic text-base sm:text-lg">
                    “Building long-term business relationships based on quality, trust, reliability, and customer satisfaction.”
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-deep transition-colors"
                >
                  Learn More About Our Company
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-muted-foreground/40">•</span>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-deep transition-colors"
                >
                  Browse Complete Catalog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual and Pillar Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-xl overflow-hidden border border-border/70 shadow-md bg-bone">
                <img
                  src={labImg}
                  alt="SVS Research & Sourcing Standards"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-sage">Quality &amp; Compliance</span>
                  <p className="text-sm font-medium mt-0.5 text-white/95">
                    FSSAI Registered • Strict Analytical Standards • Reliable Supply Chain
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Comprehensive Range",
                    desc: "Supplements, pharma, food & wellness industries",
                    icon: Layers,
                  },
                  {
                    title: "Diverse Portfolio",
                    desc: "Herbal extracts, vitamins, minerals & amino acids",
                    icon: Dna,
                  },
                  {
                    title: "Dependable Sourcing",
                    desc: "Reliable logistics, consistent quality & purity",
                    icon: Truck,
                  },
                  {
                    title: "Long-Term Trust",
                    desc: "Customer satisfaction & dedicated service",
                    icon: HeartHandshake,
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-card p-4 hover:border-forest/40 hover:shadow-sm transition-all"
                    >
                      <div className="h-8 w-8 rounded-md bg-sage-soft/50 text-forest flex items-center justify-center mb-2.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-display text-sm font-semibold text-forest-deep">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VISION & OUR MISSION SECTION */}
      <section className="py-24 bg-bone border-b border-border/40">
        <div className="container-editorial reveal">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow">Guiding Principles</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-forest-deep font-semibold">
              Our Vision &amp; Mission
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Anchored in integrity, quality sourcing, and long-term customer partnerships.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* OUR VISION CARD */}
            <div className="lg:col-span-5 rounded-2xl border border-forest/20 bg-forest-deep p-8 sm:p-10 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-forest/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage mb-6">
                  <Compass className="h-3.5 w-3.5" />
                  OUR VISION
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-white font-semibold leading-snug">
                  To become a trusted and preferred partner for nutraceutical ingredients by delivering reliable sourcing solutions and supporting the growth of health and wellness businesses.
                </h3>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-cream/75">
                <span>Core Purpose</span>
                <span className="font-semibold text-sage">Reliability • Growth • Trust</span>
              </div>
            </div>

            {/* OUR MISSION CARD */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-forest mb-6">
                  <Target className="h-3.5 w-3.5" />
                  OUR MISSION
                </div>

                <ul className="space-y-4">
                  {[
                    "To supply quality-focused nutraceutical ingredients.",
                    "To provide reliable and efficient sourcing solutions.",
                    "To build long-term relationships with our customers.",
                    "To support manufacturers and brands with a wide range of ingredients.",
                    "To continuously expand our product portfolio to meet market requirements.",
                  ].map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-bone/80 transition-colors"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-base font-medium text-forest-deep leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Partner with SVS for consistent quality &amp; supply solutions.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-forest-deep"
                >
                  Browse Product Catalog <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR PRODUCTS SECTION */}
      <section id="products-section" className="py-24 bg-card border-b border-border/40">
        <div className="container-editorial reveal">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="eyebrow">OUR PRODUCTS</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-forest-deep font-semibold">
              Comprehensive Nutraceutical Ingredient Solutions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              SVS Nutraceuticals offers a diverse portfolio of ingredients for various health, nutrition, food, and wellness applications.
            </p>
          </div>

          {/* Product Portfolio Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Herbal & Botanical Extracts",
                desc: "Standardized herbal extracts manufactured with verified active assay potency for capsules, tablets, and functional blends.",
                category: "Herbal Extracts",
                icon: Leaf,
                link: "/products",
              },
              {
                title: "Vitamins & Minerals",
                desc: "Plant-derived and pharmaceutical grade vitamins, organic minerals, and bioavailable nutrient complexes.",
                category: "Natural Vitamins & Minerals",
                icon: FlaskConical,
                link: "/products",
              },
              {
                title: "Amino Acids & Specialty Actives",
                desc: "High-purity amino acids, peptides, and functional compounds tailored for sports nutrition, active wellness, and recovery formulas.",
                category: "Specialty Actives",
                icon: Sparkles,
                link: "/products",
              },
              {
                title: "Phytochemicals & Carotenoids",
                desc: "Pure isolated phytochemical compounds, carotenoids, and potent natural antioxidants meeting stringent pharmacopoeial specs.",
                category: "Phytochemicals",
                icon: Dna,
                link: "/products",
              },
              {
                title: "Essential Oils & Aromatics",
                desc: "Therapeutic-grade essential oils and natural aromatics steam-distilled to preserve delicate botanical profiles.",
                category: "Essential Oils",
                icon: PackageCheck,
                link: "/products",
              },
              {
                title: "Specialty Functional Ingredients",
                desc: "Custom formulation ingredients, probiotics, excipients, and specialty raw materials for targeted market formulations.",
                category: "Custom Solutions",
                icon: Layers,
                link: "/products",
              },
            ].map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-xl border border-border bg-card p-7 hover:border-forest/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-lg bg-sage-soft/40 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-muted-foreground bg-bone px-2.5 py-1 rounded-full">
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-forest-deep group-hover:text-forest transition-colors">
                      {prod.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/70 flex items-center justify-between">
                    <Link
                      to={prod.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep transition-colors"
                    >
                      View Ingredients <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Banner */}
          <div className="mt-16 rounded-2xl bg-forest-deep p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Looking for Specific Raw Materials or Custom Sourcing?
              </h3>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light max-w-2xl mx-auto">
                Explore our comprehensive ingredient database with full technical specifications across 120+ standardized botanical extracts, vitamins, minerals, and functional nutrients.
              </p>
              <div className="pt-2 flex items-center justify-center">
                <Link
                  to="/products"
                  className="rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-forest-deep hover:shadow-xl transition-all"
                >
                  Explore Our Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
