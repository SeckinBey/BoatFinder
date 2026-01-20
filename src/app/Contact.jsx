import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useSEO } from "../hooks/useSEO.js";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Contact() {
  useSEO({
    title: "Bize Ulaşın - TripFinder",
    description:
      "TripFinder ile iletişime geçin. Antalya Teknokent'te bulunan ofisimizi ziyaret edin veya telefon ve e-posta ile bize ulaşın.",
    keywords: "iletişim, bize ulaşın, antalya teknokent, tripfinder iletişim",
    url: "/contact",
  });

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: "Adres",
      content: "Antalya Teknokent",
      details: "Weblikya Web Tasarım & Yazılım",
    },
    {
      icon: PhoneIcon,
      title: "Telefon",
      content: "+90 542 720 41 10",
      details: "Pazartesi - Cumartesi: 09:00 - 18:00",
    },
    {
      icon: EnvelopeIcon,
      title: "E-posta",
      content: "info@tripfinder.com",
      details: "7/24 e-posta desteği",
    },
    {
      icon: ClockIcon,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cumartesi",
      details: "09:00 - 18:00",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="bg-gray-50 min-h-screen pb-24 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Bize Ulaşın
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Sorularınız, önerileriniz veya rezervasyon talepleriniz için
              bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Contact Information */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                  İletişim Bilgileri
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-base text-gray-700">
                            {item.content}
                          </p>
                          {item.details && (
                            <p className="mt-1 text-sm text-gray-500">
                              {item.details}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Info */}
                <div className="mt-8 rounded-xl bg-indigo-50 p-6">
                  <h3 className="text-lg font-semibold text-indigo-900">
                    WhatsApp ile Hızlı İletişim
                  </h3>
                  <p className="mt-2 text-sm text-indigo-700">
                    Rezervasyon ve bilgi talepleriniz için WhatsApp üzerinden
                    bize ulaşabilirsiniz.
                  </p>
                  <a
                    href={`https://wa.me/905427204110`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp ile İletişime Geç
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Google Maps */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Konumumuz
              </h2>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.600788090408!2d30.64375457652519!3d36.89989746207225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39107014e51b7%3A0xa8d2de108c6ef2f5!2sWeblikya%20Web%20Tasar%C4%B1m%20%26%20Yaz%C4%B1l%C4%B1m%20-%20Antalya%20Teknokent!5e0!3m2!1str!2str!4v1768907257031!5m2!1str!2str"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Antalya Teknokent Konum Haritası"
                />
              </div>
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  <strong className="font-semibold text-gray-900">
                    Antalya Teknokent
                  </strong>
                  <br />
                  Weblikya Web Tasarım & Yazılım ofisimizi ziyaret edebilir,
                  rezervasyon ve bilgi talepleriniz için bizimle iletişime
                  geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

