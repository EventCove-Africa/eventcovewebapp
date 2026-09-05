/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Column } from "react-table";
import { useParams } from "react-router-dom";

import TableComponent from "../../../../../components/TableComponent";
import useEventHook from "../../../../../hooks/useEventHook";
import DescriptionBar from "../../../../../components/DescriptionBar";

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
  const {
    loadingEventDetails,
    handleGetEventTicketSalesStats,
    attendeesData,
    setCurPage,
    curPage,
    totalPages,
  } = useEventHook();

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEventTicketSalesStats(id);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, curPage]);

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
        <DescriptionBar text="Here’s the list of Attendess 🌟" />
      </div>
    
      <TableComponent
        isLoading={loadingEventDetails?.sales}
        columns={columns}
        data={attendeesData}
        currentPage={curPage}
        totalPages={totalPages}
        showPagination={true}
        setPage={(number) => setCurPage(number)}
      />
    </div>
  );
}
