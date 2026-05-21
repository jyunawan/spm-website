import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Gauge,
  Microscope,
  Ruler,
  Settings2,
  ShieldCheck,
  ThermometerSun,
  Wrench,
  X,
} from "lucide-react";

import { SectionLabel } from "#/components/section-label";
import * as m from "#/paraglide/messages";
import { localizeHref } from "#/paraglide/runtime";

import caliperImage from "#/assets/images/caliper.png";
import foundry from "#/assets/images/foundry.png";
import hardnessTesterImage from "#/assets/images/hardness_tester.png";
import graniteTableImage from "#/assets/images/granite_table.png";
import spectrometerImage from "#/assets/images/spectrometer.png";
import cuttingMachineImage from "#/assets/images/cutting_machine.png";
import cncGasCuttingMachineImage from "#/assets/images/cnc_gas_cutting_machine.png";
import vacuumHeatTreatmentMachineImage from "#/assets/images/vacuum_heat_treatment_machine.png";
import labImageOne from "#/assets/images/lab_1.png";
import labImageTwo from "#/assets/images/lab_2.png";
import labImageThree from "#/assets/images/lab_3.png";
import labCertificateImage from "#/assets/images/lab_certificate.png";
import trainingImageOne from "#/assets/images/training_1.png";
import trainingImageTwo from "#/assets/images/training_2.png";
import trainingImageThree from "#/assets/images/training_3.png";

export const Route = createFileRoute("/services")({ component: Services });

