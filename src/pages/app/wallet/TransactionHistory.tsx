/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import SearchInput from "../../../components/FormComponents/SearchInput";
import { CardReceive, CardSend } from "iconsax-react";
import {
  _handleThrowErrorMessage,
  formatToNaira,
  isArrayEmpty,
} from "../../../utils";
import Pagination from "../../../components/Pagination";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import { userDetailsProps } from "../../../types";
import SkeletonLoader from "../../../components/EventCard/components/SkeletonLoader";

type TransactionHistoryProps = {
  userDetails: userDetailsProps;
};

export default function TransactionHistory({
  userDetails,
}: TransactionHistoryProps) {
  // const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems] = useState<number>(10);
  const links = [
    { name: "All", key: "all" },
    { name: "Credit", key: "credit" },
    { name: "Debit", key: "debit" },
  ];

  const handleTransactionHistory = async () => {
    setIsLoading(true);
    const transactionType =
      activeType === "all"
        ? ""
        : activeType === "credit"
        ? "transactionType=credit"
        : "transactionType=debit";
    try {
      const { status, data } = await api.get(
        appUrls.WALLET_URL +
          `/filter/transactions?organizerId=${userDetails?.id}&page=${page}&size=${totalItems}&${transactionType}`
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        if (result?.data) {
          console.log(result?.data);
          setTransactions(result?.data);
          setPage(result?.currentPage);
        }
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [page, activeType]);

  return (
    <article className="w-full h-fit bg-white rounded-xl p-4">
      <h4 className="text-dark_200 text-sm font-normal">Transaction History</h4>
      <div className="mt-3 bg-grey_500 flex justify-between text-center w-full">
        {links.map(({ name, key }) => (
          <button
            onClick={() => setActiveType(key)}
            key={key}
            className={`border-b ${
              key === activeType
                ? "border-primary_100 text-primary_100"
                : "cursor-pointer text-grey_100 border-background_100"
            } text-sm w-full p-3`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        {!isLoading && (
          <>
            {transactions.map(({ id, description, date, amount, type }) => (
              <div
                key={id}
                className="bg-grey_500 w-full flex justify-between items-center p-3 rounded"
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-white h-[47px] w-[47px] flex items-center justify-center rounded-full">
                    {type === "credit" && (
                      <CardReceive size="20" className="text-green_200" />
                    )}
                    {type === "debit" && (
                      <CardSend size="20" className="text-red_100" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-dark_500 font-normal text-xs md:text-sm">
                      {description}
                    </h4>
                    <h4 className="text-grey_700 font-normal text-xs md:text-sm">
                      {date}
                    </h4>
                  </div>
                </div>
                <h4 className="text-dark_200 text-xs md:text-sm font-normal">
                  {formatToNaira(amount)}
                </h4>
              </div>
            ))}
          </>
        )}
        {!isLoading && isArrayEmpty(transactions) && (
          <h1 className="text-dark_200 md:text-base text-sm font-normal text-center mt-4">
            NO DATA AVAILABLE
          </h1>
        )}
      </div>
      {isLoading && (
        <SkeletonLoader count={3} className="py-2 px-4 h-auto my-2" />
      )}
      {!isLoading && !isArrayEmpty(transactions) && (
        <div className="w-full flex justify-center items-center mt-3">
          <Pagination
            totalPages={totalItems}
            onPageChange={(page: number) => setPage(page)}
          />
        </div>
      )}
    </article>
  );
}
