/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import event2 from "../../../assets/icons/events2.svg";
import ticket_sold from "../../../assets/icons/ticket-sold.svg";
import payment from "../../../assets/icons/payment.svg";
import { formatToNairaShortenFigure } from "../../../utils";
import SkeletonLoader from "../../../components/EventCard/components/SkeletonLoader";

export default function StatsCards({
  details,
  loading,
}: {
  details: any;
  loading: boolean;
}) {
  const [metricsData, setMetricData] = useState([
    {
      title: "Total Number of Events Completed",
      key: "totalNumberOfCompletedEvents",
      value: 0,
      icon: payment,
    },
    {
      title: "Total Number of Events Ongoing",
      key: "totalNumberOfPendingEvents",
      value: 0,
      icon: event2,
    },
    {
      title: "Tickets sold (Paid)",
      key: "totalPaidTicketsSold",
      value: 0,
      icon: ticket_sold,
    },
    {
      title: "Tickets sold (Free)",
      key: "totalFreeTicketsSold",
      value: 0,
      icon: payment,
    },
    {
      title: "Total sales value",
      key: "totalSalesValue",
      value: formatToNairaShortenFigure(0),
      icon: payment,
    },
  ]);

  useEffect(() => {
    setMetricData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value: ["totalSalesValue"].includes(item.key)
          ? formatToNairaShortenFigure?.(details?.[item?.key] || 0)
          : details?.[item?.key],
      }))
    );
  }, [details]); // Runs when details updates

  return (
    <>
      {/* Statistics cards will go here */}
      {loading && (
        <SkeletonLoader className="w-full md:w-1/3 h-[150px] rounded-md" />
      )}
      {!loading && (
        <>
          {metricsData.map((item, index) => (
            <article
              key={`event-stat-${index}`}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:gap-0 gap-4 justify-between h-full"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-grey_100 text-xs md:text-sm font-normal">
                  {item.title}
                </h2>
                <img
                  src={item.icon}
                  alt={`Icon representing ${item.title}`}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark_400 text-lg md:text-xl font-bold md:mt-4 mt-2">
                  {item.value || 0}
                </span>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  );
}