function Services() {
  const [isLabCertificateOpen, setIsLabCertificateOpen] = useState(false);
  const servicePillars = [
    {
      title: m.services_cutting_title(),
      body: m.services_cutting_body(),
      icon: Factory,
      image: cuttingMachineImage,
    },
    {
      title: m.services_machining_title(),
      body: m.services_machining_body(),
      icon: Wrench,
      image: cncGasCuttingMachineImage,
    },
    {
      title: m.services_heat_title(),
      body: m.services_heat_body(),
      icon: ThermometerSun,
      image: vacuumHeatTreatmentMachineImage,
    },
  ];
  const measurementTools = [
    {
      title: m.services_tool_caliper_title(),
      body: m.services_tool_caliper_body(),
      icon: Ruler,
      image: caliperImage,
    },
    {
      title: m.services_tool_hardness_title(),
      body: m.services_tool_hardness_body(),
      icon: Gauge,
      image: hardnessTesterImage,
    },
    {
      title: m.services_tool_granite_title(),
      body: m.services_tool_granite_body(),
      icon: Settings2,
      image: graniteTableImage,
    },
    {
      title: m.services_tool_spectrometer_title(),
      body: m.services_tool_spectrometer_body(),
      icon: Microscope,
      image: spectrometerImage,
    },
  ];
  const supportItems = [
    m.services_support_point_1(),
    m.services_support_point_2(),
    m.services_support_point_3(),
  ];
  const labImages = [
    { src: labImageOne, alt: m.services_lab_image_1_alt() },
    { src: labImageTwo, alt: m.services_lab_image_2_alt() },
    { src: labImageThree, alt: m.services_lab_image_3_alt() },
  ];
  const trainingImages = [
    { src: trainingImageOne, alt: m.services_training_image_1_alt() },
    { src: trainingImageTwo, alt: m.services_training_image_2_alt() },
    { src: trainingImageThree, alt: m.services_training_image_3_alt() },
  ];

  useEffect(() => {
    if (!isLabCertificateOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLabCertificateOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isLabCertificateOpen]);

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#15171a]">
      <section className="relative overflow-hidden bg-[#15171a] text-white">
        <div className="absolute inset-0">
          <img
            src={foundry}
            alt=""
            className="h-full w-full object-cover opacity-46"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.96),rgba(21,23,26,0.76),rgba(21,23,26,0.26))]" />
        </div>
        <div className="relative mx-auto flex min-h-[62svh] max-w-7xl items-end px-5 py-14 lg:px-8 lg:py-18">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#d92932] bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              {m.services_hero_kicker()}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl">
              {m.services_hero_title()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {m.services_hero_body()}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>{m.services_overview_kicker()}</SectionLabel>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
                {m.services_overview_title()}
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {servicePillars.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden border border-black/10 bg-[#f6f5f1]"
              >
                <div className="aspect-3/2 overflow-hidden bg-[#283036]">
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
                  <h3 className="mt-5 text-2xl font-black text-[#15171a]">
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

      <section className="bg-[#15171a] py-20 text-white lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <SectionLabel>{m.services_support_kicker()}</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              {m.services_support_title()}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              {m.services_support_body()}
            </p>
            <div className="mt-8 grid gap-3">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border border-white/14 bg-white/4 p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-[#f4c044]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold leading-6 text-white/76">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden bg-[#283036] sm:row-span-2">
              <img
                src={labImages[0].src}
                alt={labImages[0].alt}
                className="h-full min-h-80 w-full object-cover"
              />
            </div>
            {labImages.slice(1).map((image) => (
              <div key={image.src} className="overflow-hidden bg-[#283036]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full min-h-44 w-full object-cover"
                />
              </div>
            ))}
            <article className="overflow-hidden border border-white/14 bg-white/6 sm:col-span-2">
              <button
                type="button"
                onClick={() => setIsLabCertificateOpen(true)}
                className="group block w-full bg-[#edf0f1] p-4 text-left"
                aria-label={m.services_lab_certificate_view_label()}
              >
                <img
                  src={labCertificateImage}
                  alt={m.services_lab_certificate_alt()}
                  className="mx-auto h-auto max-h-80 w-auto max-w-full border border-white/14 bg-white shadow-2xl transition duration-300 group-hover:scale-[1.015] group-hover:border-white/36"
                />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel>{m.services_tools_kicker()}</SectionLabel>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
            {m.services_tools_title()}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#565e66]">
            {m.services_tools_body()}
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {measurementTools.map((tool) => (
            <article
              key={tool.title}
              className="grid overflow-hidden border border-black/10 bg-white sm:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex min-h-56 items-center justify-center bg-[#edf0f1] p-5">
                <img
                  src={tool.image}
                  alt=""
                  className="max-h-64 w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <tool.icon
                  className="h-7 w-7 text-[#b4232a]"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-2xl font-black text-[#15171a]">
                  {tool.title}
                </h3>
                <p className="mt-3 leading-7 text-[#5b626b]">{tool.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{m.services_training_kicker()}</SectionLabel>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.services_training_title()}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#565e66]">
              {m.services_training_body()}
            </p>
          </div>
          <div className="mt-8 border border-black/10 bg-[#f6f5f1] p-4 shadow-sm sm:p-5">
            <div className="grid gap-4 md:grid-cols-3">
              {trainingImages.map((image) => (
                <div
                  key={image.src}
                  className="overflow-hidden border border-black/10 bg-white p-2"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-4/3 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-start">
            <a
              href={localizeHref("/contact")}
              className="inline-flex items-center justify-center gap-2 bg-[#15171a] px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#2c3136]"
            >
              {m.services_contact_cta()}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {isLabCertificateOpen ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#15171a]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={m.services_lab_certificate_title()}
          onClick={() => setIsLabCertificateOpen(false)}
        >
          <div
            className="relative max-h-[92svh] w-full max-w-5xl overflow-auto bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.08em] text-[#b4232a]">
                  {m.services_support_kicker()}
                </p>
                <h3 className="mt-1 text-2xl font-black text-[#15171a]">
                  {m.services_lab_certificate_title()}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLabCertificateOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 text-[#15171a] transition hover:bg-[#15171a] hover:text-white"
                aria-label={m.services_lab_certificate_close_label()}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <img
              src={labCertificateImage}
              alt={m.services_lab_certificate_alt()}
              className="mx-auto h-auto max-h-[76svh] w-auto max-w-full"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
