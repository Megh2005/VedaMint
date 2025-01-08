"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { WalletContext } from "@/context/wallet";
import { useContext, useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuroraBackgroundDemo() {
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
        router.replace("/register");
      }
    } catch (error) {
      toast.error("Error In Connecting Wallet");
      console.error("Connection error:", error);
    }
  };

  return (
    <AuroraBackground>
      <div className="relative overflow-hidden pt-40 lg:pt-64 pb-60">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <h1 className="w-max pb-2 animated-underline fade-pullup text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
                VedaMint
              </h1>
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Empowering creators through secure and effortless NFT publishing
            </p>
          </div>
          <div className="flex justify-center">
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
        </div>
      </div>
    </AuroraBackground>
  );
}
