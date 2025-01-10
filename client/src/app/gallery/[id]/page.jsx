"use client";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Gallery = ({ params }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = params.id;
  const getGallery = async () => {
    try {
      const res = await axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setNfts(res.data.user.nfts);
      }
    } catch (error) {
      setError("Error fetching gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="h-screen text-center absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {!loading && nfts.length > 0 && (
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-gradient">
            Gallery
          </h1>
          <div className="mt-10 flex gap-6 flex-wrap justify-center">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="rounded-md overflow-hidden bg-secondary relative w-full aspect-[1.4/1] max-w-[400px] mx-auto"
              >
                <Image
                  src={nft}
                  alt="nft"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && nfts.length === 0 && (
        <div>
          <p className="text-xl text-white my-10">No NFTs found</p>
        </div>
      )}
      {loading && (
        <div className="flex justify-center my-10">
          <LoaderCircle className="size-12 animate-spin text-white" />
        </div>
      )}
      {error && (
        <div>
          <p className="text-red-600 text-xl text-center">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
