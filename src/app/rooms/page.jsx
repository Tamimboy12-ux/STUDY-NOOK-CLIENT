import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


export const metadata = {
  title: "StudyNook - Available Rooms",
  description:
    "Find and book private study rooms in libraries. List your own rooms and manage bookings easily.",
};


const RoomsPage = async ({ searchParams }) => {

  const params = await searchParams;

  const search = params?.search || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?search=${search}`,
    {
      cache: "no-store",
    }
  );

  const rooms = await res.json();

  return (
    <div className="w-11/12 mx-auto py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        All Study Rooms
      </h1>

      <form className="flex justify-center mb-8">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search room..."
          className="border px-4 py-2 rounded-l-md w-80"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>

      {rooms.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            No Rooms Found
          </h2>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default RoomsPage;