// app/rooms/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getRoomById } from "@/src/lib/api/rooms";
import Footer from "@/src/components/footer/footer";
import RoomHero from "@/src/components/roomsPage/roomHero";
import RoomHeader from "@/src/components/roomsPage/roomHeader";
import RoomDetails from "@/src/components/roomsPage/roomDetails";
import BookingSidebar from "@/src/components/roomsPage/bookingSidebar";

import { Room } from "@/src/lib/types/booking";
export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(params.id);
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <>
      <RoomHero room={room} />

      <main>
        <div className="container mx-auto px-4 max-w-6xl">
          <RoomHeader room={room} />

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <RoomDetails room={room} />
            </div>

            <div className="md:col-span-1">
              <BookingSidebar room={room} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
