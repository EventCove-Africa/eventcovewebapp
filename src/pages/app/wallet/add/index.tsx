/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BvnNinEntry from "./components/BvnNinEntry";
import TransactionPin from "./components/TransactionPin";
import ModalPopup from "../../../../components/ModalPopup";
import OTPVerify from "../../../../components/OtpVerify";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import { useLocation, useNavigate } from "react-router-dom";
import { _handleThrowErrorMessage, isObjectEmpty } from "../../../../utils";
import AddBankDetails from "./components/AddBankDetails";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";
import toast from "react-hot-toast";

export default function AddWallet() {
  const navigate = useNavigate();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const { state } = useLocation();
  const [curStep, setCurStep] = useState<
    "bvn_nin" | "transaction_pin" | "bankVerified"
  >("bankVerified");
  const [pin, setPin] = useState<{ pin: string }>({
    pin: "",
  });
  const [action, setAction] = useState<any>();

  const handleCreatePin = async () => {
    action.setSubmitting(true);
    handleOpenClose();
    try {
      const res = await api.post(appUrls.WALLET_URL + "/pin", pin);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        action.resetForm();
        toast.success("PIN created successfully");
        navigate("/app/wallet");
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      action.setSubmitting(false);
    }
  };

  const handleCheckIfNinBvnPINIsSet = () => {
    if (!state) return;
    const { nin, bvn, pinAdded, bankVerified } = state;
    if (!bankVerified) {
      return handleChangeStep("bankVerified");
    }
    if (!nin || !bvn) {
      return handleChangeStep("bvn_nin");
    }
    if (!pinAdded) {
      return handleChangeStep("transaction_pin");
    }
    navigate("/app/wallet");
  };

  const handleChangeStep = (
    nextPath: "bvn_nin" | "transaction_pin" | "bankVerified",
  ) => {
    setCurStep(nextPath);
  };

  const renderCurrentStep = () => {
    switch (curStep) {
      case "bankVerified":
        return <AddBankDetails handleChangeStep={handleChangeStep} />;
      case "bvn_nin":
        return (
          <BvnNinEntry
            walletDetails={state}
            handleChangeStep={handleChangeStep}
          />
        );
      case "transaction_pin":
        return (
          <TransactionPin
            handleOpenClose={handleOpenClose}
            setAction={setAction}
            setPin={setPin}
          />
        );
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
          handleNextFunction={handleCreatePin}
          allowResendOTPOnRender={true}
          showCancelButton={false}
        />
      </ModalPopup>
    </main>
  );
}
