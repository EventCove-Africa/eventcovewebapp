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
  // const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  // const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "custom-qr-scanner";

  useEffect(() => {
    // Fetch available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          // setCameras(devices);
          // setSelectedCamera(devices[0].id); // Set the first camera as default
          console.log("Cameras initialized:", devices);
        } else {
          console.error("No cameras found");
          if (onError) onError("No cameras found");
        }
      })
      .catch((err) => {
        console.error("Error fetching cameras:", err);
        if (onError) onError("Error fetching cameras: " + err?.message);
      });

    // Cleanup when component unmounts
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
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(scannerContainerId, {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE], // Ensure the formats are supported
        verbose: false,
      });
    }

    setTimeout(() => {
      html5QrCodeRef
        ?.current!.start(
          {
            facingMode: { exact: "environment" }, // Specify back camera
          },
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
            stopScanning();
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
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current
        ?.stop()
        ?.then(() => setIsScanning(false))
        ?.catch((err) => {
          console.error("Failed to stop scanning:", err);
          if (onError) onError(err?.message);
        });
    }
  };

  // const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCamera(event.target.value);
  //   if (isScanning) {
  //     stopScanning();
  //     setTimeout(startScanning, 500); // Restart scanning with the new camera
  //   }
  // };

  return (
    <div className="w-full flex justify-center flex-col items-center">
      {/* <div className="mb-4">
        <select
          id="camera-select"
          value={selectedCamera || ""}
          onChange={handleCameraChange}
          className="p-2 border rounded"
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label}
            </option>
          ))}
        </select>
      </div> */}
      {!isScanning ? (
        <div
          onClick={startScanning}
          className="cursor-pointer border border-primary_100 animate-pulse rounded-full h-[50px] w-[50px] p-4 flex justify-center items-center"
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
      <div className="bg-grey_900 w-[250px] h-[250px] mb-8 mt-4">
        <div id={scannerContainerId} />
      </div>
    </div>
  );
};
