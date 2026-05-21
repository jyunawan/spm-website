import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Factory,
  Flame,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { HeroCapabilityPanel } from "#/components/hero-capability-panel";
import { LogoWall } from "#/components/logo-wall";
import { SectionLabel } from "#/components/section-label";
import * as m from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";

import foundryImage from "#/assets/images/foundry.png";
import warehouseImage from "#/assets/images/warehouse.png";
import officeIntroImage from "#/assets/images/office_intro.png";
import brandDaihatsu from "#/assets/images/brand_daihatsu_astra_motor.png";
import brandEdico from "#/assets/images/brand_edico_utama.png";
import brandFuji from "#/assets/images/brand_fuji_technica_indonesia.png";
import brandKiyokuni from "#/assets/images/brand_kiyokuni.png";
import brandKomatsu from "#/assets/images/brand_komatsu.png";
import brandMeiwa from "#/assets/images/brand_meiwa_mold_indonesia.png";
import brandMitsuba from "#/assets/images/brand_mitsuba_indonesia.png";
import brandMusashi from "#/assets/images/brand_musashi.png";
import brandPako from "#/assets/images/brand_pako_group.png";
import brandSummit from "#/assets/images/brand_summit_adyawinsa_indonesia.png";
import brandTjforge from "#/assets/images/brand_tjforge.png";
import brandToyota from "#/assets/images/brand_toyota_indonesia.png";
import brandTrimitra from "#/assets/images/brand_trimitra_chitrahasta.png";
import brandYamaha from "#/assets/images/brand_yamaha.png";

export const Route = createFileRoute("/")({ component: Home });

const customers = [
  { name: "Daihatsu Astra Motor", logo: brandDaihatsu },
  { name: "Edico Utama", logo: brandEdico },
  { name: "Fuji Technica Indonesia", logo: brandFuji },
  { name: "Kiyokuni", logo: brandKiyokuni },
  { name: "Komatsu", logo: brandKomatsu },
  { name: "Meiwa Mold Indonesia", logo: brandMeiwa },
  { name: "Mitsuba Indonesia", logo: brandMitsuba },
  { name: "Musashi", logo: brandMusashi },
  { name: "Pako Group", logo: brandPako },
  { name: "Summit Adyawinsa Indonesia", logo: brandSummit },
  { name: "TJForge", logo: brandTjforge },
  { name: "Toyota Indonesia", logo: brandToyota },
  { name: "Trimitra Chitrahasta", logo: brandTrimitra },
  { name: "Yamaha", logo: brandYamaha },
];

function Home() {
  const heroCapabilities = [
    {
      title: m.hero_capability_cutting_title(),
      body: m.hero_capability_cutting_body(),
      icon: Factory,
    },
    {
      title: m.hero_capability_machining_title(),
      body: m.hero_capability_machining_body(),
      icon: Wrench,
    },
    {
      title: m.hero_capability_heat_title(),
      body: m.hero_capability_heat_body(),
      icon: Flame,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#15171a]">
      <section className="relative overflow-hidden bg-[#15171a] text-white">
        <div className="absolute inset-0">
          <img
            src={foundryImage}
            alt=""
            className="h-full w-full object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.96),rgba(21,23,26,0.72),rgba(21,23,26,0.35))]" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(100svh-65px)] max-w-7xl flex-col justify-end gap-7 px-5 pb-12 pt-10 sm:min-h-[calc(100svh-73px)] lg:px-8 lg:pb-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#d92932] bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
              <Factory className="h-4 w-4" aria-hidden="true" />
              {m.hero_kicker()}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl">
              {m.hero_title()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {m.hero_body()}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={localizeHref("/contact")}
                className="inline-flex items-center justify-center gap-2 bg-[#d92932] px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#b4232a]"
              >
                {m.hero_primary_cta()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={localizeHref("/profile#services")}
                className="inline-flex items-center justify-center gap-2 border border-white/28 px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[#15171a]"
              >
                {m.hero_secondary_cta()}
              </a>
            </div>
          </div>

          <HeroCapabilityPanel items={heroCapabilities} />
        </div>
      </section>

      <section className="bg-[#f6f5f1]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <SectionLabel>{m.intro_kicker()}</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.intro_title()}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#565e66]">
              {m.intro_body()}
            </p>
            <div className="mt-8">
              <a
                href={localizeHref("/profile")}
                className="inline-flex items-center justify-center gap-2 bg-[#15171a] px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#2c3136]"
              >
                {m.home_profile_cta()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="relative min-h-92 overflow-hidden bg-[#283036]">
            <img
              src={officeIntroImage}
              alt="Sinar Putra Metalindo office"
              className="h-full w-full object-cover object-left"
            />
          </div>
        </div>
      </section>

      <section
        id="customers"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>{m.customers_kicker()}</SectionLabel>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.customers_title()}
            </h2>
          </div>
        </div>
        <div className="mt-12">
          <LogoWall items={customers} />
        </div>
      </section>

      <section className="grid bg-[#15171a] text-white lg:grid-cols-2">
        <div className="min-h-90">
          <img
            src={warehouseImage}
            alt="Sinar Putra Metalindo warehouse"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Gauge,
                value: "Fast",
                label: m.service_same_day_title(),
              },
              {
                icon: ShieldCheck,
                value: "Stable",
                label: m.service_workforce_title(),
              },
              {
                icon: Wrench,
                value: "Ready",
                label: m.service_support_title(),
              },
            ].map((item) => (
              <div key={item.value} className="border border-white/14 p-5">
                <item.icon
                  className="h-6 w-6 text-[#f4c044]"
                  aria-hidden="true"
                />
                <p className="mt-5 text-2xl font-black text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-white/62">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">
            {m.capacity_note()}
          </p>
        </div>
      </section>
    </main>
  );
}
