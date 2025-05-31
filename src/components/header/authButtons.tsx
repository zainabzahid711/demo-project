// components/header/AuthButtons.tsx
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-3">
      <Link
        href="/login"
        className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-yellow-500 hover:bg-gray-50 transition-colors"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-sm transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
