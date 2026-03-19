import { useState, useEffect } from "react";

type DeviceType = "android" | "ios" | "ios-other" | "desktop" | "unknown";

interface InstallPromptState {
  deviceType: DeviceType;
  isStandalone: boolean;
  canInstall: boolean;
  isDismissed: boolean;
  showPrompt: boolean;
  install: () => Promise<void>;
  dismiss: () => void;
}

function detectDevice(): DeviceType {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua);

  if (isIOS && isSafari) return "ios";
  if (isIOS) return "ios-other";
  if (isAndroid) return "android";
  if (!isIOS && !isAndroid) return "desktop";
  return "unknown";
}

export function useSmartInstallPrompt(): InstallPromptState {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setDeviceType(detectDevice());
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true);
    setIsDismissed(localStorage.getItem("aiva_install_dismissed") === "true");

    const existingPrompt = (window as any).__deferredInstallPrompt;
    if (existingPrompt) setDeferredPrompt(existingPrompt);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).__deferredInstallPrompt = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const canInstall = !isStandalone && !isDismissed;
  const showPrompt = canInstall && (!!deferredPrompt || deviceType === "ios" || deviceType === "desktop");

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("aiva_install_dismissed", "true");
      setIsDismissed(true);
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    localStorage.setItem("aiva_install_dismissed", "true");
    setIsDismissed(true);
  };

  return { deviceType, isStandalone, canInstall, isDismissed, showPrompt, install, dismiss };
}
