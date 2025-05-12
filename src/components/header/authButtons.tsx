// components/header/AuthButtons.tsx
import Link from "next/link";

interface AuthButtonsProps {
  compact?: boolean;
}

const AuthButtons = ({}: AuthButtonsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-slate-200 hover:bg-slate-700 rounded-lg transition-all duration-300 hover:shadow-sm border border-slate-600 hover:border-slate-500"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 hover:shadow-md border border-slate-600 hover:border-slate-500"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
