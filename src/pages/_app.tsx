"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import StarknetProvider from "@/providers/StarknetProvider";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <StarknetProvider>
      <Script src="./node_modules/clipboard/dist/clipboard.min.js"></Script>
      <Script src="./node_modules/preline/dist/preline.js"></Script>
      <Script id="clipboard">
        {`(function(){window.addEventListener("load", () => {
          const $clipboards = document.querySelectorAll(".js-clipboard");
          $clipboards.forEach((el) => {
            const isToggleTooltip =
              HSStaticMethods.getClassProperty(el, "--is-toggle-tooltip") ===
              "false"
                ? false
                : true;
            const clipboard = new ClipboardJS(el, {
              text: (trigger) => {
                const clipboardText = trigger.dataset.clipboardText;

                if (clipboardText) return clipboardText;

                const clipboardTarget = trigger.dataset.clipboardTarget;
                const $element = document.querySelector(clipboardTarget);

                if (
                  $element.tagName === "SELECT" ||
                  $element.tagName === "INPUT" ||
                  $element.tagName === "TEXTAREA"
                )
                  return $element.value;
                else return $element.textContent;
              },
            });
            clipboard.on("success", () => {
              const $default = el.querySelector(".js-clipboard-default");
              const $success = el.querySelector(".js-clipboard-success");
              const $successText = el.querySelector(
                ".js-clipboard-success-text"
              );
              const successText = el.dataset.clipboardSuccessText || "";
              const tooltip = el.closest(".hs-tooltip");
              const $tooltip = HSTooltip.getInstance(tooltip, true);
              let oldSuccessText;

              if ($successText) {
                oldSuccessText = $successText.textContent;
                $successText.textContent = successText;
              }
              if ($default && $success) {
                $default.style.display = "none";
                $success.style.display = "block";
              }
              if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
              if (tooltip && !isToggleTooltip)
                $tooltip.element.popperInstance.update();

              setTimeout(function () {
                if ($successText && oldSuccessText)
                  $successText.textContent = oldSuccessText;
                if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
                if (tooltip && !isToggleTooltip)
                  $tooltip.element.popperInstance.update();
                if ($default && $success) {
                  $success.style.display = "";
                  $default.style.display = "";
                }
              }, 800);
            });
          });
        })}
        )()`}
      </Script>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </StarknetProvider>
  );
}
