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
  FileCheck2,
  Users,
} from "lucide-react";
import heroBannerImg from "@/assets/hero-nutraceutical-banner.jpg";
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
      {/* 1. STARTING PAGE HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#FBF9F5]">
        {/* Photographic Background with Botanical Composition on Right & Marble on Left */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBannerImg}
            alt="SVS Botanical & Laboratory Ingredients"
            className="h-full w-full object-cover object-right lg:object-center"
          />
          {/* Subtle gradient wash on left side to ensure high contrast and crisp typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF9F5] via-[#FBF9F5]/92 to-transparent lg:w-[62%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F5]/80 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Top Right Floating Ribbon Badge: QUALITY • PURITY • TRUST */}
        <div className="hidden lg:flex flex-col items-center justify-center absolute top-0 right-10 xl:right-16 w-24 pt-7 pb-5 bg-forest-deep text-white shadow-2xl rounded-b-xl border-x border-b border-amber-400/40 z-20">
          <div className="h-9 w-9 rounded-full border border-amber-400/60 flex items-center justify-center text-[#C59B4E] mb-2.5 bg-forest-deep/90 shadow-inner">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-cream leading-tight">QUALITY</span>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-cream leading-tight mt-0.5">PURITY</span>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-[#C59B4E] leading-tight mt-0.5">TRUST</span>
        </div>

        {/* Main Content Area */}
        <div className="container-editorial relative z-10 pt-10 sm:pt-14 pb-12 lg:py-16 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl reveal">
            {/* SVS Company Logo in Place of Logo */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              <img
                src="/logo-mark.png"
                alt="SVS Logo"
                className="h-14 w-14 sm:h-18 sm:w-18 lg:h-20 lg:w-20 object-contain drop-shadow-sm shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-forest-deep leading-none">
                  SVS
                </span>
                <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.34em] text-forest-deep mt-1 leading-none">
                  NUTRACEUTICALS
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="h-[1px] w-5 bg-amber-500/60" />
                  <span className="text-[0.6rem] sm:text-[0.68rem] font-semibold tracking-[0.24em] text-amber-800 uppercase leading-none">
                    INNOVATING HEALTH &amp; WELLNESS
                  </span>
                  <span className="h-[1px] w-5 bg-amber-500/60" />
                </div>
              </div>
            </div>

            {/* Three-Line Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold leading-[1.12] tracking-tight text-forest-deep">
              QUALITY INGREDIENTS. <br />
              <span className="text-[#B4833E]">BETTER SOLUTIONS.</span> <br />
              STRONGER PARTNERSHIPS.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-foreground/85 font-normal">
              Your trusted partner for Nutraceutical Ingredients, Vitamins, Herbal Extracts, Amino Acids, Minerals and Specialty Ingredients.
            </p>

            {/* 4 Feature Badges (3rd 'Scientifically Sourced' removed as requested) */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {[
                {
                  icon: Leaf,
                  line1: "PREMIUM",
                  line2: "QUALITY",
                },
                {
                  icon: ShieldCheck,
                  line1: "RELIABLE",
                  line2: "SUPPLY",
                },
                {
                  icon: FileCheck2,
                  line1: "COMPLETE",
                  line2: "DOCUMENTATION",
                },
                {
                  icon: Users,
                  line1: "CUSTOMER",
                  line2: "FOCUSED",
                },
              ].map((badge, idx, arr) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 sm:gap-6">
                    <div className="flex flex-col items-center text-center group">
                      <div className="h-12 w-12 rounded-full border border-forest-deep/25 bg-white/95 shadow-xs flex items-center justify-center text-forest-deep mb-2 group-hover:border-forest group-hover:text-forest transition-colors">
                        <Icon className="h-5 w-5 stroke-[1.75]" />
                      </div>
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-forest-deep leading-tight">
                        {badge.line1} <br />
                        {badge.line2}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="h-10 w-[1px] bg-forest-deep/15 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Button: Explore Our Products */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-forest-deep py-1.5 pl-2 pr-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-forest hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 bg-forest-deep text-[#C59B4E] group-hover:scale-105 transition-transform">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="px-2 text-white">Explore Our Products</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#C59B4E] to-[#9C702E] text-white group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Ticker Bar Across Full Width */}
        <div className="relative z-10 w-full bg-forest-deep text-white py-3.5 px-4 border-t border-amber-400/25 shadow-md">
          <div className="container-editorial flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-[0.68rem] sm:text-xs font-semibold tracking-widest uppercase">
            {[
              "NUTRACEUTICALS",
              "VITAMINS",
              "HERBAL EXTRACTS",
              "AMINO ACIDS",
              "MINERALS",
              "SPECIALTY INGREDIENTS",
            ].map((cat, idx, arr) => (
              <div key={cat} className="flex items-center gap-2 text-cream/90 hover:text-white transition-colors">
                <Leaf className="h-3.5 w-3.5 text-[#C59B4E] shrink-0" />
                <span>{cat}</span>
                {idx < arr.length - 1 && (
                  <span className="text-white/25 ml-4 hidden md:inline">|</span>
                )}
              </div>
            ))}
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
