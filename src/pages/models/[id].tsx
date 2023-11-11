/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ModelInfo() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      <Navbar />
        
        <div className="container grid grid-cols-2 justify-center items-center mx-auto
        px-20 pt-8
        ">
          <div className="
          rounded-lg w-auto h-auto overflow-hidden
          "><img src="/assets/models/Model 3.png" alt="" /></div>
          
          
          <div className="px-16">
            <h1 className="font-bold text-4xl mb-4 w-full max-w-3xl">
            GPT-420
            </h1>
            <p className="max-w-3xl mb-4">
              Upload your ONNX file into our platform, and we will handle the
              rest. Everything from automatic conversion, model runs, inference
              and proof generation, we got it covered.
            </p>


            {/* metrics bar */}
            <div className="grid grid-cols-3 mb-8">
              <div>
                <p className="">Model Type</p>
                <p className="font-bold">Classifier</p>
              </div>

              <div>
                <p className="">Training Data Size</p>
                <p className="font-bold">256 GB</p>
              </div>

              <div>
                <p className="">Accuracy</p>
                <p className="font-bold">99.2%</p>
              </div>

            </div>

            {/* Statistics Chart */}
            <div>

            <h3 className="font-bold text-xl">
            Statistics
            </h3>

            <img src="" alt=""/>

            <div className="mt-8 text-lg">Model Subscription Price</div>
            <div className="font-bold text-lg mb-5">$420.69/mth</div>

            
            <button
                type="button"
                className="py-3 px-4 inline-flex items-center 
                gap-x-2 text-sm font-semibold 
                rounded-lg border border-transparent 
                bg-brand-primary text-white 
                hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Purchase Model
              </button>

            </div>
          
          </div>
        </div>
    </main>
  );
}
