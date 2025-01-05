"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuroraBackgroundDemo() {
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
        </div>
      </div>
    </AuroraBackground>
  );
}
