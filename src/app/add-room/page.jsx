"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddRoomPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amenitiesList = [
    "WiFi",
    "Projector",
    "Whiteboard",
    "AC",
    "Power Outlet",
    "Quiet Zone",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (item) => {
    setForm((prev) => {
      if (prev.amenities.includes(item)) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== item),
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, item],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
          hourlyRate: Number(form.hourlyRate),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      toast.success("Add-Room Success")

      router.push("/rooms");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Study Room</h1>

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="title"
            placeholder="Room Title"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="floor"
            placeholder="Floor (e.g. 3rd Floor)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="hourlyRate"
            type="number"
            placeholder="Hourly Rate"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <div>
            <p className="font-semibold mb-1">Amenities</p>

            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(item)}
                    onChange={() => handleAmenityChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
}