/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import { Triangle } from "react-loader-spinner";
import { useRouter } from "next/router";
import { useState, useEffect, use, useMemo } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { useAppStore } from "@/utils/store";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  useAccount,
  useWaitForTransaction,
  useContractWrite,
} from "@starknet-react/core";
import { eth } from "@/contracts/eth";
import { API } from "@/utils/axios";
import { useSearchParams } from "next/navigation";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const snippets = {
  bash: `curl -X POST \\
http://localhost:8000/infer \\
-H "Content-Type: application/json" \\
-d \\
'{
  "apiKey": "YOUR_API_KEY",
  "model_id": "YOUR_MODEL_ID"
}'
`,
  js: `fetch('http://localhost:8000/infer', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      apiKey: 'YOUR_API_KEY', // Replace with your API key
      model_id: 'YOUR_MODEL_ID' // Replace with your model ID
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
  python: `import requests
import json

url = 'http://localhost:8000/infer'
data = {
    'apiKey': 'YOUR_API_KEY',  # Replace with your API key
    'model_id': 'YOUR_MODEL_ID'  # Replace with your model ID
}

response = requests.post(url, json=data)
print(response.json())
`,
  ruby: `require 'net/http'
require 'json'
require 'uri'

url = URI('http://localhost:8000/infer')
http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url)
request.content_type = 'application/json'
request.body = JSON.dump({
  "apiKey" => "YOUR_API_KEY",  # Replace with your API key
  "model_id" => "YOUR_MODEL_ID"  # Replace with your model ID
})

response = http.request(request)
puts response.read_body`,
  rust: `use reqwest;
use serde_json::json;
use tokio;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let client = reqwest::Client::new();
    let res = client.post("http://localhost:8000/infer")
        .json(&json!({
            "apiKey": "YOUR_API_KEY", // Replace with your API key
            "model_id": "YOUR_MODEL_ID" // Replace with your model ID
        }))
        .send()
        .await?;

    let response_body = res.text().await?;
    println!("{}", response_body);
    Ok(())
}`,
};

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function ModelInfo() {
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const { apiKey, getModel } = useAppStore();
  const searchParams = useSearchParams();
  const purchased = searchParams.get("purchased");
  const { id } = router.query;
  const [step, setStep] = useState(0);
  const [copy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<keyof typeof snippets>("bash");
  const { address } = useAccount();
  const [txHash, setTxHash] = useState<any>(undefined);
  const { writeAsync } = useContractWrite({
    calls: [
      {
        contractAddress: eth.address,
        entrypoint: "transfer",
        calldata: [
          "0x066451c59fC789fB6F9a0FC438042B7D1C6576BbDd329d8FA3E053d5e0EF00c5",
          1000000000000000,
          0,
        ],
      },
    ],
  });
  const { data, isLoading, error } = useWaitForTransaction({
    hash: txHash,
    watch: true,
  });

  const model = useMemo(() => getModel(id as string), [id, getModel]);

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

  const purchaseModel = async () => {
    // We need to do a few things
    // Check if wallet is connected, if not, we prompt them to connect
    // Make a payment
    if (address) {
      setLoading(true);
      try {
        const purchase = await API.post(`/model/${id}/purchase`, {
          api_key: apiKey,
          owner_address:
            "0x04E66cbE8fb111b1CbbeabD1ee1d3b485d8eA689237a153D194fDfE5654D767b",
          subscription_end_timestamp: "1635724800",
        });
        const res = await writeAsync();
        setTxHash(res.transaction_hash);
      } catch (err) {
        toast.error((err as any).message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please connect your wallet first!");
    }
    // Make an API call
  };

  useEffect(() => {
    if (purchased) {
      setStep(1);
    }
  }, [purchased]);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        toast.success("Model purchased!");
        setStep(1);
      }
    }
  }, [data, isLoading, error]);

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      <Navbar />
      {loading ? (
        <div className="absolute left-0 top-0 bg-brand-text/50 backdrop-blur-sm w-screen min-h-screen h-full z-[9999999] flex flex-col items-center justify-center">
          <p className="font-bold text-white text-2xl mb-8 text-center">
            Purchasing your model
          </p>
          <p className="text-center text-white mb-4">
            Setting up your access. Please be patient...
          </p>
          <Triangle
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="triangle-loading"
            visible={true}
          />
        </div>
      ) : null}
      {hasHydrated && model ? (
        <div
          className="container grid grid-cols-2 justify-center items-center md:px-4 xl:px-20 pt-8
        "
        >
          <div
            className="
          rounded-lg w-auto h-auto overflow-hidden
          "
          >
            <img src={model.image} alt="" />
          </div>

          {step === 0 ? (
            <div className="px-16">
              <h1 className="font-bold text-4xl mb-4 w-full">{model.name}</h1>
              <p className="mb-8 text-sm">
                Here are some statistics about the {model.name} ML model.
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
                <Chart
                  options={chartConfig.options as ApexCharts.ApexOptions}
                  series={chartConfig.series}
                  type="area"
                  width={450}
                  height={250}
                />
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
                onClick={() => purchaseModel()}
              >
                Purchase Model
              </button>
            </div>
          ) : (
            <div className="pl-8 xl:px-16">
              <h1 className="font-bold text-4xl mb-4 w-full">
                Integrate {model.name} into your app
              </h1>
              <p className="mb-8 text-sm">
                ML Village makes it easy for you to use ML models in your
                application without any fussy setups, installations and hardware
                infrastructure. Just copy the code below to get started.
              </p>

              <div className="mb-9">
                <Tab.Group>
                  <Tab.List className={"flex flex-row items-center mb-1"}>
                    {Object.keys(snippets).map((key) => (
                      <Tab
                        key={key}
                        className={({ selected }) => {
                          if (selected) {
                            setSelected(key as keyof typeof snippets);
                          }
                          return clsx(
                            "capitalize px-4 py-2 font-bold w-full text-sm leading-5 text-brand-text",
                            selected
                              ? "border-b-2 border-brand-primary"
                              : "text-brand-text/50 hover:bg-white/[0.12] hover:border-brand-primary hover:border-b-2"
                          );
                        }}
                      >
                        {key}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {Object.keys(snippets).map((key) => (
                      <Tab.Panel key={key}>
                        <CopyBlock
                          {...{
                            language: key,
                            showLineNumbers: true,
                            text: snippets[key as keyof typeof snippets]
                              .replace("YOUR_API_KEY", apiKey || "")
                              .replace("YOUR_MODEL_ID", (id as string) || ""),
                            theme: atomOneDark,
                            customStyle: {
                              height: "250px",
                              overflowY: "scroll",
                              borderRadius: "5px",
                              boxShadow: "1px 2px 3px rgba(0,0,0,0.35)",
                            },
                            codeblock: true,
                          }}
                        />
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>

              <div className="flex flex-row gap-x-4 items-center">
                <CopyToClipboard text={snippets[selected]}>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex items-center 
                gap-x-2 text-sm font-semibold 
                rounded-lg border border-transparent 
                bg-brand-primary text-white 
                hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => {
                      setCopy(true);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    Use Model
                  </button>
                </CopyToClipboard>
                {copy ? (
                  <p className="text-sm italic">Copied to clipboard!</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
