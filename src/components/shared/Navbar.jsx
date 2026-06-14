"use client";

import Link from "next/link";
import { Avatar, Button, Spinner } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data, isPending } = useSession();

  const user = data?.user;

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout Success")
    
  };

  return (
    <nav className="bg-[#0F172A] text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-400">
          StudyNook
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/">Home</Link>

          <Link href="/rooms">Rooms</Link>

          {user && (
            <>
              <Link href="/add-room">Add Room</Link>

              <Link href="/my-listings">My Listings</Link>

              <Link href="/my-bookings">My Bookings</Link>
            </>
          )}
        </div>

        <div>
          {isPending ? (
            <div className="flex flex-col items-center gap-2">
              <Spinner color="success" />
              <span className="text-xs">Loading...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.image || undefined}
                name={user?.name}
                size="sm"
              />

              <p>{user?.name}</p>

              <Button variant="danger" onPress={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="bordered">Login</Button>
              </Link>

              <Link href="/register">
                <Button color="primary">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;