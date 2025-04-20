"use client";
import { FiCalendar, FiUser, FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function QuickActionButton({
  icon,
  title,
  description,
  onClick,
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-sm transition-all flex items-center gap-3 w-full text-left"
      aria-label={title}
    >
      <div className="bg-teal-100 p-2 rounded-full" aria-hidden="true">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}

export default function QuickActionsSection() {
  const router = useRouter();

  return (
    <section aria-labelledby="quick-actions-heading">
      <h3
        id="quick-actions-heading"
        className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6"
      >
        <FiUser className="text-teal-600" aria-hidden="true" />
        <span>Quick Actions</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickActionButton
          icon={<FiCalendar className="text-teal-600" />}
          title="My Appointments"
          description="View your bookings"
          onClick={() => router.push("/dashboard/appointments")}
        />
        <QuickActionButton
          icon={<FiHome className="text-teal-600" />}
          title="Salon Information"
          description="View salon details"
          onClick={() => router.push("/dashboard/salon")}
        />
      </div>
    </section>
  );
}
