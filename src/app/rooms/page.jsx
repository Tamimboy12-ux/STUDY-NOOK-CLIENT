import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const RoomsPage = async () => {
  const res = await fetch("http://localhost:5000/api/rooms", {
    cache: "no-store",
  });

  const rooms = await res.json();

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        All Study Rooms
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-xl overflow-hidden shadow"
          >
            <Image
              src={room.image}
              alt={room.title}
              width={500}
              height={300}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">
                {room.title}
              </h2>

              <p>
                {room.description?.slice(0, 100)}...
              </p>

              <p>Floor: {room.floor}</p>
              <p>Capacity: {room.capacity}</p>

              <p className="font-semibold">
                ${room.hourlyRate}/hr
              </p>

              <Link href={`/rooms/${room._id}`}>
                <Button className="mt-3 rounded-md">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;