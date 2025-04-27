// components/header/AuthButtons.tsx
import Link from "next/link";

interface AuthButtonsProps {
  compact?: boolean;
}

const AuthButtons = ({ compact }: AuthButtonsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-300 hover:shadow-sm"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-all duration-300 hover:shadow-md"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
