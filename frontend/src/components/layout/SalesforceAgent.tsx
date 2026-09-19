"use client";

import Script from "next/script";
import { useRef } from "react";

type MessagingBootstrap = {
  settings: { language: string };
  init: (orgId: string, deployment: string, siteUrl: string, options: { scrt2URL: string }) => void;
  utilAPI: { launchChat: () => Promise<unknown> };
};

declare global {
  interface Window {
    embeddedservice_bootstrap?: MessagingBootstrap;
  }
}

const SALESFORCE_SITE = "https://orgfarm-2c46954943-dev-ed.develop.my.site.com/ESWCBT1789150154364";

export function SalesforceAgent() {
  const initialized = useRef(false);

  function initializeMessaging() {
    const bootstrap = window.embeddedservice_bootstrap;
    if (!bootstrap || initialized.current) return;
    initialized.current = true;

    let ready = false;
    let buttonCreated = false;
    let launchScheduled = false;
    function scheduleLaunch() {
      if (!ready || !buttonCreated || launchScheduled) return;
      launchScheduled = true;
      window.setTimeout(() => {
        try {
          void bootstrap!.utilAPI.launchChat().catch((error: unknown) => {
            console.error("Unable to open Salesforce website agent:", error);
          });
        } catch (error) {
          console.error("Unable to open Salesforce website agent:", error);
        }
      }, 1500);
    }
    const onReady = () => { ready = true; scheduleLaunch(); };
    const onButtonCreated = () => { buttonCreated = true; scheduleLaunch(); };

    window.addEventListener("onEmbeddedMessagingReady", onReady, { once: true });
    window.addEventListener("onEmbeddedMessagingButtonCreated", onButtonCreated, { once: true });
    try {
      bootstrap.settings.language = "en_US";
      bootstrap.init("00Dbm00000y5UFs", "CBT", SALESFORCE_SITE, {
        scrt2URL: "https://orgfarm-2c46954943-dev-ed.develop.my.salesforce-scrt.com",
      });
    } catch (error) {
      initialized.current = false;
      window.removeEventListener("onEmbeddedMessagingReady", onReady);
      window.removeEventListener("onEmbeddedMessagingButtonCreated", onButtonCreated);
      console.error("Error loading Salesforce Embedded Messaging:", error);
    }
  }

  return <Script id="salesforce-embedded-messaging" src={`${SALESFORCE_SITE}/assets/js/bootstrap.min.js`} strategy="afterInteractive" onReady={initializeMessaging} onError={(error) => console.error("Unable to load Salesforce website agent:", error)} />;
}
