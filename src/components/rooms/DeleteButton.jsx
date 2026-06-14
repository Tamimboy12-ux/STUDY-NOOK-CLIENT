"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteButton = ({ id }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setIsOpen(false);
        router.push("/rooms");
        router.refresh();
        toast.success("Delete Successful")

      } else {
        toast.error("Something went wrong while deleting.");
      }

    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setIsOpen(true)}
        className="rounded"
      >
        Delete
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Delete
            </h3>
            
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this room? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;