import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
  Html5QrcodeFullConfig,
} from "html5-qrcode";
import { StopCircle, Camera } from "iconsax-react";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
  isValidating: boolean
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onScan,
  onError,
  isValidating,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader";

  const stopScanning = useCallback(() => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.getState() === 2) {
      scanner
        .stop()
        .then(() => setIsScanning(false))
        .catch((err: unknown) => {
          if (onError && err instanceof Error) onError(err.message);
        });
    } else setIsScanning(false);
  }, [onError]);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length > 0) {
          setCameras(devices);
          const backCam = devices.find((d) =>
            d.label.toLowerCase().includes("back"),
          );
          setSelectedCamera(backCam?.id || devices[0].id);
        } else {
          onError?.("No cameras found");
        }
      })
      .catch((err: unknown) => {
        if (onError && err instanceof Error) {
          onError("Error fetching cameras: " + err.message);
        }
      });

    return () => stopScanning();
  }, [onError, stopScanning]);

  const startScanning = async (cameraId?: string) => {
    const cam = cameraId || selectedCamera;
    if (!cam) return onError?.("No camera selected");

    try {
      if (!html5QrCodeRef.current) {
        const config: Html5QrcodeFullConfig = {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        };
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, config);
      }

      await html5QrCodeRef.current.start(
        { deviceId: { exact: cam } },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText: string) => {
          onScan(decodedText);
          stopScanning();
        },
        (errorMessage: string) => {
          // optional noisy errors suppressed
          console.debug("QR error:", errorMessage);
        },
      );

      setIsScanning(true);
    } catch (err: unknown) {
      if (onError && err instanceof Error) {
        onError(err.message);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex flex-col-reverse items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Scan QR</h2>
        <Camera size="32" />
      </div>

      <select
        value={selectedCamera || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCamera(e.target.value)
        }
        className="w-full mb-4 p-2 rounded-lg border text-sm bg-white shadow-sm"
      >
        {cameras.map((cam) => (
          <option key={cam.id} value={cam.id}>
            {cam.label || "Camera"}
          </option>
        ))}
      </select>

      <div className="relative rounded-2xl overflow-hidden shadow-lg border bg-black">
        <div id={scannerContainerId} className="aspect-square" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 border-2 border-white rounded-xl" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        {!isScanning ? (
          <button
            onClick={() => startScanning()}
            disabled={isValidating}
            className="w-full py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
          >
            {isValidating ? "Validating..." : "Start Scanning"}
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-medium flex items-center justify-center gap-2"
          >
            <StopCircle size="20" /> Stop
          </button>
        )}

        <p className="text-xs text-gray-500 text-center">
          Align QR code within the frame
        </p>
      </div>
    </div>
  );
};
