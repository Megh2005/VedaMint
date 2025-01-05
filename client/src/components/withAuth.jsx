"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const walletAddress = sessionStorage.getItem("walletAddress");

      if (!walletAddress) {
        router.replace("/");
      }
    }, [router]);

    const walletAddress = sessionStorage.getItem("walletAddress");
    return walletAddress ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
