"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

const MyListingsPage = () => {
  const { data } = useSession();

  const user = data?.user;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:5000/api/my-listings/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setRooms(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/rooms/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {
      setRooms(
        rooms.filter((room) => room._id !== id)
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Listings
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
      {
        rooms.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <h2 className="text-2xl font-semibold">
                No Rooms Found
              </h2>
              <p className="text-gray-500 mt-2">
                You have not added any study room yet.
              </p>
            </div>
        ) : (
            rooms.map((room) => (
              <div
                key={room._id}
                className="border rounded-lg overflow-hidden"
              >
                <Image
                  src={room.image}
                  alt={room.title}
                  width={500}
                  height={300}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-xl">
                    {room.title}
                  </h2>
            
                  <p>${room.hourlyRate}/hr</p>
            
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/rooms/update/${room._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </Link>
            
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default MyListingsPage;