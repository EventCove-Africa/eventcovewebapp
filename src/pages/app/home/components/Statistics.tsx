/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { formatToNairaShortenFigure } from "../../../../utils";
import SkeletonLoader from "../../../../components/EventCard/components/SkeletonLoader";
import CalendarComponent from "../../../../components/CalendarComponent";
import event2 from "../../../../assets/icons/events2.svg";
import guest from "../../../../assets/icons/guest.svg";
import payment from "../../../../assets/icons/payment.svg";
import ticket2 from "../../../../assets/icons/ticket2.svg";
import { useUserProps } from "../../../../types";
import { useUser } from "../../../../context/UserDetailsProvider.tsx";
import CopyToClipboard from "../../../../components/CopyToClipboard";

export default function Statistics({ details, loading }: any) {
  const { userDetails } = useUser() as useUserProps;
  const [eventData, setEventData] = useState([
    {
      title: "Total Revenue",
      key: "totalSales",
      value: formatToNairaShortenFigure(0),
      icon: payment,
    },
    {
      title: "Total Number of Events",
      key: "totalEvents",
      value: 0,
      icon: event2,
    },
    { title: "Total Guests", key: "totalAttendees", value: 0, icon: guest },
    {
      title: "Total Tickets",
      key: "totalTicketsCount",
      value: 0,
      icon: payment,
    },
    {
      title: "Total Tickets Purchased",
      key: "totalTicketsPurchase",
      value: 0,
      icon: ticket2,
    },
    {
      title: "Total Referral Count",
      key: "totalReferralCount",
      value: 0,
      icon: event2,
    },
  ]);

  const renderSkeletonLoaderForEventDetails = () => {
    if (!loading) return null;
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-3">
            <SkeletonLoader
              count={1}
              className="w-full flex justify-between rounded-md"
            />
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader
                key={index}
                count={1}
                className="md:w-1/3 h-[10px] rounded-md mt-2"
              />
            ))}
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    setEventData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value:
          item.key === "totalSales"
            ? formatToNairaShortenFigure?.(details?.[item?.key] || 0)
            : details?.[item?.key],
      }))
    );
  }, [details]); // Runs when details updates

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:w-3/4">
        {renderSkeletonLoaderForEventDetails()}
        {!loading &&
          eventData.map((item, index) => (
            <article
              key={`event-stat-${index}`}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:gap-0 gap-4 justify-between h-full"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-grey_100 text-sm md:text-base font-normal">
                  {item.title}
                </h2>
                <img
                  src={item.icon}
                  alt={`Icon representing ${item.title}`}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark_400 text-lg md:text-2xl font-bold md:mt-4 mt-2">
                  {item.value || 0}
                </span>
                {["totalReferralCount"].includes(item?.key) && (
                  <span className="text-primary_100 text-xs cursor-pointer font-bold md:mt-4 mt-2 flex items-center gap-1">
                    Referral code
                    <CopyToClipboard
                      color="text-primary_100"
                      text={`${window.location.origin}/#/auth/signup?referralCode=${userDetails?.referralCode}`}
                    />
                  </span>
                )}
              </div>
            </article>
          ))}
      </div>

      <div className="grid grid-cols-1 md:gap-3 gap-3 lg:w-1/4">
        <article className="h-full w-full rounded-md overflow-auto">
          <CalendarComponent />
        </article>
      </div>
    </>
  );
}
