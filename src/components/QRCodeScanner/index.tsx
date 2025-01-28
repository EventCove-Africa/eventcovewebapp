/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { StopCircle } from "iconsax-react";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onScan,
  onError,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const cameraIdRef = useRef<string | null>(null) as any;
  const scannerContainerId = "custom-qr-scanner";

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices?.length > 0) {
          cameraIdRef.current = devices?.[0]?.id;
          console.log("Camera initialized:", devices?.[0]?.id);
        } else {
          console.error("No cameras found");
          if (onError) onError("No cameras found");
        }
      })
      .catch((err) => {
        console.error("Error fetching cameras:", err);
        if (onError) onError("Error fetching cameras: " + err?.message);
      });

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch((err) => {
          console.error("Failed to stop scanner:", err);
        });
        html5QrCodeRef.current = null;
      }
    };
  }, [onError]);

  const startScanning = () => {
    if (!cameraIdRef?.current) {
      console.error("No camera available");
      if (onError) onError("No camera available");
      return;
    }

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: [Html5QrcodeSupportedFormats?.QR_CODE], // Ensure the formats are supported
        verbose: false,
      });
    }

    // Make sure html5QrCodeRef.current is non-null using assertion (!)
    setTimeout(() => {
      html5QrCodeRef
        ?.current!.start(
          cameraIdRef?.current,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            videoConstraints: {
              width: { ideal: 640 },
              height: { ideal: 680 },
            },
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanning()
          },
          (errorMessage) => {
            console.warn("QR Code scan error:", errorMessage);
          }
        )
        .then(() => setIsScanning(true))
        .catch((err) => {
          console.error("Failed to start scanning:", err);
          if (onError) onError(err.message);
        });
    }, 500);
  };

 const stopScanning = () => {
    if (html5QrCodeRef?.current) {
      html5QrCodeRef?.current
        ?.stop()
        ?.then(() => setIsScanning(false))
        ?.catch((err) => {
          console.error("Failed to stop scanning:", err);
          if (onError) onError(err?.message);
        });
    }
  };

  return (
    <>
      {!isScanning ? (
        <div
          onClick={startScanning}
          className="cursor-pointer border border-primary_100 rounded-full h-[50px] w-[50px] p-4 flex justify-center items-center"
        >
          <div className="bg-primary_100 rounded-full px-4 py-4" />
        </div>
      ) : (
        <StopCircle
          size="32"
          className="text-primary_100 cursor-pointer"
          onClick={stopScanning}
        />
      )}
      <div className="bg-grey_900 w-[250px] h-[250px] mb-8">
        <div id={scannerContainerId} />
      </div>
    </>
  );
};
