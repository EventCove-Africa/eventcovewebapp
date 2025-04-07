/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { StopCircle } from "iconsax-react";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

type CameraDevice = { id: string; label: string };

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onScan,
  onError,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "custom-qr-scanner";

  useEffect(() => {
    // Fetch available cameras
    Html5Qrcode.getCameras()
      .then((devices: CameraDevice[]) => {
        if (devices?.length > 0) {
          setCameras(devices);

          // Prefer the back camera if available
          const backCamera = devices.find((device) =>
            device.label.toLowerCase().includes("back")
          );

          setSelectedCamera(backCamera ? backCamera.id : devices[0].id);
        } else {
          onError?.("No cameras found");
        }
      })
      .catch((err: Error) => {
        onError?.("Error fetching cameras: " + err.message);
      });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = () => {
    if (!selectedCamera) {
      onError?.("No camera selected");
      return;
    }

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false,
      });
    }

    setTimeout(() => {
      html5QrCodeRef.current
        ?.start(
          selectedCamera,
          {
            fps: 10,
            qrbox: 250,
            videoConstraints: {
              width: { ideal: 640 },
              height: { ideal: 680 },
            },
          },
          (decodedText: string) => {
            onScan(decodedText);
            stopScanning();
          },
          (errorMessage: string) => {
            console.warn("QR Code scan error:", errorMessage);
          }
        )
        .then(() => setIsScanning(true))
        .catch((err: Error) => {
          onError?.(err.message);
        });
    }, 500);
  };

  const stopScanning = () => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.getState() === 2) {
      // 2 = SCANNING, based on Html5QrcodeScannerState enum
      scanner
        .stop()
        .then(() => setIsScanning(false))
        .catch((err: Error) => {
          console.warn("Failed to stop scanning:", err.message);
          onError?.(err.message);
        });
    } else {
      // Safe fallback: it's already stopped or not initialized
      setIsScanning(false);
    }
  };

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCamera(event.target.value);
    if (isScanning) {
      stopScanning();
      setTimeout(startScanning, 500); // Restart with new camera
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div className="mb-4">
        <select
          id="camera-select"
          value={selectedCamera || ""}
          onChange={handleCameraChange}
          className="p-2 border rounded outline-none"
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || camera.id}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-grey_900 w-[250px] h-[250px] mb-8 mt-4">
        <div id={scannerContainerId} />
      </div>

      {!isScanning ? (
        <div className="flex flex-col w-full justify-center items-center gap-1">
          <div
            onClick={startScanning}
            className="cursor-pointer border border-primary_100 animate-pulse rounded-full h-[50px] w-[50px] p-4 flex justify-center items-center"
          >
            <div className="bg-primary_100 rounded-full px-4 py-4" />
          </div>
          <h6 className="text-dark_200 font- md:text-sm text-xs">
            click to start scanning
          </h6>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center gap-1">
          <StopCircle
            size="48"
            className="text-primary_100 cursor-pointer"
            onClick={stopScanning}
          />
          <h6 className="text-dark_200 font- md:text-sm text-xs">
            click to stop scanning
          </h6>
        </div>
      )}
    </div>
  );
};
