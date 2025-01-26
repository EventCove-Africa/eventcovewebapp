/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Column } from "react-table";
import Button from "../../../components/FormComponents/Button";
import TableComponent from "../../../components/TableComponent";
import useNavigation from "../../../hooks/useNavigation";
import axios from "axios";

type Event = {
  event_name: string;
  ticket_category: string;
  event_type: string;
  seat_name: string;
  total_capacity: number;
  actions: string;
  id: string;
};

export default function Tickets() {
  const { navigate } = useNavigation();

  const renderActions = (row: Event) => {
    const handleEdit = () => {
      console.log(`Edit clicked for Event ID: ${row.id}`);
    };

    return (
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="text-blue_300 px-2 py-1 rounded-md cursor-pointer"
        >
          Edit
        </button>
      </div>
    );
  };

  const columns: Column<Event>[] = [
    { Header: "Event Name", accessor: "event_name" },
    { Header: "Ticket Category", accessor: "ticket_category" },
    { Header: "Event Type", accessor: "event_type" },
    { Header: "Seat Name", accessor: "seat_name" },
    { Header: "Total Capacity", accessor: "total_capacity" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => renderActions(row.original), // Return JSX here
    },
  ];
  const [data] = useState<Event[]>([
    {
      event_name: "Get Ready for an Unforgettable House Party!",
      ticket_category: "VIP",
      event_type: "Music",
      seat_name: "A1",
      total_capacity: 200,
      actions: "View",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
    {
      event_name: "Get Ready for an Unforgettable House Party! ",
      ticket_category: "General",
      event_type: "Sports",
      seat_name: "B2",
      total_capacity: 500,
      actions: "Edit",
      id: "",
    },
  ]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<Event[]>(`/api/events?search=${query}`);
      return response.data;
    } catch (error) {
      console.error("Search error:", error);
      return data; // Return current data on error
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <h3 className="text-dark_200 text-base font-normal">
          Here’s the ticket lineup, bestie
        </h3>
        <div>
          <Button
            backgroundColor="bg-primary_300"
            textColor="text-primary_100"
            title="Create Ticket"
            type="button"
            onClick={() => navigate("/app/tickets/add")}
          />
        </div>
      </div>
      <TableComponent columns={columns} data={data} onSearch={handleSearch} />
    </div>
  );
}
