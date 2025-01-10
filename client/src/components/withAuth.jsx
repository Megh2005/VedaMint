"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
      }
    }, [router]);

    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
