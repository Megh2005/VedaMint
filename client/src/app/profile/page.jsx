"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import withAuth from "@/components/withAuth";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const fetchProfile = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setWalletAddress(sessionStorage.getItem("walletAddress"));
    fetchProfile(token);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-gradient">
        Profile
      </h1>
      <div className="mt-8 gap-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        {loading && (
          <LoaderCircle className="text-white text-center" size={24} />
        )}
        {user && (
          <div className="flex flex-col items-center gap-4">
            <div className="overflow-hidden size-[100px]">
              <Image
                src={user.avatar}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-full bg-cover size-[100px]"
              />
            </div>
            <div>
              <p className="text-lg text-purple-400">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-lg text-white">
                <span className="font-bold text-purple-400">
                  Wallet Address:
                </span>{" "}
                {walletAddress}
              </p>
              <p className="text-lg text-white">
                <span className="font-bold text-purple-400">Email:</span>{" "}
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Profile);
