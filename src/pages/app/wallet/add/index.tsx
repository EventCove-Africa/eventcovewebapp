/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BvnNinEntry from "./components/BvnNinEntry";
import TransactionPin from "./components/TransactionPin";
import ModalPopup from "../../../../components/ModalPopup";
import OTPVerify from "../../../../components/OtpVerify";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import { useLocation, useNavigate } from "react-router-dom";
import { isObjectEmpty } from "../../../../utils";

export default function AddWallet() {
  const navigate = useNavigate();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const {
    state: { state },
  } = useLocation();
  const [curStep, setCurStep] = useState<"bvn_nin" | "transaction_pin">(
    "bvn_nin"
  );

  const handleCheckIfNinBvnPINIsSet = () => {
    if (!state) return;
    const { nin, bvn, pinAdded } = state;
    if (!nin || !bvn) {
      return handleChangeStep("bvn_nin");
    }
    if (!pinAdded) {
      return handleChangeStep("transaction_pin");
    }
    navigate("/app/wallet");
  };

  const handleChangeStep = (nextPath: "bvn_nin" | "transaction_pin") => {
    setCurStep(nextPath);
  };

  const renderCurrentStep = () => {
    switch (curStep) {
      case "bvn_nin":
        return (
          <BvnNinEntry
            walletDetails={state}
            handleChangeStep={handleChangeStep}
          />
        );
      case "transaction_pin":
        return <TransactionPin handleOpenClose={handleOpenClose} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && !isObjectEmpty(state)) {
        handleCheckIfNinBvnPINIsSet();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [state]);

  return (
    <main className="h-full w-full" role="main" aria-label="Add Wallet">
      {renderCurrentStep()}
      <ModalPopup isOpen={isOpenModal}>
        <OTPVerify
          transactionType="create-pin"
          handleOpenClose={handleOpenClose}
          nextPath="/app/wallet"
          allowResendOTPOnRender={true}
        />
      </ModalPopup>
    </main>
  );
}
