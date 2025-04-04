import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-teal-50">
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Branding Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-teal-800">BookEase</h1>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
            Simplify Your Bookings
          </h2>
          <p className="text-lg text-neutral-600 mb-10">
            Manage all your appointments in one place with our intuitive booking
            system
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Get Started - It's Free
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-white text-teal-700 border border-teal-300 hover:border-teal-500 rounded-lg font-medium transition-all"
            >
              Existing User? Login
            </Link>
          </div>
        </div>

        {/* Hero Image (Add your own image) */}
        {/* <div className="mt-16 w-full max-w-3xl">
          <div className="relative aspect-video bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200">
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              Booking System Preview
            </div>
          </div>
        </div> */}
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} BookEase. All rights reserved.
      </footer>
    </div>
  );
}
