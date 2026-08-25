import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-forest-deep text-cream">
      <div className="container-editorial grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/logo-mark.png" alt="SVS Logo" className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-none text-cream">SVS</span>
              <span className="text-[0.65rem] font-medium tracking-[0.28em] text-sage mt-1 leading-none">
                NUTRACEUTICALS
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            A research-driven manufacturer of standardized botanical extracts and nutraceutical
            ingredients, serving global partners in dietary supplement, functional food and
            pharmaceutical categories since 2024.
          </p>

        </div>

        <div>
          <p className="eyebrow text-sage">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link to="/" className="hover:text-cream">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-cream">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-cream">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-sage">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>info@svsnutraceuticals.com</li>
            <li>+91 78429 51590</li>
            <li className="mt-3 text-xs leading-relaxed text-cream/70">
              <strong>Address:</strong><br />
              2-6-314, JAIPURI COLONY,<br />
              BANDLAGUDA, CIRCLE 10,<br />
              CIRCLE 10, HYDERABAD
            </li>
            <li className="text-[0.75rem] text-cream/50 mt-4 leading-relaxed">
              FSSAI No: 13626999000489<br />
              GST No: 36CEXPD2886J2ZQ
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-editorial flex flex-col justify-between gap-2 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} SVS Nutraceuticals Pvt. Ltd. All rights reserved.</p>
          <p>Statements have not been evaluated by the FDA. B2B use only.</p>
        </div>
      </div>
    </footer>
  );
}
