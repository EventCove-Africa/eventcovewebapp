/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeScanner } from "../../../components/QRCodeScanner";

export default function QRscan({ handleOpenClose }: any) {
  const handleScan = (data: string) => {
    console.log("Scanned data:", data);
    handleOpenClose()
  };

  // const handleError = (error: string) => {
  //   console.error("Error scanning QR code:", error);
  // };
  return (
    <>
      <div className="lg:w-2/5 w-full bg-white flex flex-col gap-4 items-center justify-center p-8 rounded-xl h-auto">
        <h4 className="text-dark_200 font-normal text-sm">Scan QR code</h4>
        {/* <div className="cursor-pointer border border-primary_100 rounded-full h-[50px] w-[50px] p-4 flex justify-center items-center">
          <div className="bg-primary_100 rounded-full px-4 py-4" />
        </div> */}
        <QRCodeScanner onScan={handleScan} />
      </div>
    </>
  );
}
