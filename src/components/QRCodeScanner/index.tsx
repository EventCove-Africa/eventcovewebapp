/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "custom-qr-scanner";

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length > 0) {
          setCameras(devices);
          const backCam = devices.find((d) =>
            d.label.toLowerCase().includes("back")
          );
          setSelectedCamera(backCam?.id || devices[0].id);
        } else {
          onError?.("No cameras found");
        }
      })
      .catch((err) => {
        onError?.("Error fetching cameras: " + err.message);
      });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async (cameraId?: string) => {
    const cameraToUse = cameraId || selectedCamera;
    if (!cameraToUse) {
      onError?.("No camera selected");
      return;
    }

    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: cameraToUse } },
      });

      // Log the camera settings to verify which camera is in use
      const tracks = stream.getVideoTracks();
      if (tracks.length > 0) {
        const trackSettings = tracks[0].getSettings();
        console.log("Using camera:", trackSettings);
      }

      await html5QrCodeRef.current.start(
        { deviceId: { exact: cameraToUse } },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          console.warn("QR Scan error:", errorMessage);
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      onError?.(err.message || "Failed to start scanning");
    }
  };

  const stopScanning = () => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.getState() === 2) {
      scanner
        .stop()
        .then(() => setIsScanning(false))
        .catch((err: any) => {
          console.warn("Failed to stop scanner:", err.message);
          onError?.(err.message);
        });
    } else {
      setIsScanning(false);
    }
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCamId = e.target.value;
    setSelectedCamera(newCamId);
    if (isScanning) {
      stopScanning();
      setTimeout(() => startScanning(newCamId), 500);
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
          <h6 className="text-gray-400 text-xs md:text-sm">
            Click to start scanning
          </h6>
          <div
            onClick={() => startScanning()}
            className="cursor-pointer animate-pulse rounded-full h-[50px] w-[50px] p-4 flex justify-center items-center"
          >
            <div className="bg-primary_100 rounded-full px-4 py-4" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center gap-1 md:mt-0 mt-28">
          <h6 className="text-gray-400 text-xs md:text-sm">
            Click to stop scanning
          </h6>
          <StopCircle
            size="48"
            className="text-primary_100 cursor-pointer"
            onClick={stopScanning}
          />
        </div>
      )}
    </div>
  );
};
