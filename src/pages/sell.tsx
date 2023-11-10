/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";

export default function Explore() {
  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-hidden relative",
        ibm.className
      )}
    >
      <Navbar />
      <div
        className={clsx(
          "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text px-24 py-14 items-center overflow-hidden relative"
        )}
      >
        <h1 className="font-bold text-4xl mb-4 w-full max-w-3xl">
          Setup your ZKML Model
        </h1>
        <p className="max-w-3xl">
          Upload your ONNX file into our platform, and we will handle the rest.
          Everything from automatic conversion, model runs, inference and proof
          generation, we got it covered.
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
          ></input>
          <label
            htmlFor="input-label"
            className="block text-lg font-bold mb-1 mt-9"
          >
            Model Description
          </label>
          <p className="mb-3">
            Give your model a good description. It should be short but sweet and
            reflective of what your model can do for users
          </p>
          <input
            type="text"
            id="input-label"
            className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Comprehensive GPT model capable of accepting 69 trillion parameters"
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
          ></input>
        </form>
        <button className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white">
          Finish Setup
        </button>
      </div>
    </main>
  );
}
