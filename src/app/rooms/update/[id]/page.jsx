"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState({
    title: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    "WiFi",
    "Projector",
    "Whiteboard",
    "AC",
    "Power Outlet",
    "Quiet Zone",
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRoom({
            title: data.title || "",
            description: data.description || "",
            image: data.image || "",
            floor: data.floor || "",
            capacity: data.capacity || "",
            hourlyRate: data.hourlyRate || "",
            amenities: data.amenities || [],
          });
        }
      })
      .catch((err) => console.error("Error fetching room data:", err));
  }, [id]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (item) => {
    setRoom((prev) => {
      const currentAmenities = prev.amenities || [];
      if (currentAmenities.includes(item)) {
        return {
          ...prev,
          amenities: currentAmenities.filter((a) => a !== item),
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, item],
        };
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedRoom = {
      title: room.title,
      description: room.description,
      image: room.image,
      floor: room.floor,
      capacity: Number(room.capacity),
      hourlyRate: Number(room.hourlyRate),
      amenities: room.amenities,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoom),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || res.ok) {
        toast.success("Room Updated Successfully");
        router.push("/rooms");
        router.refresh();
      } else {
        toast.error("No changes made or failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Update Room</h1>

        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Room Title</label>
            <input
              name="title"
              value={room.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={room.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Image URL</label>
            <input
              name="image"
              value={room.image}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Floor</label>
            <input
              name="floor"
              value={room.floor}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Capacity</label>
            <input
              name="capacity"
              type="number"
              value={room.capacity}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Hourly Rate</label>
            <input
              name="hourlyRate"
              type="number"
              value={room.hourlyRate}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <p className="font-semibold mb-1 text-sm text-gray-700">Amenities</p>
            <div className="grid grid-cols-2 gap-2 border p-3 rounded bg-gray-50">
              {amenitiesList.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={room.amenities ? room.amenities.includes(item) : false}
                    onChange={() => handleAmenityChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <Button
            variant="secondary"
            type="submit"
            disabled={loading}
            className="w-full rounded"
          > 
            {loading ? "Updating..." : "Update Room"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomPage;