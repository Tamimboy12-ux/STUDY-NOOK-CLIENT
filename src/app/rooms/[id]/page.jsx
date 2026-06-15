import BookingForm from "@/components/rooms/BookingForm";
import DeleteButton from "@/components/rooms/DeleteButton";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const RoomDetailsPage = async ({ params }) => {

    const {id} = await params;

  const res = await fetch(
    `http://localhost:5000/api/rooms/${id}`,
    {
      cache: "no-store",
    }
  );

  const room = await res.json();

  return (
    <div className="max-w-5xl mx-auto py-10">

      <Image
        src={room.image}
        alt={room.title}
        width={1000}
        height={500}
        className="w-full h-112 object-cover rounded-xl"
      />

      <div className="mt-6 space-y-3">

        <h1 className="text-4xl font-bold">
          {room.title}
        </h1>

        <p>{room.description}</p>

        <p>
          <span className="font-semibold">
            Floor:
          </span>{" "}
          {room.floor}
        </p>

        <p>
          <span className="font-semibold">
            Capacity:
          </span>{" "}
          {room.capacity}
        </p>

        <p>
          <span className="font-semibold">
            Hourly Rate:
          </span>{" "}
          ${room.hourlyRate}
        </p>

        <p>
          <span className="font-semibold">
            Booking Count:
          </span>{" "}
          {room.bookingCount}
        </p>

        <div className="flex gap-2 flex-wrap">
          {room.amenities?.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-5">

          <Link href={`/rooms/update/${room._id}`}>
            <Button variant="secondary" className="rounded">
              Update
            </Button>
          </Link>

          <DeleteButton id={room._id}></DeleteButton>

          <BookingForm room={room} />

        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;