import { Languages } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

import * as m from "#/paraglide/messages";
import { getLocale, localizeHref, setLocale } from "#/paraglide/runtime";

import logo from "#/assets/images/logo.png";

const navItems = [
  { label: m.nav_home, href: "/" },
  { label: m.nav_profile, href: "/profile" },
  { label: m.nav_products, href: "/products" },
  { label: m.nav_services, href: "/services" },
  { label: m.nav_contact, href: "/contact" },
];

export function Navbar() {
  const currentLocale = getLocale();
  const nextLocale = currentLocale === "en" ? "id" : "en";
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f6f5f1]/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-375 items-center justify-between gap-6 px-5 py-2 lg:px-8">
        <a
          href={localizeHref("/")}
          className="flex min-w-0 items-center"
          aria-label="Sinar Putra Metalindo"
        >
          <img
            src={logo}
            alt="Sinar Putra Metalindo"
            className="h-10 w-auto sm:h-12 lg:h-13"
          />
        </a>

        <div className="flex items-center justify-end gap-4">
          <nav className="hidden items-center gap-2 text-sm font-black uppercase tracking-[0.02em] text-[#3d4147] lg:flex xl:gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={localizeHref(item.href)}
                className={`rounded-full px-4 py-2.5 transition ${
                  isActiveNavItem(item.href, location.pathname)
                    ? "bg-white text-[#15171a] shadow-sm ring-1 ring-black/10"
                    : "text-[#4a5058] hover:bg-white/70 hover:text-[#15171a]"
                }`}
              >
                {item.label()}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setLocale(nextLocale)}
            aria-label={`${m.language_label()}: ${currentLocale.toUpperCase()}`}
            className="group flex items-center gap-2 rounded-full border border-black/10 bg-white px-1.5 py-1 shadow-sm transition hover:bg-[#edf0f1]"
          >
            <Languages
              className="h-4 w-4 text-[#5b626b] sm:hidden"
              aria-hidden="true"
            />
            <span className="relative flex h-8 w-18 items-center rounded-full bg-[#edf0f1] p-1 text-[11px] font-black uppercase text-[#5b626b]">
              <span
                className={`absolute top-1 h-6 w-8 rounded-full bg-[#15171a] transition-transform ${
                  currentLocale === "id" ? "translate-x-8" : "translate-x-0"
                }`}
                aria-hidden="true"
              />
              <span
                className={`relative z-10 flex flex-1 justify-center transition ${
                  currentLocale === "en" ? "text-white" : "text-[#5b626b]"
                }`}
              >
                {m.language_en()}
              </span>
              <span
                className={`relative z-10 flex flex-1 justify-center transition ${
                  currentLocale === "id" ? "text-white" : "text-[#5b626b]"
                }`}
              >
                {m.language_id()}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function isActiveNavItem(href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "/en/" || pathname === "/id/";
  }

  const hrefPath = href.split("#")[0];

  if (!hrefPath || hrefPath === "/") {
    return false;
  }

  return pathname.endsWith(hrefPath);
}
