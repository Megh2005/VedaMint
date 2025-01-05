"use client";

import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const WalletConnectBtn = () => {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);
  const router = useRouter();

  const [connectBtnLoading, setConnectBtnLoading] = useState(true);

  useEffect(() => {
    const walletAddress = sessionStorage.getItem("walletAddress");
    if (walletAddress) {
      setUserAddress(walletAddress);
      setIsConnected(true);
    }
    setConnectBtnLoading(false);
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Wallet Not Found");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);

      const accounts = await provider.send("eth_requestAccounts", []);
      setUserAddress(accounts[0]);
      setIsConnected(true);

      const { chainId } = await provider.getNetwork();
      const sepoliaNetworkId = "43113";

      if (chainId.toString() !== sepoliaNetworkId) {
        toast.error("Please Switch To Avalanche Fuji Testnet");
      } else {
        sessionStorage.setItem("walletAddress", accounts[0]);
        toast.success("Wallet Connected");
        setTimeout(() => {
          router.push("/register");
        }, 3000);
      }
    } catch (error) {
      toast.error("Error In Connecting Wallet");
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="absolute top-0 right-0 m-4 z-50">
      <button
        disabled={connectBtnLoading || isConnected}
        onClick={connectWallet}
        className="font-bold max-w-sm flex items-center justify-center bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        {connectBtnLoading ? (
          <LoaderCircleIcon className="animate-spin w-5 h-5 text-white" />
        ) : isConnected ? (
          `${userAddress.slice(0, 12)}...${userAddress.slice(-13)}`
        ) : (
          <span>Connect With Metamask</span>
        )}
      </button>
    </div>
  );
};

export default WalletConnectBtn;
