"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

const JwtProvider = () => {
  const { data } = useSession();

  useEffect(() => {
    if (data?.user?.email) {
      fetch("http://localhost:5000/jwt", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.user.email,
        }),
      });
    }
  }, [data]);

  return null;
};

export default JwtProvider;