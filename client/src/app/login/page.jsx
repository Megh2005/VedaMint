"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/actions/login";

function LoginFormDemo() {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(
      login(userDetails.email, userDetails.password),
      {
        loading: 'Logging in...',
        success: (res) => {
          localStorage.setItem("token", res.token);
          router.replace("/about");
          return 'Logged in successfully';
        },
        error: (err) => err.message || 'Error logging in',
      }
    );
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center h-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <form className="my-8 w-full" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={(e) =>
                setUserDetails((u) => ({ ...u, email: e.target.value }))
              }
              required
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) =>
                setUserDetails((u) => ({ ...u, password: e.target.value }))
              }
              required
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          {avatarPreview && (
            <div className="mb-4">
              <p className="text-sm text-white">Preview:</p>
              <Image
                src={avatarPreview}
                width={30}
                height={30}
                alt="Avatar"
                className="rounded-full object-cover mt-2"
              />
            </div>
          )}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </button>
        </form>
        <div>
          Don't Have An Account?{" "}
          <Link
            className="text-red-400 underline hover:text-sky-400"
            href="/register"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default LoginFormDemo;
