// components/footer/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { href: "/services", label: "Services" },
      { href: "/gallery", label: "Gallery" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { href: "tel:1234567890", label: "Phone: (123) 456-7890" },
      {
        href: "mailto:info@luxurystay.com",
        label: "Email: info@luxurystay.com",
      },
      { href: "#", label: "123 Grand Avenue" },
      { href: "#", label: "City, ST 12345" },
    ],
  },
  {
    title: "Opening Hours",
    links: [
      { href: "#", label: "Monday - Sunday: 24/7" },
      { href: "#", label: "Concierge: Always Available" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-xl font-serif font-semibold mb-6">
              AzureStay
            </h3>
            <p className="mb-6 text-slate-400">
              Experience unparalleled luxury in the heart of the city.
            </p>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white text-lg font-semibold mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-amber-400">AzureStay</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
