/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";

export default function Sell() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    file: null,
  });
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modelId, setModelId] = useState("");

  const updateField = (value: any, name: string) => {
    switch (name) {
      case "name":
        setData({ ...data, name: value });
        break;
      case "description":
        setData({ ...data, description: value });
        break;
      case "file":
        setData({ ...data, file: value[0] });
        break;
      case "price":
        setData({ ...data, price: Number(value) });
        break;
    }
  };

  const submit = () => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
      setModelId("123456789");
    }, 5000);
  };

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      {isLoading ? (
        <div className="absolute left-0 top-0 bg-brand-text/50 backdrop-blur-sm w-screen min-h-screen h-full z-[9999999] flex flex-col items-center justify-center">
          <p className="font-bold text-white text-2xl mb-8 text-center">
            Setting up your ZKML model
          </p>
          <p className="text-center text-white mb-4">
            Supercharging your models. This may take a few moments. Please be
            patient...
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
      <Navbar />
      {step === 0 ? (
        <div
          className={clsx(
            "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text px-24 py-14 items-center overflow-hidden relative"
          )}
        >
          <h1 className="font-bold text-4xl mb-4 w-full max-w-3xl">
            Setup your ZKML Model
          </h1>
          <p className="max-w-3xl">
            Upload your ONNX file into our platform, and we will handle the
            rest. Everything from automatic conversion, model runs, inference
            and proof generation, we got it covered.
          </p>
          <form className="my-10 max-w-3xl">
            <label htmlFor="onnxFile" className="font-bold text-lg mb-4">
              Upload ONNX File
            </label>
            <input
              type="file"
              name="onnxFile"
              className="block w-full text-gray-500
            file:me-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-lg file:font-bold
            file:bg-brand-primary file:text-white
            file:mt-4
            file:disabled:opacity-50 file:disabled:pointer-events-none
          "
              onChange={(e) => updateField(e.target.files, "file")}
            />
            <label
              htmlFor="input-label"
              className="block text-lg font-bold mb-1 mt-9"
            >
              Model Name
            </label>
            <p className="mb-3">
              Give your model a memorable name. This is what people will use to
              search and remember it by.
            </p>
            <input
              type="text"
              id="input-label"
              className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
              placeholder="GPT-420"
              onChange={(e) => updateField(e.target.value, "name")}
            ></input>
            <label
              htmlFor="input-label"
              className="block text-lg font-bold mb-1 mt-9"
            >
              Model Description
            </label>
            <p className="mb-3">
              Give your model a good description. It should be short but sweet
              and reflective of what your model can do for users
            </p>
            <input
              type="text"
              id="input-label"
              className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Comprehensive GPT model capable of accepting 69 trillion parameters"
              onChange={(e) => updateField(e.target.value, "description")}
            ></input>
            <label
              htmlFor="input-label"
              className="block text-lg font-bold mb-1 mt-9"
            >
              Model Pricing
            </label>
            <p className="mb-3">Monthly subscription price to use your model</p>
            <input
              type="text"
              id="input-label"
              className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
              placeholder="$69"
              onChange={(e) => updateField(e.target.value, "price")}
            ></input>
          </form>
          <button
            className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white"
            onClick={submit}
          >
            Finish Setup
          </button>
        </div>
      ) : (
        <div
          className={clsx(
            "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text px-24 py-14 items-center justify-center overflow-hidden relative"
          )}
        >
          <img src="/assets/tick.png" alt="Success" />
          <h1 className="font-bold text-4xl mb-4 w-full max-w-3xl text-center mt-8">
            {data.name} has been setup successfully!
          </h1>
          <p className="max-w-3xl text-center mb-12">
            Congratulations! Your model has now been successfully listed on our
            platform.
          </p>
          <Link href={`/models/${modelId}`}>
            <button
              className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white mb-9"
              onClick={submit}
            >
              View Model
            </button>
          </Link>
          <Link href="/explore">
            <button
              className="py-3 px-11 text-brand-primary rounded-lg font-bold text-xl"
              onClick={submit}
            >
              Explore all models
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}
