/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Column } from "react-table";
import TableComponent from "../../../../../components/TableComponent";
import { useParams } from "react-router-dom";
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
    // {
    //   Header: "Actions",
    //   accessor: "actions",
    //   Cell: ({ row }: any) => renderActions(row.original), // Return JSX here
    // },
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
        setPage={(number) => setCurPage(number)}
        totalPages={totalPages}
        showPagination={true}
      />
    </div>
  );
}
