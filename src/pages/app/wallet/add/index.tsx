import { useState } from "react";
import BvnNinEntry from "./components/BvnNinEntry";
import TransactionPin from "./components/TransactionPin";
import ModalPopup from "../../../../components/ModalPopup";
import OTPVerify from "../../../../components/OtpVerify";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";

export default function AddWallet() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const [curStep, setCurStep] = useState<"bvn_nin" | "transaction_pin">(
    "bvn_nin"
  );

  const handleChangeStep = (nextPath: "bvn_nin" | "transaction_pin") => {
    setCurStep(nextPath);
  };

  const renderCurrentStep = () => {
    switch (curStep) {
      case "bvn_nin":
        return <BvnNinEntry handleChangeStep={handleChangeStep} />;
      case "transaction_pin":
        return (
          <TransactionPin
            handleChangeStep={handleChangeStep}
            handleOpenClose={handleOpenClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="h-full w-full" role="main" aria-label="Add Wallet">
      {renderCurrentStep()}
      <ModalPopup isOpen={isOpenModal}>
        <OTPVerify handleOpenClose={handleOpenClose} nextPath="/app/wallet" />
      </ModalPopup>
    </main>
  );
}
