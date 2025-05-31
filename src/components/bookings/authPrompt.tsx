"use client";

import { useRouter } from "next/navigation";

export default function AuthPrompt({
  existingUser,
  email,
  onContinueAsGuest,
  onAuthSuccess, // Add this prop
  onClose,
}: {
  existingUser: boolean;
  email: string;
  onContinueAsGuest: () => void;
  onAuthSuccess: () => void; // Add this prop
  onClose: () => void;
}) {
  const router = useRouter();

  const handleAuthAction = () => {
    if (existingUser) {
      router.push(
        `/login?email=${encodeURIComponent(email)}&redirect=/booking-success`
      );
    } else {
      router.push(
        `/signup?email=${encodeURIComponent(email)}&redirect=/booking-success`
      );
    }
    // Call onAuthSuccess immediately (or after successful auth if you can detect it)
    onAuthSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center">
          <h4 className="font-medium mb-2">
            {existingUser ? "Account found!" : "Secure your booking"}
          </h4>
          <p className="text-sm mb-3">
            {existingUser
              ? "Login to manage all bookings"
              : "Create an account to view/modify bookings later"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAuthAction}
              className="px-4 py-2 bg-slate-800 text-white rounded"
            >
              {existingUser ? "Login" : "Sign Up"}
            </button>
            <button
              onClick={onContinueAsGuest}
              className="px-4 py-2 border border-slate-300 rounded"
            >
              Continue as Guest
            </button>
          </div>
          <button onClick={onClose} className="mt-4 text-sm text-slate-500">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
