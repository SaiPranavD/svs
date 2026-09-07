import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowRight,
  Leaf,
  FlaskConical,
  ShieldCheck,
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
import heroBannerImg from "@/assets/hero-banner.png";
import heroBannerMobileImg from "@/assets/hero-banner-mobile.jpg";
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
      {/* 1. STARTING PAGE HERO BANNER */}
      <section className="relative w-full bg-white overflow-hidden border-b border-border/40">
        <div className="w-full max-w-[1720px] mx-auto">
          <picture>
            <source media="(max-width: 767px)" srcSet={heroBannerMobileImg} />
            <img
              src={heroBannerImg}
              alt="SVS Nutraceuticals — Quality Ingredients. Reliable Supply. Your Trusted Trading Partner for Nutraceutical Ingredients"
              className="w-full h-auto block object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Bottom Ticker Bar Across Full Width */}
        <div className="relative z-10 w-full bg-forest-deep text-white py-3 sm:py-3.5 px-4 border-t border-amber-400/25 shadow-md">
          <div className="container-editorial flex flex-wrap items-center justify-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 text-[0.68rem] sm:text-xs font-semibold tracking-widest uppercase">
              {[
                { label: "NUTRACEUTICALS", search: undefined, hash: undefined },
                { label: "VITAMINS", search: { category: "natural-vitamins", tab: "vitamins-minerals" }, hash: "natural-vitamins" },
                { label: "HERBAL EXTRACTS", search: { category: "herbal-extracts", tab: "herbal-extracts" }, hash: "herbal-extracts" },
                { label: "AMINO ACIDS", search: { category: "signature-products" }, hash: "signature-products" },
                { label: "MINERALS", search: { category: "natural-minerals", tab: "vitamins-minerals" }, hash: "natural-minerals" },
                { label: "SPECIALTY INGREDIENTS", search: { category: "custom-formulations", tab: "vitamins-minerals" }, hash: "custom-formulations" },
              ].map((item, idx, arr) => (
                <Link
                  key={item.label}
                  to="/products"
                  search={item.search}
                  hash={item.hash}
                  className="flex items-center gap-2 text-cream/90 hover:text-white transition-colors cursor-pointer"
                >
                  <Leaf className="h-3.5 w-3.5 text-[#C59B4E] shrink-0" />
                  <span>{item.label}</span>
                  {idx < arr.length - 1 && (
                    <span className="text-white/25 ml-3 hidden md:inline">|</span>
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#C59B4E] hover:bg-[#b0873c] text-forest-deep px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about-us" className="py-24 bg-[#FAF8F5] border-b border-border/60 scroll-mt-20 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-soft/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C59B4E]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-editorial relative z-10 reveal">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Narrative Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="eyebrow text-forest">ABOUT US</p>
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
                <div className="rounded-xl border-l-4 border-forest bg-sage-soft/40 p-5 shadow-xs">
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
              <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-lg bg-bone group">
                <img
                  src={labImg}
                  alt="SVS Research & Sourcing Standards"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#E8C77B]">Quality &amp; Compliance</span>
                  <p className="text-sm font-medium mt-1 text-white/95 leading-snug">
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
                      className="rounded-xl border border-border/80 bg-white p-4.5 hover:border-forest/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="h-9 w-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center mb-2.5">
                        <Icon className="h-4.5 w-4.5" />
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
      <section className="py-24 bg-[#F4F1EA] border-b border-border/60">
        <div className="container-editorial reveal">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-forest font-semibold tracking-[0.2em]">
              Guiding Principles
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-forest-deep font-semibold tracking-tight">
              Our Vision &amp; Mission
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Anchored in integrity, quality sourcing, and long-term customer partnerships.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* OUR VISION CARD - Solid Deep Emerald Box */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0e2a1e] border border-[#1a4231] p-8 sm:p-10 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#C59B4E] via-forest to-transparent rounded-full" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E8C77B] border border-white/15 mb-6">
                  <Compass className="h-4 w-4 text-[#C59B4E]" />
                  OUR VISION
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-white font-medium leading-snug mt-2">
                  To become a trusted and preferred partner for nutraceutical ingredients by delivering reliable sourcing solutions and supporting the growth of health and wellness businesses.
                </h3>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-cream/80">
                <span className="uppercase tracking-wider font-mono text-[0.7rem] text-cream/60">Core Purpose</span>
                <span className="font-medium text-[#E8C77B] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C59B4E]" />
                  Reliability • Growth • Trust
                </span>
              </div>
            </div>

            {/* OUR MISSION CARD - Solid White High-End Box */}
            <div className="lg:col-span-7 rounded-2xl bg-white border border-border/80 p-8 sm:p-10 text-forest-deep flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-forest via-sage to-transparent rounded-full" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sage-soft/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-forest border border-forest/20 mb-6">
                  <Target className="h-4 w-4 text-forest" />
                  OUR MISSION
                </div>

                <ul className="space-y-3.5 mt-2">
                  {[
                    "To supply quality-focused nutraceutical ingredients.",
                    "To provide reliable and efficient sourcing solutions.",
                    "To build long-term relationships with our customers.",
                    "To support manufacturers and brands with a wide range of ingredients.",
                    "To continuously expand our product portfolio to meet market requirements.",
                  ].map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF9F5] border border-border/60 hover:border-forest/40 hover:bg-[#F3EFE6] transition-all duration-200"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-xs">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-forest-deep leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground font-medium">
                  Partner with SVS for consistent quality &amp; supply solutions.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-deep transition-colors group"
                >
                  Browse Product Catalog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                search: { category: "herbal-extracts", tab: "herbal-extracts" },
                hash: "herbal-extracts",
              },
              {
                title: "Vitamins & Minerals",
                desc: "Plant-derived and pharmaceutical grade vitamins, organic minerals, and bioavailable nutrient complexes.",
                category: "Natural Vitamins & Minerals",
                icon: FlaskConical,
                search: { category: "vitamins-minerals", tab: "vitamins-minerals" },
                hash: "vitamins-minerals",
              },
              {
                title: "Amino Acids & Specialty Actives",
                desc: "High-purity amino acids, peptides, and functional compounds tailored for sports nutrition, active wellness, and recovery formulas.",
                category: "Specialty Actives",
                icon: Sparkles,
                search: { category: "signature-products" },
                hash: "signature-products",
              },
              {
                title: "Phytochemicals & Carotenoids",
                desc: "Pure isolated phytochemical compounds, carotenoids, and potent natural antioxidants meeting stringent pharmacopoeial specs.",
                category: "Phytochemicals",
                icon: Dna,
                search: { category: "phytochemicals" },
                hash: "phytochemicals",
              },
              {
                title: "Essential Oils & Aromatics",
                desc: "Therapeutic-grade essential oils and natural aromatics steam-distilled to preserve delicate botanical profiles.",
                category: "Essential Oils",
                icon: PackageCheck,
                search: { category: "essential-oils" },
                hash: "essential-oils",
              },
              {
                title: "Specialty Functional Ingredients",
                desc: "Custom formulation ingredients, probiotics, excipients, and specialty raw materials for targeted market formulations.",
                category: "Custom Solutions",
                icon: Layers,
                search: { category: "custom-formulations", tab: "vitamins-minerals" },
                hash: "custom-formulations",
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

                    <Link
                      to="/products"
                      search={prod.search}
                      hash={prod.hash}
                      className="block group-hover:text-forest transition-colors"
                    >
                      <h3 className="font-display text-xl font-semibold text-forest-deep group-hover:text-forest transition-colors">
                        {prod.title}
                      </h3>
                    </Link>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/70 flex items-center justify-between">
                    <Link
                      to="/products"
                      search={prod.search}
                      hash={prod.hash}
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
