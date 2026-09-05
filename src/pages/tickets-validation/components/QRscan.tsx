/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { QRCodeScanner } from "../../../components/QRCodeScanner";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";
import { _handleThrowErrorMessage } from "../../../utils";
import { Camera } from "iconsax-react";
import CustomSelect from "../../../components/FormComponents/SelectInputField";

export default function QRscan({
  handleOpenClose,
  eventReference,
  email,
  setAttendeeDetails,
}: any) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationCategory, setValidationCategory] = useState<string>();

  const handleScan = async (data: string) => {
    setIsValidating(true);
    const payload = {
      eventReference,
      ticketNumber: data,
      validationCategory,
      email,
    };
    try {
      const res = await api.post(appUrls.TICKET_VALIDATION_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res?.data?.data;
        setAttendeeDetails(result);
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
      <div className="lg:w-2/5 w-full bg-white flex flex-col gap-4 items-center justify-center md:p-6 p-3 rounded-xl h-auto">
        <div className="flex flex-col-reverse items-center justify-between">
          <h2 className="text-lg font-semibold">Scan QR</h2>
          <Camera size="32" />
        </div>
        <div className="w-full">
          <CustomSelect
            label="Select Ticket Category"
            name="validationCategory"
            onChange={(event) => {
              setValidationCategory(event?.value as string);
            }}
            options={[
              { label: "TicketBuyer", value: "TicketBuyer" },
              { label: "Guest", value: "Guest" },
            ]}
            value={validationCategory}
          />
        </div>
        <QRCodeScanner onScan={handleScan} isValidating={isValidating} />
      </div>
    </>
  );
}
