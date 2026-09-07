/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { useParams } from "react-router-dom";

import TableComponent from "../../../../../components/TableComponent";
import useEventHook from "../../../../../hooks/useEventHook";
import DescriptionBar from "../../../../../components/DescriptionBar";
import Pagination from "../../../../../components/Pagination";
import SearchInput from "../../../../../components/FormComponents/SearchInput";

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
