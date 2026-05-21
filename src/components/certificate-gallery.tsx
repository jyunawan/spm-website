import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { SectionLabel } from "#/components/section-label";

export type CertificateItem = {
  name: string;
  logo: string;
  certificate: string;
  meta: string;
};

type CertificateGalleryProps = {
  kicker: string;
  title: string;
  body: string;
  items: CertificateItem[];
};

export function CertificateGallery({
  kicker,
  title,
  body,
  items,
}: CertificateGalleryProps) {
  const [activeCertificate, setActiveCertificate] =
    useState<CertificateItem | null>(null);

  useEffect(() => {
    if (!activeCertificate) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCertificate(null);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeCertificate]);

  return (
    <>
      <section className="bg-[#15171a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{kicker}</SectionLabel>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">{body}</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.name}
                className="overflow-hidden border border-white/14 bg-white/6"
              >
                <div className="flex min-h-32 flex-col justify-between gap-5 border-b border-white/14 bg-white p-6">
                  <div className="flex h-14 items-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-14 w-auto max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#15171a]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.08em] text-[#b4232a]">
                      {item.meta}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCertificate(item)}
                  className="group flex min-h-86 w-full items-center p-4 text-left"
                  aria-label={`View ${item.name} certificate`}
                >
                  <img
                    src={item.certificate}
                    alt={`${item.name} certificate`}
                    className="h-auto w-full border border-white/14 bg-white shadow-2xl transition duration-300 group-hover:scale-[1.015] group-hover:border-white/36"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeCertificate ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#15171a]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCertificate.name} certificate`}
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative max-h-[92svh] w-full max-w-5xl overflow-auto bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.08em] text-[#b4232a]">
                  {activeCertificate.meta}
                </p>
                <h3 className="mt-1 text-2xl font-black text-[#15171a]">
                  {activeCertificate.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCertificate(null)}
                className="inline-flex h-11 w-11 items-center justify-center border border-black/10 text-[#15171a] transition hover:bg-[#15171a] hover:text-white"
                aria-label="Close certificate preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <img
              src={activeCertificate.certificate}
              alt={`${activeCertificate.name} certificate`}
              className="mx-auto h-auto max-h-[76svh] w-auto max-w-full"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
