// components/header/NavLinks.tsx
import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {[
        { href: "/services", label: "Services" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-neutral-600 hover:text-teal-700 transition-colors duration-300 relative group"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-700 group-hover:w-full transition-all duration-300" />
        </Link>
      ))}
    </nav>
  );
}
