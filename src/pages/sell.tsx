/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import Lottie from "react-lottie";
import ReactCanvasConfetti from "react-canvas-confetti";
import * as animationData from "../../public/assets/tick.json";
import { API } from "@/utils/axios";
import toast from "react-hot-toast";

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

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await API.postForm("/upload_model", {
        name: data.name,
        description: data.description,
        price: String(data.price),
        onnx_file: data.file,
      });
      console.log(res.data);

      if (res.data) {
        setModelId(res.data.model_id);
        setStep(1);
        fire();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: null) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

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
            <label htmlFor="name" className="block text-lg font-bold mb-1 mt-9">
              Model Name
            </label>
            <p className="mb-3">
              Give your model a memorable name. This is what people will use to
              search and remember it by.
            </p>
            <input
              type="text"
              id="name"
              className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
              placeholder="GPT-420"
              onChange={(e) => updateField(e.target.value, "name")}
            ></input>
            <label
              htmlFor="description"
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
              id="description"
              className="py-3 px-4 block w-full border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Comprehensive GPT model capable of accepting 69 trillion parameters"
              onChange={(e) => updateField(e.target.value, "description")}
            ></input>
            <label
              htmlFor="pricing"
              className="block text-lg font-bold mb-1 mt-9"
            >
              Model Pricing
            </label>
            <p className="mb-3">Monthly subscription price to use your model</p>
            <input
              type="text"
              id="pricing"
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
            "flex flex-col min-w-full min-h-screen bg-inverted-background text-brand-text px-24 py-14 items-center justify-center overflow-hidden relative"
          )}
        >
          <Lottie options={defaultOptions} height={128} width={128} />
          <h1 className="font-bold text-4xl mb-4 w-full max-w-3xl text-center mt-8">
            {data.name} has been setup successfully!
          </h1>
          <p className="max-w-3xl text-center mb-12">
            Congratulations! Your model has now been successfully listed on our
            platform.
          </p>
          <Link href={`/models/${modelId}`}>
            <button className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white mb-9">
              View Model
            </button>
          </Link>
          <Link href="/explore">
            <button className="py-3 px-11 text-brand-primary rounded-lg font-bold text-xl">
              Explore all models
            </button>
          </Link>
          <img
            src="/assets/curved-gradient.png"
            alt=""
            className="absolute w-screen bottom-0 left-0 pointer-none"
          />
        </div>
      )}
      <ReactCanvasConfetti
        refConfetti={getInstance as any}
        style={canvasStyles}
      />
    </main>
  );
}
