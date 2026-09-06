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
import heroCleanBg from "@/assets/hero-clean-background.jpg";
import heroImg from "@/assets/hero-botanical.jpg";
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
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Crisp Photographic Background: Authentic marble, bokeh, botanical plants & beaker (NO white wash overlay) */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCleanBg}
            alt="SVS Botanical & Laboratory Ingredients"
            className="h-full w-full object-cover object-right lg:object-center"
          />
        </div>

        {/* Top Right Ribbon Badge (QUALITY • PURITY • TRUST) */}
        <div className="hidden lg:flex flex-col items-center justify-center absolute top-0 right-10 xl:right-16 w-24 pt-7 pb-5 bg-forest-deep text-white shadow-2xl rounded-b-xl border-x border-b border-amber-400/40 z-20">
          <div className="h-9 w-9 rounded-full border border-amber-400/60 flex items-center justify-center text-[#C59B4E] mb-2.5 bg-forest-deep/90 shadow-inner">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-cream leading-tight">QUALITY</span>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-cream leading-tight mt-0.5">PURITY</span>
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-[#C59B4E] leading-tight mt-0.5">TRUST</span>
        </div>

        {/* Main Content Area: Ultra-Crisp Vector Typography & Icons */}
        <div className="container-editorial relative z-10 pt-8 sm:pt-12 pb-10 lg:py-14 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl reveal">
            {/* SVS Official Company Logo */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-7">
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
                  <span className="h-[1px] w-5 bg-amber-600/60" />
                  <span className="text-[0.6rem] sm:text-[0.68rem] font-semibold tracking-[0.24em] text-amber-800 uppercase leading-none">
                    INNOVATING HEALTH &amp; WELLNESS
                  </span>
                  <span className="h-[1px] w-5 bg-amber-600/60" />
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
            <p className="mt-4 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90 font-normal">
              Your trusted partner for Nutraceutical Ingredients, Vitamins, Herbal Extracts, Amino Acids, Minerals and Specialty Ingredients.
            </p>

            {/* 4 Feature Badges (3rd 'Scientifically Sourced' removed, clean vector layout) */}
            <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
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
                      <div className="h-12 w-12 rounded-full border-2 border-forest-deep/30 bg-white/90 shadow-sm flex items-center justify-center text-forest-deep mb-2 group-hover:border-forest group-hover:text-forest transition-colors">
                        <Icon className="h-5 w-5 stroke-[1.85]" />
                      </div>
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-forest-deep leading-tight">
                        {badge.line1} <br />
                        {badge.line2}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="h-10 w-[1.5px] bg-forest-deep/20 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Button: Explore Our Products */}
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-forest-deep py-1.5 pl-2 pr-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-forest hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 bg-forest-deep text-[#C59B4E] group-hover:scale-105 transition-transform">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="px-2.5 text-white">Explore Our Products</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#C59B4E] to-[#9C702E] text-white group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Ticker Bar Across Full Width */}
        <div className="relative z-10 w-full bg-forest-deep text-white py-3 px-4 border-t border-amber-400/25 shadow-md">
          <div className="container-editorial flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2 text-[0.68rem] sm:text-xs font-semibold tracking-widest uppercase">
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
                  <span className="text-white/25 ml-4 hidden md:inline">|</span>
                )}
              </Link>
            ))}
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
      <section className="relative py-28 bg-[#091810] text-white border-y border-[#C59B4E]/25 overflow-hidden">
        {/* Botanical Image Texture Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-luminosity">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#091810] via-[#091810]/85 to-[#091810] pointer-events-none" />

        {/* Ambient Radial Lighting Glows */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-[#C59B4E]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="container-editorial relative z-10 reveal">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-[#C59B4E] tracking-[0.25em] font-semibold">
              Guiding Principles
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-white font-semibold tracking-tight">
              Our Vision &amp; Mission
            </h2>
            <p className="mt-4 text-base text-cream/75 max-w-xl mx-auto leading-relaxed">
              Anchored in integrity, quality sourcing, and long-term customer partnerships.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* OUR VISION CARD */}
            <div className="lg:col-span-5 rounded-2xl border border-[#C59B4E]/35 bg-gradient-to-br from-[#122A1E]/95 via-[#0B1D14]/95 to-[#07140D]/95 p-8 sm:p-10 text-white flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#C59B4E]/60 transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C59B4E]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C59B4E]/50 bg-[#C59B4E]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E8C77B] mb-6">
                  <Compass className="h-3.5 w-3.5 text-[#C59B4E]" />
                  OUR VISION
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-cream font-medium leading-snug">
                  To become a trusted and preferred partner for nutraceutical ingredients by delivering reliable sourcing solutions and supporting the growth of health and wellness businesses.
                </h3>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-cream/70">
                <span className="uppercase tracking-wider font-mono text-[0.7rem] text-cream/50">Core Purpose</span>
                <span className="font-medium text-[#E8C77B] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C59B4E]" />
                  Reliability • Growth • Trust
                </span>
              </div>
            </div>

            {/* OUR MISSION CARD */}
            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 sm:p-10 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-white/30 transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-6">
                  <Target className="h-3.5 w-3.5 text-emerald-400" />
                  OUR MISSION
                </div>

                <ul className="space-y-3.5">
                  {[
                    "To supply quality-focused nutraceutical ingredients.",
                    "To provide reliable and efficient sourcing solutions.",
                    "To build long-term relationships with our customers.",
                    "To support manufacturers and brands with a wide range of ingredients.",
                    "To continuously expand our product portfolio to meet market requirements.",
                  ].map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-[#C59B4E]/30 transition-all duration-200"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C59B4E]/20 text-[#E8C77B] border border-[#C59B4E]/30">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm sm:text-base font-normal text-cream/95 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-cream/60">
                  Partner with SVS for consistent quality &amp; supply solutions.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E8C77B] hover:text-white transition-colors"
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
