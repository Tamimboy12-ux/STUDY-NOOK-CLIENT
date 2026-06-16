"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BookingForm = ({ room }) => {
  const { data } = useSession();
  const router = useRouter();

  const user = data?.user;

  const [showForm, setShowForm] = useState(false);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const totalCost =
    startTime && endTime
      ? (Number(endTime) - Number(startTime)) *
        room.hourlyRate
      : 0;

  const handleBooking = async () => {
    const bookingData = {
      roomId: room._id,
      roomTitle: room.title,
      roomImage: room.image,

      userEmail: user?.email,
      userName: user?.name,

      date,
      startTime,
      endTime,
      note,
      totalCost,
    };

    const res = await fetch(
      "http://localhost:5000/api/bookings",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Room booked successfully");
      setShowForm(false);
      router.push("/my-bookings")
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>

     {user ? (
        <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Book Now
      </Button>
     ) : (
        <Link href="/login">
        <Button variant="primary" className="rounded">
           Login to Book
        </Button>
        </Link>
     )}

      {
        showForm && (
          <div className="border p-5 rounded-lg mt-4">

            <h2 className="text-2xl font-bold mb-4">
              Book This Room
            </h2>

            <input
              type="date"
              className="border p-2 w-full mb-3"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

            <select
              className="border p-2 w-full mb-3"
              value={startTime}
              onChange={(e) =>
                setStartTime(e.target.value)
              }
            >
              <option value="">
                Select Start Time
              </option>

              {Array.from(
                { length: 13 },
                (_, i) => (
                  <option
                    key={i}
                    value={i + 8}
                  >
                    {i + 8}:00
                  </option>
                )
              )}
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={endTime}
              onChange={(e) =>
                setEndTime(e.target.value)
              }
            >
              <option value="">
                Select End Time
              </option>

              {Array.from(
                { length: 13 },
                (_, i) => (
                  <option
                    key={i}
                    value={i + 9}
                  >
                    {i + 9}:00
                  </option>
                )
              )}
            </select>

            <textarea
              placeholder="Special Note"
              className="border p-2 w-full mb-3"
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />

            <p className="font-bold mb-4">
              Total Cost: ${totalCost}
            </p>

            <Button
              variant="primary"
              onClick={handleBooking}
              className="rounded"
            >
              Confirm Booking
            </Button>

          </div>
        )
      }

    </div>
  );
};

export default BookingForm;