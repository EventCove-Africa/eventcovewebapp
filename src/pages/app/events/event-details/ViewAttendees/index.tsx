/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { useParams } from "react-router-dom";

import TableComponent from "../../../../../components/TableComponent";
import useEventHook from "../../../../../hooks/useEventHook";
import DescriptionBar from "../../../../../components/DescriptionBar";
import Pagination from "../../../../../components/Pagination";
import SearchInput from "../../../../../components/FormComponents/SearchInput";
import { Ticket } from "iconsax-react";

type AttendeesProps = {
  email: string;
  phoneNumber: string;
  discounted: boolean;
  paymentReference: string;
  ticketNumber: string;
  validated: boolean;
  date: string;
  time: string;
  ticketType: string;
  fullName: string;
  paymentChannel: string;
};

export default function ViewAttendees() {
  const { id } = useParams();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    loadingEventDetails,
    handleGetEventTicketSalesStats,
    attendeesData,
    setCurPage,
    curPage,
    totalPages,
    eventSalesStats,
  } = useEventHook();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setCurPage(1);
    }, 800);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      const query = debouncedSearch
        ? `&email=${encodeURIComponent(debouncedSearch)}`
        : "";
      if (mounted) {
        handleGetEventTicketSalesStats(id, query);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, curPage, debouncedSearch]);

  const columns: Column<AttendeesProps>[] = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Ticket-type", accessor: "ticketType" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone number", accessor: "phoneNumber" },
    { Header: "Date-Time", accessor: "date" },
    { Header: "Time", accessor: "time" },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <DescriptionBar text="Here’s the list of Attendees 🌟" />
      </div>

      <div className="md:w-[350px] h-[100px] w-full bg-grey_500 p-3 my-4 shadow">
        <div className="flex justify-between">
          <h4 className="text-grey_100 text-sm font-normal">Total ticket sold</h4>
          <Ticket size="24" color="#6100FF" />
        </div>
        <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
          {eventSalesStats?.totalTicketSold}
        </h3>
      </div>

      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Attendees by Email"
      />

      <TableComponent
        isLoading={loadingEventDetails?.sales}
        columns={columns}
        data={attendeesData}
      />
      <div className="w-full flex justify-center mt-2">
        <Pagination
          totalPages={totalPages}
          currentPage={curPage}
          onPageChange={(page: number) => setCurPage(page)}
        />
      </div>
    </div>
  );
}
