import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  LoaderCircle,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

import { SectionLabel } from "#/components/section-label";
import * as m from "#/paraglide/messages";

import header from "#/assets/images/contact_header.png";

export const Route = createFileRoute("/contact")({ component: Contact });

const phoneNumbers = [
  { label: "+62 21 8990 4100", href: "tel:+622189904100" },
  { label: "+62 21 2957 7585", href: "tel:+622129577585" },
  { label: "+62 21 8990 4125", href: "tel:+622189904125" },
  { label: "+62 21 2957 7584", href: "tel:+622129577584" },
  { label: "+62 21 8990 4500", href: "tel:+622189904500" },
  { label: "+62 21 2957 7586", href: "tel:+622129577586" },
  { label: "+62 21 2961 0800", href: "tel:+622129610800" },
  { label: "+62 21 8990 4145", href: "tel:+622189904145" },
  { label: "+62 21 7070 6482", href: "tel:+622170706482" },
];
const mapHref = "https://maps.app.goo.gl/neqibAtZS66LesDX9";
const mapEmbedSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_API_KEY}&q=place_id:ChIJgd2LxDOaaS4Rt5nk-TIDDWo&maptype=satellite&zoom=16`;
type FormStatus = "idle" | "sending" | "success" | "error";

function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      form.querySelector<HTMLElement>(":invalid")?.focus();
      return;
    }

    setFormStatus("sending");
    setFormMessage("");

    const accessKey = import.meta.env.VITE_EMAIL_FORM_KEY;
    if (!accessKey) {
      setFormStatus("error");
      setFormMessage(m.contact_form_missing_key_message());
      return;
    }

    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", m.contact_form_subject());
    formData.append("from_name", m.contact_form_from_name());
    const formPayload = Object.fromEntries(formData);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      const data = await response.json();
      if (response.status === 200 && data.success) {
        setFormStatus("success");
        setFormMessage(m.contact_form_success_message());
        form.reset();
      } else {
        setFormStatus("error");
        setFormMessage(data.message || m.contact_form_error_message());
      }
    } catch {
      setFormStatus("error");
      setFormMessage(m.contact_form_error_message());
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#15171a]">
      <section className="relative overflow-hidden bg-[#15171a] text-white">
        <div className="absolute inset-0">
          <img
            src={header}
            alt=""
            className="h-full w-full object-cover object-left opacity-72"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.72),rgba(21,23,26,0.48),rgba(21,23,26,0.08))]" />
        </div>
        <div className="relative mx-auto flex min-h-[48svh] max-w-7xl items-end px-5 py-12 lg:px-8 lg:py-14">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#d92932] bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-white/85">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              {m.contact_kicker()}
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl">
              {m.contact_title()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              {m.contact_hero_body()}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-sm lg:grid-cols-[0.42fr_0.58fr]">
          <aside className="grid content-start gap-5 p-5 sm:p-8">
            <SectionLabel>{m.contact_visit_title()}</SectionLabel>
            <article className="border border-black/10 bg-[#f6f5f1] p-5">
              <MapPin className="h-7 w-7 text-[#b4232a]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black text-[#15171a]">
                {m.contact_address_label()}
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#565e66]">
                {m.contact_address()}
              </p>
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 border border-black/14 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[#15171a] transition hover:border-[#15171a] hover:bg-[#15171a] hover:text-white"
              >
                {m.contact_map_cta()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>

            <article className="border border-black/10 bg-[#f6f5f1] p-5">
              <Phone className="h-7 w-7 text-[#b4232a]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black text-[#15171a]">
                {m.contact_phone_label()}
              </h2>
              <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="border-b border-black/10 pb-2 text-sm font-black leading-5 text-[#4e5660] transition hover:border-[#d92932]/50 hover:text-[#b4232a]"
                  >
                    {phone.label}
                  </a>
                ))}
              </div>
            </article>
          </aside>
          <iframe
            title={m.contact_map_title()}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-100 w-full border-0 lg:h-full lg:min-h-190"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl bg-[#f6f5f1] p-5 shadow-sm ring-1 ring-black/10 sm:p-8">
            <SectionLabel>{m.contact_form_kicker()}</SectionLabel>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#15171a] sm:text-5xl">
              {m.contact_form_title()}
            </h2>
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black uppercase tracking-[0.06em] text-[#3d4147]">
                  {m.contact_name_label()}
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="min-h-12 border border-black/14 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#15171a] outline-none transition focus:border-[#d92932]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black uppercase tracking-[0.06em] text-[#3d4147]">
                  {m.contact_company_label()}
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="min-h-12 border border-black/14 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#15171a] outline-none transition focus:border-[#d92932]"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-black uppercase tracking-[0.06em] text-[#3d4147]">
                  {m.contact_email_label()}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-h-12 border border-black/14 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#15171a] outline-none transition focus:border-[#d92932]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black uppercase tracking-[0.06em] text-[#3d4147]">
                  {m.contact_phone_input_label()}
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="min-h-12 border border-black/14 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#15171a] outline-none transition focus:border-[#d92932]"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-black uppercase tracking-[0.06em] text-[#3d4147]">
                {m.contact_message_label()}
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="min-h-38 resize-y border border-black/14 bg-white px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#15171a] outline-none transition focus:border-[#d92932]"
                />
              </label>
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#d92932] px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#b4232a] disabled:cursor-not-allowed disabled:bg-[#7b828a] sm:w-fit"
              >
                {formStatus === "sending" ? (
                  <LoaderCircle
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {formStatus === "sending"
                  ? m.contact_form_sending()
                  : m.contact_submit_label()}
              </button>
              {formStatus === "success" || formStatus === "error" ? (
                <div
                  className={`border-l-4 p-4 ${
                    formStatus === "success"
                      ? "border-[#1f7a5a] bg-[#e8f5ee] text-[#174c38]"
                      : "border-[#d92932] bg-[#fbe8e9] text-[#7b1d22]"
                  }`}
                  role={formStatus === "error" ? "alert" : "status"}
                >
                  <p className="text-sm font-black uppercase tracking-[0.08em]">
                    {formStatus === "success"
                      ? m.contact_form_success_title()
                      : m.contact_form_error_title()}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    {formMessage}
                  </p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
