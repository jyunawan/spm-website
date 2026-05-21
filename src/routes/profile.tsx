import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Factory,
  Flame,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";

import {
  CertificateGallery,
  type CertificateItem,
} from "#/components/certificate-gallery";
import { SectionLabel } from "#/components/section-label";
import * as m from "#/paraglide/messages";

import officeIntroImage from "#/assets/images/office_intro.png";
import officeAboveImage from "#/assets/images/office_above.png";
import machiningImage from "#/assets/images/machining_heat_treatment_service.png";
import metalTestingImage from "#/assets/images/metal_testing.png";
import labImage from "#/assets/images/lab.png";
import truckImage from "#/assets/images/spm_truck.png";
import rawMaterialImage from "#/assets/images/raw_material.png";
import machiningProcessImage from "#/assets/images/machining.png";
import heatTreatmentImage from "#/assets/images/heat_treatment.png";
import certificateAichi from "#/assets/images/certificate_aichi_steel.png";
import certificateDeutsche from "#/assets/images/certificate_deutsche_edelstahlwerke.png";
import certificateGroditz from "#/assets/images/certificate_schmiedewerke_groditz.png";
import logoAichi from "#/assets/images/logo_aichi_steel.png";
import logoDeutsche from "#/assets/images/logo_deutsche_edelstahlwerke.png";
import logoGroditz from "#/assets/images/logo_schmiedewerke_groditz.png";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const serviceReasons = [
    {
      title: m.service_workforce_title(),
      body: m.service_workforce_body(),
      icon: UsersRound,
      image: metalTestingImage,
    },
    {
      title: m.service_same_day_title(),
      body: m.service_same_day_body(),
      icon: Truck,
      image: truckImage,
    },
    {
      title: m.service_machining_title(),
      body: m.service_machining_body(),
      icon: Flame,
      image: machiningImage,
    },
    {
      title: m.service_support_title(),
      body: m.service_support_body(),
      icon: Wrench,
      image: labImage,
    },
  ];
  const missionItems = [
    m.profile_mission_1(),
    m.profile_mission_2(),
    m.profile_mission_3(),
    m.profile_mission_4(),
  ];
  const industryItems = [
    m.profile_industry_full_hardening(),
    m.profile_industry_nitriding(),
    m.profile_industry_carburizing(),
    m.profile_industry_flame_hardening(),
    m.profile_industry_induction_hardening(),
    m.profile_industry_stress_relieving(),
  ];
  const processItems = [
    {
      title: m.profile_process_raw_material_title(),
      body: m.profile_process_raw_material_body(),
      image: rawMaterialImage,
    },
    {
      title: m.profile_process_machining_title(),
      body: m.profile_process_machining_body(),
      image: machiningProcessImage,
    },
    {
      title: m.profile_process_heat_treatment_title(),
      body: m.profile_process_heat_treatment_body(),
      image: heatTreatmentImage,
      link: {
        href: "https://www.kanetsutekno.com",
        label: "Kanetsutekno",
        intro: m.profile_process_heat_treatment_link_intro(),
      },
    },
  ];
  const certificates: CertificateItem[] = [
    {
      name: "Aichi Steel",
      logo: logoAichi,
      certificate: certificateAichi,
      meta: "Steel material certificate",
    },
    {
      name: "Deutsche Edelstahlwerke",
      logo: logoDeutsche,
      certificate: certificateDeutsche,
      meta: "Steel material certificate",
    },
    {
      name: "Schmiedewerke Groditz",
      logo: logoGroditz,
      certificate: certificateGroditz,
      meta: "Steel material certificate",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#15171a]">
      <section className="relative overflow-hidden bg-[#15171a] text-white">
        <div className="absolute inset-0">
          <img
            src={officeAboveImage}
            alt=""
            className="h-full w-full object-cover opacity-44"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.96),rgba(21,23,26,0.74),rgba(21,23,26,0.28))]" />
        </div>
        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-5 py-14 lg:px-8 lg:py-18">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#d92932] bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
              <Factory className="h-4 w-4" aria-hidden="true" />
              {m.profile_hero_kicker()}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl">
              {m.profile_hero_title()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {m.profile_hero_body()}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-28">
        <div className="relative min-h-105 overflow-hidden bg-[#283036]">
          <img
            src={officeIntroImage}
            alt="Sinar Putra Metalindo office"
            className="h-full w-full object-cover object-left"
          />
        </div>
        <div className="flex flex-col justify-center">
          <SectionLabel>{m.intro_kicker()}</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
            {m.intro_title()}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#565e66]">
            {m.intro_body()}
          </p>
          <div className="mt-8 grid gap-4">
            {[m.intro_point_1(), m.intro_point_2(), m.intro_point_3()].map(
              (point) => (
                <div
                  key={point}
                  className="flex gap-3 text-base font-semibold text-[#2c3136]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-[#1f7a5a]"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{m.services_kicker()}</SectionLabel>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.services_title()}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceReasons.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden border border-black/10 bg-[#f6f5f1]"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#283036]">
                  <img
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <service.icon
                    className="h-7 w-7 text-[#b4232a]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-xl font-black text-[#15171a]">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5b626b]">
                    {service.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#15171a] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
          <div className="border border-white/14 bg-white/4 p-6 sm:p-8">
            <SectionLabel>{m.profile_vision_kicker()}</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
              {m.profile_vision_title()}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              {m.profile_vision_body()}
            </p>
          </div>
          <div className="border border-white/14 bg-white/4 p-6 sm:p-8">
            <SectionLabel>{m.profile_mission_kicker()}</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
              {m.profile_mission_title()}
            </h2>
            <div className="mt-5 grid gap-3">
              {missionItems.map((mission) => (
                <div
                  key={mission}
                  className="flex gap-3 border border-white/14 bg-[#15171a]/42 p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-[#f4c044]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div>
          <SectionLabel>{m.profile_industry_kicker()}</SectionLabel>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
                {m.profile_industry_title()}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#565e66]">
                {m.profile_industry_body()}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industryItems.map((item) => (
                <div
                  key={item}
                  className="border-l-4 border-[#d92932] bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.04em] text-[#2c3136]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {processItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden border border-black/10 bg-white"
              >
                <div className="bg-[#283036]">
                  <img src={item.image} alt="" className="h-auto w-full" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#15171a]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5b626b]">{item.body}</p>
                  {item.link ? (
                    <p className="mt-4 text-sm font-semibold leading-6 text-[#5b626b]">
                      {item.link.intro}{" "}
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-black text-[#b4232a] underline decoration-[#b4232a]/30 underline-offset-4 transition hover:text-[#15171a]"
                      >
                        {item.link.label}
                      </a>
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CertificateGallery
        kicker={m.profile_certificate_kicker()}
        title={m.profile_certificate_title()}
        body={m.profile_certificate_body()}
        items={certificates}
      />
    </main>
  );
}
