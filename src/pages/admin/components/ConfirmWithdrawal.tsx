import { useEffect, useState } from "react";
import { useCallback } from "react";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import { _handleThrowErrorMessage } from "../../../utils";
import { isModalOpenProp } from "./PendingWithdrawal";
import close_cancel from "../../../assets/icons/close-circle.svg";
import Button from "../../../components/FormComponents/Button";
import toast from "react-hot-toast";

type ConfirmWithdrawalProps = {
  isModalOpen: isModalOpenProp;
  setIsLoading: (loadingState: { approveTransaction: boolean }) => void;
  isLoading: {
    approveTransaction: boolean;
  };
  handleOpenClose: () => void;
  handleTransactionHistory: () => void;
};

export default function ConfirmWithdrawal({
  isModalOpen,
  setIsLoading,
  isLoading,
  handleOpenClose,
  handleTransactionHistory,
}: ConfirmWithdrawalProps) {
  const [accountInfo, setAccountInfo] = useState<{
    accountNumber: string;
    bankName: string;
  }>({
    accountNumber: "",
    bankName: "",
  });
  const { transactionId, amount, transactionStatus, walletId } = isModalOpen;

  const handleApproveWithdrawal = async () => {
    setIsLoading({ approveTransaction: true });
    const payload = {
      walletTransactionId: transactionId,
      payoutAmount: amount,
      transactionStatus,
    };
    try {
      const { status, data } = await api.post(
        appUrls.WALLET_URL + `/approve/payout`,
        payload,
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        if (result) {
          toast.success(result);
          handleOpenClose();
          handleTransactionHistory();
        }
      }
    } catch (error: unknown) {
      let errMsg: string | undefined;
      if (error instanceof Error) {
        errMsg = error.message;
      } else if (typeof error === "object" && error !== null) {
        const errObj = error as Record<string, unknown>;
        const response = errObj.response as Record<string, unknown> | undefined;
        const data = (response?.data ?? errObj.data) as
          | Record<string, unknown>
          | undefined;
        if (data && typeof data.message === "string") {
          errMsg = data.message;
        }
      }
      toast.error(_handleThrowErrorMessage(errMsg));
    } finally {
      setIsLoading({ approveTransaction: false });
    }
  };

  const handleGetWalletOrganizerWalletDetails = useCallback(async () => {
    try {
      const { status, data } = await api.get(
        appUrls.WALLET_URL + `/details/${walletId}`,
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        if (result) {
          const { accountNumber, bankName } = result;
          const account_name = accountNumber ? accountNumber : "N/A";
          const bank_name = bankName ? bankName : "N/A";
          setAccountInfo({ accountNumber: account_name, bankName: bank_name });
        }
      }
    } catch (error: unknown) {
      let errMsg: string | undefined;
      if (error instanceof Error) {
        errMsg = error.message;
      } else if (typeof error === "object" && error !== null) {
        const errObj = error as Record<string, unknown>;
        const response = errObj.response as Record<string, unknown> | undefined;
        const data = (response?.data ?? errObj.data) as
          | Record<string, unknown>
          | undefined;
        if (data && typeof data.message === "string") {
          errMsg = data.message;
        }
      }
      toast.error(_handleThrowErrorMessage(errMsg));
    } finally {
      setIsLoading({ approveTransaction: false });
    }
  }, [walletId, setIsLoading]);

  useEffect(() => {
    if (walletId) {
      handleGetWalletOrganizerWalletDetails();
    }
  }, [walletId, handleGetWalletOrganizerWalletDetails]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Confirm withdrawals</h2>
        <img
          onClick={handleOpenClose}
          src={close_cancel}
          alt="close_cancel"
          className="cursor-pointer"
        />
      </div>
      <p className="text-dark_200 text-sm mb-6">
        {`Confirm withdrawal of ${
          isModalOpen
            ? ` — ${isModalOpen.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
              })}`
            : ""
        } for ${
          isModalOpen.userName
        } ${accountInfo.accountNumber} ${accountInfo.bankName}`}
      </p>
      <div className="flex justify-end gap-4">
        <div className="w-full flex gap-2">
          <Button
            title="Cancel"
            className="w-full text-center rounded-2xl border border-primary"
            backgroundColor="bg-none"
            textColor="text-primary"
            type="button"
            onClick={handleOpenClose}
          />
          <Button
            title="Approve"
            className="w-full text-center rounded-2xl"
            backgroundColor="bg-primary_100"
            type="button"
            isLoading={isLoading.approveTransaction}
            onClick={handleApproveWithdrawal}
          />
        </div>
      </div>
    </div>
  );
}
