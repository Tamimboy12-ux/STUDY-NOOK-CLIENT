"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
  const { data } = useSession();
  const user = data?.user;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  if (user?.email) {
    fetch(`http://localhost:5000/api/bookings/${user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setBookings(data);
        } else if (data && Array.isArray(data.data)) {
          setBookings(data.data); 
        } else {
          setBookings([]);
        }
      })
      .catch((err) => console.error(err));
  }
}, [user]);

  const handleCancel = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/cancel/${id}`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Booking Cancelled");

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking
        )
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {Array.isArray(bookings) && bookings.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Bookings Found</h2>
          <p className="text-gray-500 mt-2">
            You have not booked any room yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl overflow-hidden"
            >
              {booking.roomImage && (
                <Image
                  src={booking.roomImage}
                  alt={booking.roomTitle || "Room Image"}
                  width={500}
                  height={300}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-bold">{booking.roomTitle}</h2>
                <p>Date: {booking.date}</p>
                <p>
                  Time: {booking.startTime}:00 - {booking.endTime}:00
                </p>
                <p>Total Cost: ${booking.totalCost}</p>

                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      booking.status === "confirmed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;