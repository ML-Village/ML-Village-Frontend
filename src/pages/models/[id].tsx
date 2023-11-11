/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function ModelInfo() {
  const router = useRouter();
  const { id } = router.query;
  const hasHydrated = useHasHydrated();

  const chartConfig = {
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: [
      {
        name: "Views",
        data: [31162, 40162, 28162, 51162, 42162, 109162, 100162],
      },
      {
        name: "Downloads",
        data: [11162, 32162, 45162, 32162, 34162, 52162, 41162],
      },
    ],
  };

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      <Navbar />

      <div
        className="container grid grid-cols-2 justify-center items-center mx-auto
        px-20 pt-8
        "
      >
        <div
          className="
          rounded-lg w-auto h-auto overflow-hidden
          "
        >
          <img src="/assets/models/Model 3.png" alt="" />
        </div>

        <div className="px-16">
          <h1 className="font-bold text-4xl mb-4 w-full">GPT-420</h1>
          <p className="mb-8 text-sm">
            Upload your ONNX file into our platform, and we will handle the
            rest. Everything from automatic conversion, model runs, inference
            and proof generation, we got it covered.
          </p>

          {/* metrics bar */}
          <div className="grid grid-cols-3 mb-8">
            <div>
              <p className="mb-2">Model Type</p>
              <p className="font-bold">Classifier</p>
            </div>

            <div>
              <p className="mb-2">Training Data Size</p>
              <p className="font-bold">256 GB</p>
            </div>

            <div>
              <p className="mb-2">Accuracy</p>
              <p className="font-bold">99.2%</p>
            </div>
          </div>

          {/* Statistics Chart */}
          <div className="mb-8">
            <h3 className="font-bold text-xl mb-4">Statistics</h3>
            {/* chart itself */}
            {hasHydrated ? (
              <Chart
                options={chartConfig.options}
                series={chartConfig.series}
                type="area"
                width={450}
                height={250}
              />
            ) : (
              <></>
            )}
          </div>

          <div className="text-lg mb-2">Model Subscription Price</div>
          <div className="font-bold text-lg mb-8">$420.69/mth</div>

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
    </main>
  );
}
