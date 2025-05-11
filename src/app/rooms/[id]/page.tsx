// app/rooms/[id]/page.tsx
import { getRoomById } from "@/src/lib/api/rooms";
import Footer from "@/src/components/footer/footer";
import RoomHero from "@/src/components/roomsPage/roomHero";
import RoomHeader from "@/src/components/roomsPage/roomHeader";
import RoomDetails from "@/src/components/roomsPage/roomDetails";
import BookingSidebar from "@/src/components/roomsPage/bookingSidebar";

export default async function RoomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await getRoomById(params.id);

  return (
    <>
      <RoomHero room={room} />

      <main className="bg-white">
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
