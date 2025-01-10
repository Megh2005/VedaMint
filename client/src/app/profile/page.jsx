"use client";

import { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { WalletContext } from "@/context/wallet";
import withAuth from "@/components/withAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { userAddress } = useContext(WalletContext);
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
    fetchProfile(token);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const deleteAccount = async () => {
    try {
      const res = await axios.delete("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("token");
        router.replace("/register");
      }
    } catch (error) {
      toast.error("Error deleting account");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-gradient">
        Profile
      </h1>
      <div className="mt-8 gap-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        {loading && (
          <LoaderCircle
            className="text-white text-center animate-spin"
            size={24}
          />
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
                {userAddress}
              </p>
              <p className="text-lg text-white">
                <span className="font-bold text-purple-400">Email:</span>{" "}
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex max-w-2xl mx-auto mt-8 gap-4">
        <button
          onClick={logoutUser}
          className="font-bold bg-secondary px-4 py-2 rounded-md"
        >
          Logout
        </button>
        <button
          onClick={deleteAccount}
          className="font-bold bg-red-600 px-4 py-2 rounded-md"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default withAuth(Profile);
