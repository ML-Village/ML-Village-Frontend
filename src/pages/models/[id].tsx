/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, use } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import dynamic from "next/dynamic";
import { Tab } from "@headlessui/react";
import { useAppStore } from "@/utils/store";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const snippets = {
  bash: `curl -X POST http://localhost:3001/run/123 -H "Authorization: Bearer YOUR_UUID_API_KEY"`,
  js: `const url = 'http://localhost:3001/run/123';
const apiKey = 'YOUR_UUID_API_KEY';

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_UUID_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
  python: `import requests

url = 'http://localhost:3001/run/123'
headers = {
    'Authorization': 'Bearer YOUR_UUID_API_KEY'
}

response = requests.post(url, headers=headers)
print(response.json())
`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

url = URI.parse('http://localhost:3001/run/123')
http = Net::HTTP.new(url.host, url.port)
request = Net::HTTP::Post.new(url.request_uri)
request['Authorization'] = 'Bearer YOUR_UUID_API_KEY'

response = http.request(request)
puts JSON.parse(response.body)
  `,
  rust: `use reqwest::header::AUTHORIZATION;
use std::collections::HashMap;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let url = "http://localhost:3001/run/123";
    let api_key = "Bearer YOUR_UUID_API_KEY".to_string();

    let client = reqwest::Client::new();
    let res = client.post(url)
        .header(AUTHORIZATION, api_key)
        .send()
        .await?;

    let response_body = res.text().await?;
    println!("{}", response_body);
    Ok(())
}
  `,
};

export default function ModelInfo() {
  const router = useRouter();
  const { apiKey } = useAppStore();
  const { id } = router.query;
  const [step, setStep] = useState(0);
  const [copy, setCopy] = useState(false);
  const [selected, setSelected] = useState<keyof typeof snippets>("bash");

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

  const purchaseModel = () => {
    // We need to do a few things
    // Check if wallet is connected, if not, we prompt them to connect
    // Make a payment
    // Make an API call
    setStep(1);
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

        {step === 0 ? (
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
          <div className="px-16">
            <h1 className="font-bold text-4xl mb-4 w-full">
              Integrate GPT-420 into your app
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
                          text: snippets[key as keyof typeof snippets].replace(
                            "YOUR_UUID_API_KEY",
                            apiKey || ""
                          ),
                          theme: atomOneDark,
                          customStyle: {
                            height: "250px",
                            overflowY: "scroll",
                            borderRadius: "5px",
                            boxShadow: "1px 2px 3px rgba(0,0,0,0.35)",
                          },
                          codeBlock: true,
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
              {copy && <p className="text-sm italic">Copied to clipboard!</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
