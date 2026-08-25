import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Leaf, FlaskConical, Search, X } from "lucide-react";
import { products, categories, Product, ProductCategory } from "@/lib/products";
import heroImg from "@/assets/hero-botanical.jpg";

import catHerbalImg from "@/assets/category-herbal.jpg";
import catPhytoImg from "@/assets/category-phytochemicals.jpg";
import catOilsImg from "@/assets/category-oils.jpg";
import catMineralsImg from "@/assets/category-minerals.jpg";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Ingredient Portfolio — SVS Nutraceuticals" },
      {
        name: "description",
        content:
          "Browse the full SVS ingredient portfolio: standardized botanical extracts, phytochemicals, essential oils, and natural vitamins.",
      },
      { property: "og:title", content: "Products — SVS Nutraceuticals" },
      {
        property: "og:description",
        content: "Our dynamic ingredient portfolio.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const SUPER_CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "herbal-extracts", label: "Herbal Extracts" },
  { id: "vitamins-minerals", label: "Vitamins, Minerals & Excipients" },
] as const;

type SuperCategoryId = (typeof SUPER_CATEGORIES)[number]["id"];

const categoryImages: Record<ProductCategory, string> = {
  "herbal-extracts": catHerbalImg,
  "phytochemicals": catPhytoImg,
  "essential-oils": catOilsImg,
  "natural-vitamins": catMineralsImg,
  "natural-minerals": catMineralsImg,
  "probiotics": catHerbalImg,
  "custom-formulations": catMineralsImg,
  "organic-products": catHerbalImg,
  "signature-products": catHerbalImg,
  "carotenoids": catPhytoImg,
};

function getSuperCategory(category: string): "herbal-extracts" | "vitamins-minerals" {
  if (
    category === "natural-vitamins" ||
    category === "natural-minerals" ||
    category === "custom-formulations"
  ) {
    return "vitamins-minerals";
  }
  return "herbal-extracts";
}

