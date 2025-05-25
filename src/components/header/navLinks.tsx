// components/header/NavLinks.tsx
import Link from "next/link";

interface NavLinksProps {
  mobile?: boolean;
}

const NavLinks = ({ mobile = false }: NavLinksProps) => {
  const links = [
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={
        mobile
          ? "flex flex-col space-y-2"
          : "hidden md:flex items-center space-x-6"
      }
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium transition-colors ${
            mobile
              ? "px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-yellow-600"
              : "text-gray-700 hover:text-yellow-600 relative group"
          }`}
        >
          {!mobile && (
            <>
              <span className="relative">
                {link.label}
                <span className="absolute inset-0 bg-yellow-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300" />
            </>
          )}
          {mobile && link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
