/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import TableComponent from "../../../components/TableComponent";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";
import toast from "react-hot-toast";
import {
  _handleThrowErrorMessage,
  formatDateArrayToString,
  formatToNaira,
} from "../../../utils";
import CustomSelect from "../../../components/FormComponents/SelectInputField";
import ModalPopup from "../../../components/ModalPopup";
import InfoModal from "../../components/InfoModal";
import { useOpenCloseModals } from "../../../hooks/useOpenCloseModal";
import useQueryParams from "../../../hooks/useQueryParams";
import { useUser } from "../../../context/UserDetailsProvider.tsx";
import { useUserProps } from "../../../types/generalTypes.tsx";

type TicketProp = {
  name: string;
  price: string;
  salesStartTime: string;
  salesEndTime: string;
  ticketTypeId: string;
  eventId: string;
  category: string;
  classification: string;
  salesStartDate: string;
  salesEndDate: string;
  perks: string;
  deleted: boolean;
  saleStartEndDate: string;
  groupTicketLimit: string;
  purchaseLimit: string;
  confirmedSeats: string;
  reservedSeats: string;
  colour: string;
  capacity: string;
  transferTransactionFeeToBuyer: boolean;
  actions: any;
};

export default function Tickets() {
  const { userDetails } = useUser() as useUserProps;
  const navigate = useNavigate();
  const getParam = useQueryParams();
  const event_id = getParam("event_id") || "";
  const columns: Column<TicketProp>[] = [
    { Header: "Seat Name", accessor: "name" },
    { Header: "Price", accessor: "price" },
    { Header: "Category", accessor: "category" },
    { Header: "Classification", accessor: "classification" },
    { Header: "Capacity", accessor: "capacity" },
    { Header: "Start-End Date (Sales)", accessor: "saleStartEndDate" },
    { Header: "Colour", accessor: "colour" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => renderActions(row.original), // Return JSX here
    },
  ];
  const [ticketData, setTicketData] = useState<TicketProp[]>([]);
  const [allEventsData, setAllEventsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpenModal, handleOpenClose } = useOpenCloseModals();
  const [isEventPublished, setIsEventPublished] = useState<boolean | null>(
    null
  );
  const [isTicketSold, setIsTicketSold] = useState<boolean | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>("");

  const renderActions = (_row: TicketProp) => {
    const handleEditAction = () => {
      const isPaid = _row?.category.toLowerCase() === "paid";
      const ticketId = _row?.ticketTypeId;
      const canEdit = !isPaid || !isEventPublished || !isTicketSold;
      if (canEdit) {
        return navigate(`/app/tickets/edit/${ticketId}`, {
          state: _row,
        });
      }
      return handleOpenClose("infoModal");
    };

    return (
      <div className="flex space-x-2">
        <button
          onClick={handleEditAction}
          className="text-primary_100 px-2 py-1 rounded-md cursor-pointer"
        >
          Edit
        </button>
      </div>
    );
  };

  const handleGetEventTickets = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await api.get(
        appUrls.TICKET_URL + `/all/${event_id}`
      );
      const results = data?.data;
      if ([200, 201].includes(status)) {
        const record = [] as any;
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          const salesStartTime = element?.salesStartTime;
          const salesEndTime = element?.salesEndTime;
          const formattedsalesStartDate = formatDateArrayToString(
            element?.salesStartDate
          );
          const formattedsalesEndDate = formatDateArrayToString(
            element?.salesEndDate
          );
          const startDate = element?.salesStartDate;
          const endDate = element?.salesEndDate;
          record.push({
            name: element?.name,
            price: formatToNaira(element?.price),
            salesEndDate: formattedsalesEndDate,
            salesStartDate: formattedsalesStartDate,
            saleStartEndDate: `${formattedsalesStartDate} - ${formattedsalesEndDate}`,
            salesEndTime,
            salesStartTime,
            salesStartEndTime: `${salesStartTime} - ${salesEndTime}`,
            startDate,
            endDate,
            ticketTypeId: element?.ticketTypeId,
            eventId: element?.eventId,
            category: element?.category,

            classification: element?.classification,
            colour: element?.colour || "N/A",
            capacity: element?.capacity || "N/A",
            perks: element?.perks || "N/A",
            reservedSeats: element?.reservedSeats || "N/A",
            confirmedSeats: element?.confirmedSeats || "N/A",
            purchaseLimit: element?.purchaseLimit || "N/A",
            groupTicketLimit: element?.groupTicketLimit || "N/A",
            transferTransactionFeeToBuyer:
              element?.transferTransactionFeeToBuyer,
          });
        }
        setTicketData(() => [...record]);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
      setTicketData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetEvents = async () => {
    try {
      const { status, data } = await api.get(
        appUrls.EVENT_URL + `?organizerId=${userDetails?.id}`
      );
      const results = data?.data;
      if ([200, 201].includes(status)) {
        const record = [] as any;
        for (let index = 0; index < results.length; index++) {
          const element = results[index];
          const eventId = element?.eventId;
          const published = element?.published;
          const eventName = element?.eventName;
          const soldTicket = element?.soldTicket;
          record.push({
            label: eventName,
            value: {
              eventId,
              published,
              soldTicket,
            },
          });
          if (event_id && event_id === eventId) {
            setIsEventPublished(published);
            setSelectedEvent(eventName);
            setIsTicketSold(soldTicket);
          }
        }
        setAllEventsData(() => [...record]);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.response?.data?.message));
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEvents();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && event_id) {
        handleGetEventTickets();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [event_id]);

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <h3 className="text-dark_200 text-base font-normal">
          Here’s the ticket lineup
        </h3>
      </div>
      <div className="mt-5 w-full p-3 bg-white rounded-tl-xl rounded-tr-xl text-sm">
        <CustomSelect
          label=" Select an event:"
          name="event"
          onChange={(event) => {
            setSelectedEvent(event?.label);
            setIsEventPublished(event?.value?.published);
            setIsTicketSold(event?.value?.soldTicket);
            navigate(`/app/tickets?event_id=${event?.value?.eventId}`);
          }}
          className="md:w-[300px] w-full"
          options={allEventsData}
          value={selectedEvent}
          defaultValue={selectedEvent}
        />
      </div>
      <TableComponent
        isLoading={isLoading}
        showPagination={false}
        columns={columns}
        data={ticketData}
      />
      <ModalPopup isOpen={isOpenModal("infoModal")}>
        <InfoModal
          handleOpenClose={() => handleOpenClose("infoModal")}
          text="Please contact our support team on support@eventcove.africa"
        />
      </ModalPopup>
    </div>
  );
}
