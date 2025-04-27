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
        href: "mailto:info@bookeasesalon.com",
        label: "Email: info@bookeasesalon.com",
      },
      { href: "#", label: "123 Beauty Street" },
      { href: "#", label: "City, ST 12345" },
    ],
  },
  {
    title: "Opening Hours",
    links: [
      { href: "#", label: "Monday - Friday: 9am - 8pm" },
      { href: "#", label: "Saturday: 9am - 6pm" },
      { href: "#", label: "Sunday: 10am - 4pm" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              BookEase Salon
            </h3>
            <p className="mb-4">
              Your premier destination for beauty and relaxation in the heart of
              the city.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white text-lg font-semibold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p>
            © {new Date().getFullYear()} BookEase Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
