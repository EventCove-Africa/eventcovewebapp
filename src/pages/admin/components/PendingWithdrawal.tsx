import { useCallback, useEffect, useState } from "react";
import pending_withdrawal from "../../../assets/icons/pending-withdrawal.svg";

import empty_state from "../../../assets/images/empty_state.svg";
import ModalPopup from "../../../components/ModalPopup";
import Pagination from "../../../components/Pagination";
import {
  _handleThrowErrorMessage,
  formatToNairaShortenFigure,
  isArrayEmpty,
} from "../../../utils";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import toast from "react-hot-toast";
import { transactionsProps } from "../../../types";
import SkeletonLoader from "../../../components/EventCard/components/SkeletonLoader";
import ConfirmWithdrawal from "./ConfirmWithdrawal";

export type isModalOpenProp = {
  open: boolean;
  transactionId: null | number | string;
  transactionStatus: string;
  userName: string;
  walletId: string;
  amount: number;
};

export default function PendingWithdrawal() {
  const [isModalOpen, setIsModalOpen] = useState<isModalOpenProp>({
    open: false,
    transactionId: null,
    transactionStatus: "",
    userName: "",
    walletId: "",
    amount: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [transactions, setTransactions] = useState<transactionsProps[]>([]);
  const [isLoading, setIsLoading] = useState<{
    getTransactions?: boolean;
    approveTransaction: boolean;
  }>({
    getTransactions: false,
    approveTransaction: false,
  });
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleOpenClose = () =>
    setIsModalOpen({
      open: false,
      transactionId: null,
      userName: "",
      walletId: "",
      transactionStatus: "",
      amount: 0,
    });

  const handleTransactionHistory = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, getTransactions: true }));
    try {
      const { status, data } = await api.get(
        appUrls.WALLET_URL +
          `/filter/transactions?page=${
            page - 1
          }&size=${8}&transactionStatus=Pending`,
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        if (result?.data) {
          setTransactions(result?.data);
          setTotalPages(result?.totalPages);
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
      setIsLoading((prev) => ({ ...prev, getTransactions: false }));
    }
  }, [page]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleTransactionHistory();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [handleTransactionHistory]);

  return (
    <>
      <h4 className="text-dark_200 text-sm font-normal">Pending withdrawals</h4>
      <div className="w-full my-4 py-4 flex flex-col gap-3 overflow-auto h-fit lg:h-[250px]">
        {isLoading.getTransactions && (
          <>
            <SkeletonLoader className="h-[50px]" />
          </>
        )}
        {!isLoading.getTransactions && (
          <>
            {transactions.map(
              ({
                transactionId,
                userName,
                amount,
                transactionTime,
                transactionDate,
                transactionStatus,
                walletId,
              }) => (
                <div
                  key={transactionId}
                  className="w-full bg-grey_500 p-2 flex gap-2 justify-between items-center rounded-lg"
                >
                  <div className="flex gap-1 items-center">
                    <img src={pending_withdrawal} alt="pending_withdrawal" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-dark_200 md:text-sm text-xs font-normal">
                        {userName} : {formatToNairaShortenFigure(amount)}
                      </h3>
                      <h5 className="text-grey_700 text-xs font-normal">
                        {transactionDate} {transactionTime}
                      </h5>
                    </div>
                  </div>
                  {transactionStatus.toLowerCase() === "pending" && (
                    <div
                      onClick={() =>
                        setIsModalOpen((prev) => ({
                          ...prev,
                          open: true,
                          transactionId,
                          userName,
                          amount,
                          transactionStatus,
                          walletId,
                        }))
                      }
                      className="border border-primary_100 rounded-lg h-fit flex justify-center items-center px-6 py-2 cursor-pointer text-primary_100 md:text-sm text-xs font-medium"
                    >
                      Approve
                    </div>
                  )}
                  {transactionStatus.toLowerCase() === "completed" && (
                    <div className="rounded-lg h-fit flex justify-center items-center px-6 py-2 text-primary_100 md:text-sm text-xs font-medium">
                      Approved
                    </div>
                  )}
                </div>
              ),
            )}
          </>
        )}
        {!isLoading.getTransactions && (
          <div className="w-full flex justify-center flex-col items-center">
            {isArrayEmpty(transactions) && (
              <>
                <img
                  className="w-[150px] h-[150px]"
                  src={empty_state}
                  alt="empty_state"
                />
                <h2 className="text-dark_200 md:text-base text-sm">
                  No Pending Withdrawals
                </h2>
              </>
            )}
          </div>
        )}
      </div>
      {!isArrayEmpty(transactions) && (
        <div className="w-full flex justify-center items-center mt-3">
          <Pagination
            totalPages={totalPages}
            onPageChange={(pageNumber: number) => setPage(pageNumber)}
          />
        </div>
      )}
      <ModalPopup isOpen={isModalOpen.open} closeModal={handleOpenClose}>
        <ConfirmWithdrawal
          isModalOpen={isModalOpen}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          handleOpenClose={handleOpenClose}
          handleTransactionHistory={handleTransactionHistory}
        />
      </ModalPopup>
    </>
  );
}
