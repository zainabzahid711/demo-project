"use client";

export default function WelcomeSection() {
  return (
    <section
      className="mb-10 animate-fade-in"
      aria-labelledby="welcome-heading"
    >
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
        <h2
          id="welcome-heading"
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          Welcome Back!
        </h2>
        <p className="text-gray-600">
          Ready for your next appointment? Browse our services below.
        </p>
      </div>
    </section>
  );
}
