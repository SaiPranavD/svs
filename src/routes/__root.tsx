import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 font-display text-5xl text-forest-deep">Not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has moved. Explore our ingredient catalog
            instead.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-forest px-5 py-2 text-sm text-primary-foreground hover:bg-forest-deep"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="max-w-2xl text-center">
          <p className="eyebrow">SVS Nutraceuticals</p>
          <h1 className="mt-4 font-display text-4xl text-forest-deep md:text-5xl">
            Quality Ingredients, Trusted Solutions.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Explore our nutraceutical raw materials, vitamins, minerals, herbal extracts, amino
            acids, and pharmaceutical excipients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="rounded-full bg-forest px-5 py-2.5 text-sm text-primary-foreground hover:bg-forest-deep"
            >
              Browse products
            </Link>
            <button
              onClick={reset}
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary"
            >
              Refresh view
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SVS Nutraceuticals — Standardized Botanical Extracts & Nutraceutical Ingredients" },
      {
        name: "description",
        content:
          "SVS Nutraceuticals manufactures research-grade botanical extracts and nutraceutical ingredients for global dietary supplement, functional food and pharmaceutical partners.",
      },
      { name: "author", content: "SVS Nutraceuticals" },
      { property: "og:site_name", content: "SVS Nutraceuticals" },
      { property: "og:title", content: "SVS Nutraceuticals" },
      {
        property: "og:description",
        content:
          "Research-grade botanical extracts and nutraceutical ingredients, engineered for global partners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32.png?v=2", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-192.png?v=2", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/favicon-180.png?v=2", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <WhatsAppButton />
      </div>
    </QueryClientProvider>
  );
}
