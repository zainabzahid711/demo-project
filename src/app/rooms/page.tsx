"use client";
import { useEffect, useState } from "react";
import { getRooms } from "@/src/lib/api/rooms";
import RoomCard from "@/src/components/roomsPage/roomCard";
import { Room } from "@/src/lib/types/booking";
import LoadingSpinner from "@/src/components/ui/loadingSpinner"; // Import your spinner component
import Footer from "@/src/components/footer/footer";
import Header from "@/src/components/header/header";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl text-red-600 mb-4">Failed to load rooms</h2>
          <p className="mb-4">{error}</p>
          <p>Please check:</p>
          <ul className="list-disc inline-block text-left mb-4">
            <li>Is Strapi server running?</li>
            <li>Check browser console for CORS errors</li>
            <li>Verify API URL in .env file</li>
          </ul>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-800 mb-3">
              Our Collection
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {rooms.length} unique spaces tailored for your comfort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} variant="listing" />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
