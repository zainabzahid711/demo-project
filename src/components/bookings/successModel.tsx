"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/auth-context";

interface SuccessModalProps {
  onClose: () => void;
  email: string; // We'll get isGuest from auth context now
}

export default function SuccessModal({ onClose, email }: SuccessModalProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSignupRedirect = () => {
    router.push(`/signup?email=${encodeURIComponent(email)}`);
  };

  if (loading) return null; // Or a loading spinner

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="mb-4">Check your email for details.</p>

          {!user && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm mb-2">Want to manage bookings easily?</p>
              <button
                onClick={handleSignupRedirect}
                className="text-sm text-blue-600 font-medium"
              >
                Create an account
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