function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SuperCategoryId>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.botanical.toLowerCase().includes(q) ||
      p.standardization.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q);

    const matchesTab = activeTab === "all" || getSuperCategory(p.category) === activeTab;

    return matchesSearch && matchesTab;
  });

  // Group filtered products by their category
  const activeCategories = (Object.keys(categories) as ProductCategory[]).filter(
    (catId) => filtered.some((p) => p.category === catId)
  );

  return (
    <>
      {/* Products Hero Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-forest-deep">
        <img
          src={heroImg}
          alt="Products Banner"
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
        />
        <div className="container-editorial relative flex h-full flex-col justify-center text-cream">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Products</h1>
          <p className="mt-2 text-xs tracking-wider text-cream/70">
            <Link to="/" className="hover:text-cream">Home</Link> &gt;{" "}
            <span className="font-medium text-cream">Products</span>
          </p>
        </div>
      </div>

      {/* Our Categories Grid Section */}
      <section className="container-editorial pt-16 pb-8 border-b border-border/40">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-forest-deep font-semibold">Our Categories</h2>
          <p className="mt-2 text-sm text-muted-foreground">Explore our diverse segments of premium nutraceutical raw materials</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "herbal-extracts",
              label: "Herbal Extracts",
              img: catHerbalImg,
              desc: "Standardized botanical extracts",
            },
            {
              id: "phytochemicals",
              label: "Phytochemicals",
              img: catPhytoImg,
              desc: "Isolated active compounds",
            },
            {
              id: "essential-oils",
              label: "Essential Oils",
              img: catOilsImg,
              desc: "Pure therapeutic extracts",
            },
            {
              id: "vitamins-minerals",
              label: "Vitamins & Minerals",
              img: catMineralsImg,
              desc: "Organic nutrients & excipients",
            },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "vitamins-minerals") {
                  setActiveTab("vitamins-minerals");
                } else if (cat.id === "herbal-extracts") {
                  setActiveTab("herbal-extracts");
                } else {
                  setActiveTab("all");
                }
                setTimeout(() => {
                  const el = document.getElementById(cat.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }}
              className="group block rounded-lg border border-border bg-card overflow-hidden text-center transition-all duration-350 hover:border-forest/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="aspect-[3/2] overflow-hidden bg-bone relative">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest-deep/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-forest-deep group-hover:text-forest transition-colors duration-300">
                  {cat.label}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cat.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="container-editorial py-16">
        {/* Real-time search bar & Category pills header container */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-16">
          {/* Real-time search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ingredients by name or botanical source..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-5 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          {/* Category Tabs / Pills */}
          <div className="flex flex-wrap gap-2">
            {SUPER_CATEGORIES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-350 cursor-pointer ${
                    isActive
                      ? "bg-forest text-cream shadow-md shadow-forest/15"
                      : "bg-sage-soft/30 text-forest-deep hover:bg-sage-soft/60"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Category Listing */}
        {activeCategories.length > 0 ? (
          <div className="space-y-16">
            {activeCategories.map((catId) => {
              const catInfo = categories[catId];
              const catProducts = filtered.filter((p) => p.category === catId);

              return (
                <div key={catId} id={catId} className="flow-root border-b border-border/40 pb-12 last:border-0 last:pb-0 scroll-mt-24">
                  {/* Category Header Card with Image - Floated Left */}
                  <div className="float-left w-full lg:w-[23%] lg:mr-[2%] lg:h-[306px] mb-6 bg-card rounded-lg border border-border overflow-hidden flex flex-col">
                    <div className="aspect-[2/1] lg:aspect-none lg:h-[120px] overflow-hidden bg-bone relative">
                      <img
                        src={categoryImages[catId] || catHerbalImg}
                        alt={catInfo?.label || catId}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1 min-h-[140px]">
                      <div>
                        <div className="flex items-center gap-3">
                          {catId === "natural-vitamins" || catId === "natural-minerals" || catId === "phytochemicals" ? (
                            <FlaskConical className="h-5 w-5 text-forest" />
                          ) : (
                            <Leaf className="h-5 w-5 text-forest" />
                          )}
                          <h2 className="font-display text-xl text-forest-deep font-semibold">
                            {catInfo?.label || catId}
                          </h2>
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                          {catInfo?.description}
                        </p>
                      </div>
                      <div className="mt-4 text-[0.65rem] tracking-widest text-forest font-semibold uppercase">
                        {catProducts.length} {catProducts.length === 1 ? "Ingredient" : "Ingredients"}
                      </div>
                    </div>
                  </div>

                  {/* Bulleted Product List wrapping around the card */}
                  <ul className="m-0 p-0 list-none">
                    {catProducts.map((p) => (
                      <li key={p.slug} className="float-left w-[50%] md:w-[33.33%] lg:w-[25%] p-1.5 h-[115px] lg:h-[110px] box-border">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="w-full h-full flex items-start gap-3 text-left group p-2.5 rounded-lg hover:bg-sage-soft/30 transition-all duration-350 cursor-pointer border border-transparent hover:border-border/30"
                        >
                          {/* Accent Bullet */}
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-forest flex-shrink-0 group-hover:scale-150 group-hover:bg-forest-deep transition-all duration-300" />
                          <div>
                            <h3 className="font-display text-[15px] font-semibold text-forest-deep group-hover:text-forest transition-colors duration-300 line-clamp-2 leading-snug">
                              {p.name}
                            </h3>
                            {p.botanical && (
                              <p className="text-xs italic text-muted-foreground font-light mt-0.5 line-clamp-1">
                                {p.botanical}
                              </p>
                            )}
                            {p.standardization && (
                              <p className="text-[0.65rem] tracking-wider text-forest font-semibold uppercase mt-1.5 line-clamp-1">
                                {p.standardization}
                              </p>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">
              No ingredients found matching "{query}" under this category.
            </p>
          </div>
        )}
      </div>

      {/* Product Specification Sheet Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/45 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
            {/* Header */}
            <div className="p-6 border-b border-border bg-bone flex items-start justify-between gap-4">
              <div>
                <span className="text-[0.65rem] tracking-widest text-forest font-semibold uppercase">
                  {categories[selectedProduct.category]?.label || selectedProduct.category}
                </span>
                <h3 className="font-display text-3xl text-forest-deep mt-1">
                  {selectedProduct.name}
                </h3>
                {selectedProduct.botanical && (
                  <p className="text-sm italic text-muted-foreground mt-0.5">
                    {selectedProduct.botanical}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-full p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {selectedProduct.tagline && (
                <p className="text-base text-foreground/80 italic leading-relaxed border-l-2 border-forest pl-4">
                  {selectedProduct.tagline}
                </p>
              )}

              {/* Specifications Table */}
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                {selectedProduct.standardization && (
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Standardization</span>
                    <span className="text-forest-deep font-medium mt-0.5 block">{selectedProduct.standardization}</span>
                  </div>
                )}
                {selectedProduct.partUsed && (
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Part Used</span>
                    <span className="text-forest-deep font-medium mt-0.5 block">{selectedProduct.partUsed}</span>
                  </div>
                )}
                {selectedProduct.origin && (
                  <div>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Origin</span>
                    <span className="text-forest-deep font-medium mt-0.5 block">{selectedProduct.origin}</span>
                  </div>
                )}
              </div>

              {/* Key Benefits */}
              {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                <div>
                  <h4 className="font-display text-lg text-forest-deep mb-2">Key Benefits</h4>
                  <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                    {selectedProduct.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                <div>
                  <h4 className="font-display text-lg text-forest-deep mb-2">Applications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.applications.map((app, idx) => (
                      <span key={idx} className="bg-sage-soft/30 text-forest text-xs font-semibold px-3 py-1 rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
