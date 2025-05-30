"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

interface Props {
  onScanSuccess: (decodedText: string) => void;
}

const QrScanner = ({ onScanSuccess }: Props) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",                    // element ID
      { fps: 10, qrbox: 250 },        // config
      false                           // verbose mode (set to false for no debug logs)
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear(); // optional: stops scanner after first scan
      },
      (error) => {
        console.warn("QR scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch((e) => console.error("Clear error", e));
    };
  }, []);

  return <div id="qr-reader" />;
};

export default QrScanner;
