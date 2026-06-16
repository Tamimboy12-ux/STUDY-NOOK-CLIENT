"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";

const JwtProvider = () => {
  const { data } = useSession();

  useEffect(() => {
    if (data?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt`, {
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