import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const LatestRooms = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
    cache: "no-store",
  });

  const rooms = await res.json();

  return (
    <div>

      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Study Rooms
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.slice(0, 6).map((room) => (
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
                <h3 className="text-xl font-bold">{room.title}</h3>

                <p>
                  {room.description?.slice(0, 80)}...
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
      </section>
    </div>
  );
};

export default LatestRooms;