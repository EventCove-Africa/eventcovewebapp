/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { QRCodeScanner } from "../../../components/QRCodeScanner";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";
import { _handleThrowErrorMessage } from "../../../utils";

export default function QRscan({
  handleOpenClose,
  eventReference,
  email,
}: any) {
  const [isValidating, setIsValidating] = useState(false);

  const handleScan = async (data: string) => {
    setIsValidating(true);
    const payload = {
      eventReference,
      ticketNumber: data,
      email,
    };
    try {
      const res = await api.post(appUrls.TICKET_VALIDATION_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        handleOpenClose();
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <div className="lg:w-2/5 w-full bg-white flex flex-col gap-4 items-center justify-center p-8 rounded-xl h-auto">
        <h4 className="text-dark_200 font-normal text-sm">
          {isValidating ? "Validating..." : "Scan QR code"}
        </h4>
        <QRCodeScanner onScan={handleScan} />
      </div>
    </>
  );
}
