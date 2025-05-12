// components/header/NavLinks.tsx
import Link from "next/link";

interface NavLinksProps {
  compact?: boolean;
}

const NavLinks = ({}: NavLinksProps) => {
  return (
    <nav className={`hidden md:flex items-center gap-6`}>
      {[
        { href: "/services", label: "Services" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-slate-300 relative group transition-all duration-300"
        >
          <span className="relative">
            {link.label}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-300" />
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
