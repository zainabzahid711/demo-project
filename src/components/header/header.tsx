// components/Header/Header.tsx
import Link from "next/link";
import NavLinks from "./navLinks";
import AuthButtons from "./authButtons";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-xl font-bold text-teal-800">BookEase Salon</h1>
        </Link>

        <NavLinks />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
