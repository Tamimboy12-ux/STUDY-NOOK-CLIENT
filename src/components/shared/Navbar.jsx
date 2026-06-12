"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, Button, Spinner } from "@heroui/react";
// import { signOutUser, useSession } from "@/lib/auth";

const Navbar = () => {
    // const { data, isPending } = useSession();

    // const user = data?.user;
    // // console.log(user)

    // const handleLogout = async () => {
    //     await signOutUser();
    //     window.location.reload();
    // };

    return (

    <nav className="bg-[#0F172A] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-400" >
            StudyNook
        </Link>

        <div className="flex gap-4 items-center">
        <Link href="/">
            Home
        </Link>

        <Link href="/rooms">
            Rooms
        </Link>

        {/* {
          user && (
            <>
            <Link href="/add-room">
                Add Room
            </Link>
            
            <Link href="/my-listings">
                My Listings
            </Link>
            
            <Link href="/my-bookings">
                My Bookings
            </Link>
            </>
          )
        }
        </div>

        <div>
        {
        isPending ?
        
        (
        <div className="flex flex-col items-center gap-2">
            <Spinner color="success" />
            <span className="text-xs text-muted">Loading</span>
      </div>
        )

        :
        user ?
        (
        <div className="flex items-center gap-3">
            <Avatar>
            <Image
             src={user?.image}
             alt="profile"
             width={700}
             height={400}
            //  priority
             className="rounded-full"
            />
            </Avatar>
        <p>
            {user?.name}
        </p>
        
        <Button variant="danger" onClick={handleLogout} > 
            Logout
        </Button>
        </div>
        )
        : */}
        {/* (    */}
        <div className="flex gap-3">  
        <Link href="/login">   
            <Button variant="bordered">
                Login
            </Button>     
        </Link>
        <Link href="/register">   
            <Button color="primary">  
                Register
            </Button>    
        </Link>  
        </div>
        {/* )
        } */}
        </div>
       </div>
      </nav>
    );
  };

export default Navbar;