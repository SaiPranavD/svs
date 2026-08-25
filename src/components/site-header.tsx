import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <header className={isHome ? (isTransparent ? "fixed top-0 left-0 right-0 z-50 border-none bg-transparent transition-all duration-300" : "fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-white/95 shadow-sm backdrop-blur transition-all duration-300") : "sticky top-0 z-40 border-b border-border/70 bg-white/95 shadow-sm backdrop-blur"}>
      <div className="container-editorial flex h-20 items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo-mark.png" alt="SVS Logo" className={`h-9 w-9 object-contain transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`} />
          <div className="flex flex-col">
            <span className={isTransparent ? "font-display text-xl leading-none tracking-tight text-white transition-colors duration-300" : "font-display text-xl leading-none tracking-tight text-forest-deep transition-colors duration-300"}>SVS</span>
            <span className={isTransparent ? "text-[0.55rem] font-semibold tracking-[0.28em] text-white/80 mt-0.5 leading-none transition-colors duration-300" : "text-[0.55rem] font-medium tracking-[0.28em] text-muted-foreground mt-0.5 leading-none transition-colors duration-300"}>
              NUTRACEUTICALS
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className={isTransparent ? "text-[0.85rem] font-semibold tracking-wide text-white/95 transition-colors duration-300 hover:text-white" : "text-[0.8rem] font-medium tracking-wide text-foreground/75 transition-colors duration-300 hover:text-forest"}
            activeProps={{ className: isTransparent ? "text-white underline decoration-2 underline-offset-8" : "text-forest underline decoration-2 underline-offset-8 font-semibold" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={isTransparent ? "text-[0.85rem] font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-white" : "text-[0.8rem] font-medium tracking-wide text-foreground/75 transition-colors duration-300 hover:text-forest"}
            activeProps={{ className: isTransparent ? "text-white underline decoration-2 underline-offset-8" : "text-forest underline decoration-2 underline-offset-8 font-semibold" }}
          >
            About Us
          </Link>
          <Link
            to="/products"
            className={isTransparent ? "text-[0.85rem] font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-white" : "text-[0.8rem] font-medium tracking-wide text-foreground/75 transition-colors duration-300 hover:text-forest"}
            activeProps={{ className: isTransparent ? "text-white underline decoration-2 underline-offset-8" : "text-forest underline decoration-2 underline-offset-8 font-semibold" }}
          >
            Products
          </Link>
        </nav>
        <button className={isTransparent ? "md:hidden text-white" : "md:hidden text-foreground"} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden animate-slide-down">
          <nav className="container-editorial flex flex-col gap-1 py-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-secondary"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-secondary"
            >
              About Us
            </Link>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-secondary"
            >
              Products
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
