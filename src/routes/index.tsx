import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Target,
  Compass,
  Building2,
  Truck,
  HeartHandshake,
  PackageCheck,
  Layers,
  Dna,
} from "lucide-react";
import heroImg from "@/assets/hero-botanical.jpg";
import labImg from "@/assets/research-lab.jpg";
import farmImg from "@/assets/sustainability-farm.jpg";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "SVS Nutraceuticals — Your Trusted Partner for Nutraceutical Ingredients",
      },
      {
        name: "description",
        content:
          "SVS Nutraceuticals is a trusted supplier and sourcing partner for high-quality nutraceutical raw materials, vitamins, herbal and botanical extracts, amino acids, minerals, and specialty ingredients.",
      },
      {
        property: "og:title",
        content: "SVS Nutraceuticals — Your Trusted Partner for Nutraceutical Ingredients",
      },
      {
        property: "og:description",
        content:
          "Trusted supplier of nutraceutical raw materials, vitamins, herbal extracts, amino acids, minerals, and specialty ingredients.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState("");

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

  const openQuote = (categoryName?: string) => {
    setQuoteCategory(categoryName || "");
    setQuoteOpen(true);
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-forest-deep py-28 md:py-36">
        {/* Background Image of Green Botanical Field with Refined Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={farmImg}
            alt="Botanical Fields"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-forest-deep/80 to-forest-deep/95" />
        </div>

        <div className="container-editorial relative z-10 flex flex-col items-center justify-center text-center reveal px-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cream backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-sage animate-ping" />
            SVS Nutraceuticals
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.08] tracking-tight text-white font-semibold max-w-5xl">
            Your Trusted Partner for <br className="hidden sm:inline" />
            <span className="text-cream italic font-normal">Nutraceutical Ingredients</span>
          </h1>

          {/* Two Descriptive Paragraphs */}
          <div className="mt-8 max-w-4xl space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-white/95 font-light px-2 sm:px-6">
            <p>
              SVS Nutraceuticals is a trusted supplier and sourcing partner for high-quality nutraceutical raw materials, vitamins, herbal and botanical extracts, amino acids, minerals, and specialty ingredients.
            </p>
            <p className="text-white/85 text-sm sm:text-base md:text-lg">
              We are committed to supporting nutraceutical manufacturers, dietary supplement brands, pharmaceutical companies, food and beverage manufacturers, and health &amp; wellness businesses with reliable ingredient sourcing and supply solutions.
            </p>
          </div>

          {/* Value Highlights Pill */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 rounded-full border border-white/25 bg-white/15 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white backdrop-blur-md shadow-sm">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sage" /> Quality Ingredients
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-sage" /> Reliable Supply
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-sage" /> Strong Partnerships
            </span>
          </div>

          {/* CTA Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-forest px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-forest-deep hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => openQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-forest-deep hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Request a Quote
            </button>
          </div>
        </div>

        {/* Bounce Scroll Indicator */}
        <button
          onClick={() => {
            const nextSec = document.getElementById("about-us");
            nextSec?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 hover:text-white transition-colors animate-bounce z-10 cursor-pointer"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
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
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
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
                <button
                  onClick={() => openQuote()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-forest-deep cursor-pointer"
                >
                  Discuss Your Requirements <ArrowRight className="h-3.5 w-3.5" />
                </button>
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
                    <button
                      onClick={() => openQuote(prod.title)}
                      className="text-xs font-medium text-muted-foreground hover:text-forest-deep transition-colors cursor-pointer"
                    >
                      Get Quote
                    </button>
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
                Explore our comprehensive ingredient database with full technical specifications, or speak directly with our sourcing desk for commercial volume pricing.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/products"
                  className="w-full sm:w-auto rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-forest-deep hover:shadow-xl transition-all"
                >
                  Explore Our Products
                </Link>
                <button
                  onClick={() => openQuote()}
                  className="w-full sm:w-auto rounded-full border-2 border-white bg-transparent px-8 py-3 text-sm font-semibold text-white hover:bg-white hover:text-forest-deep transition-all cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST A QUOTE MODAL */}
      <RequestQuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultIngredient={quoteCategory}
      />
    </>
  );
}
