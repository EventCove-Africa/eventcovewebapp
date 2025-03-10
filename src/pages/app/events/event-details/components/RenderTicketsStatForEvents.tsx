/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Briefcase, Crown1, Money4, Teacher, Ticket } from "iconsax-react";
import { formatToNaira } from "../../../../../utils";
import useEventHook from "../../../../../hooks/useEventHook";
import SkeletonLoader from "../../../../../components/EventCard/components/SkeletonLoader";

type RenderTicketsStatForEventsProps = {
  eventId: string | undefined;
};

export default function RenderTicketsStatForEvents({
  eventId,
}: RenderTicketsStatForEventsProps) {
  const {
    loadingEventDetails,
    handleGetEventTicketSalesStats,
    handleGetEventTicketTypeDetails,
    ticketTypes,
    eventSalesStats,
  } = useEventHook();

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEventTicketSalesStats(eventId);
        handleGetEventTicketTypeDetails(eventId);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [eventId]);

  const icons = [
    <Teacher size="20" color="#4242FD" />,
    <Crown1 size="20" color="#4242FD" />,
    <Briefcase size="20" color="#4242FD" />,
  ];

  return (
    <div className="bg-white w-full rounded-xl h-fit p-3">
      <h3 className="text-sm font-normal text-dark_200">Tickets</h3>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-4">
        {loadingEventDetails?.ticketType && (
          <SkeletonLoader count={3} className="h-[100px]" />
        )}
        {!loadingEventDetails?.ticketType && (
          <>
            {ticketTypes?.ticketDetails?.map((types, index) => (
              <div
                key={index}
                className="bg-grey_500 rounded-md p-2 flex flex-col justify-between"
              >
                <div className="flex gap-2 items-center">
                  {icons?.[index % icons?.length]} {/* Cycles through the icons */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-grey_100 text-xs font-normal">
                      {types?.ticketType}
                    </h3>
                    <h5 className="text-dark_200 font-normal md:text-base text-sm">
                      {formatToNaira(types?.price || 0)}
                    </h5>
                  </div>
                </div>
                <div className="self-end font-medium md:text-base text-sm text-grey_100">
                  {types?.soldCount}/
                  <span className="font-medium md:text-base text-sm text-dark_200">
                    {types?.capacity}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-4">
        {loadingEventDetails?.sales && (
          <SkeletonLoader count={4} className="h-[100px]" />
        )}
        {!loadingEventDetails?.sales && (
          <>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Total Revenue
                </h4>
                <Money4 size="24" color="#4CAF50" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
                {formatToNaira(eventSalesStats?.totalTicketSales || 0)}
              </h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Sold Ticket
                </h4>
                <Ticket size="24" color="#6100FF" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
                {eventSalesStats?.totalTicketSold}
              </h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Validated Ticket
                </h4>
                <Ticket size="24" color="#F44336" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
                {eventSalesStats?.totalTicketValidated}
              </h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Not validated Ticket
                </h4>
                <Ticket size="24" color="#A30162" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
                {eventSalesStats?.totalTicketNotValidated}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
