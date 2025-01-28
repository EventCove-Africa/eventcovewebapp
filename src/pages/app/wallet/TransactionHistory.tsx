import { useState } from "react";
import SearchInput from "../../../components/FormComponents/SearchInput";
import { CardReceive, CardSend } from "iconsax-react";
import { formatToNaira } from "../../../utils";
import Pagination from "../../../components/Pagination";

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const links = [
    { name: "All", key: "all" },
    { name: "Credit", key: "credit" },
    { name: "Debit", key: "debit" },
  ];

  const transactions = [
    {
      id: 1,
      type: "credit",
      description: "Wallet credited via been credited",
      date: "12/4/2022 7:00pm",
      amount: 20000,
      icon: <CardReceive size="20" className="text-green_200" />,
    },
    {
      id: 2,
      type: "debit",
      description: "You have been debited",
      date: "12/4/2022 7:00pm",
      amount: 10000,
      icon: <CardSend size="20" className="text-red_100" />,
    },
  ];

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    // Fetch data or update state based on the new page
  };

  return (
    <article className="w-full h-fit bg-white rounded-xl p-4">
      <h4 className="text-dark_200 text-sm font-normal">Transaction History</h4>

      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="md:w-full w-full bg-grey_500"
      />

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
        {transactions.map(({ id, description, date, amount, icon }) => (
          <div
            key={id}
            className="bg-grey_500 w-full flex justify-between items-center p-3 rounded"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-white h-[47px] w-[47px] flex items-center justify-center rounded-full">
                {icon}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-dark_500 font-normal text-xs md:text-sm">
                  {description}
                </h4>
                <h4 className="text-grey_700 font-normal text-xs md:text-sm">{date}</h4>
              </div>
            </div>
            <h4 className="text-dark_200 text-xs md:text-sm font-normal">
              {formatToNaira(amount)}
            </h4>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center mt-3">
        <Pagination totalPages={10} onPageChange={handlePageChange} />
      </div>
    </article>
  );
}
