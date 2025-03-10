/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar2,
  InfoCircle,
  Information,
  TimerStart,
  Verify,
} from "iconsax-react";
import ProgressBar from "@ramonak/react-progress-bar";
import empty_state from "../../assets/images/empty_state.svg";
import {
  arrayToFormattedDate,
  eventTypeStyles,
  formatTimeToshowAmPm,
  isArrayEmpty,
  truncateString,
} from "../../utils";
import SkeletonLoader from "./components/SkeletonLoader";
import useEventHook from "../../hooks/useEventHook";

export default function EventCard({ eventType }: any) {
  const navigate = useNavigate();
  const {
    loadingEvents,
    handleGetFilteredEvents,
    allEventsData,
    setCurPage,
    curPage,
    totalPages,
  } = useEventHook();

  // Reset to page 1 when eventType changes
  useEffect(() => {
    setCurPage(1);
  }, [eventType]);

  // useEffect(() => {
  //   let mounted = false;
  //   (async () => {
  //     mounted = true;
  //     if (mounted) {
  //       handleGetFilteredEvents(eventType);
  //     }
  //   })();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [handleGetFilteredEvents, eventType]);

  // Fetch data when curPage or eventType changes

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetFilteredEvents(eventType);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [curPage, eventType, handleGetFilteredEvents]);

  // Add scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !loadingEvents &&
        curPage < totalPages
      ) {
        setCurPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingEvents, curPage, totalPages]);

  return (
    <>
      <div className="w-full grid place-self-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
        {loadingEvents && <SkeletonLoader />}
        {!loadingEvents && (
          <>
            {allEventsData.map((event: any, index: number) => (
              <article
                key={`upcoming-event-${index}`}
                className="bg-white w-auto min-h-[392px] h-auto shadow rounded-lg p-3 flex justify-between flex-col"
              >
                <div className="w-full relative">
                  <div className="w-full h-[200px] sm:h-[300px] md:h-[200px] lg:h-[200px] xl:h-[200px]">
                    <img
                      src={event?.eventImageUrl}
                      alt={`${event.eventName} banner`}
                      className="rounded-xl object-cover w-full h-[200px] sm:h-[300px] md:h-[200px] lg:h-[200px] xl:h-[200px]"
                    />
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div
                      className={`px-3 py-2 ${
                        eventTypeStyles[
                          event?.deleted ? "deleted" : event?.status
                        ]
                      } text-xs font-normal rounded-md capitalize`}
                    >
                      {event?.deleted ? "Deleted" : event?.status}
                    </div>
                    <div className="p-2 bg-white shadow text-dark_100 text-xs font-normal rounded-md flex items-center justify-center gap-1">
                      <TimerStart size="12" color="#000000" />
                      {formatTimeToshowAmPm(event?.startTime)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-full mt-2">
                  <h3 className="text-dark_200 font-medium md:text-sm text-xs">
                    {event.eventName}
                  </h3>
                  <p className="text-secondary_300 font-normal text-xs">
                    {event.location}
                  </p>
                  <p className="text-grey_100 font-normal md:text-sm text-xs">
                    {truncateString(event.eventDescription, 100)}
                  </p>
                </div>
                <div className="flex md:flex-row flex-col gap-3 lg:items-center items-start mt-2">
                  <div className="p-3 rounded text-primary_100 font-normal text-xs flex items-center gap-1 bg-pink_100">
                    <Calendar2 size="16" color="#A30162" />{" "}
                    {arrayToFormattedDate(event.startDate)}
                  </div>
                  <div className="p-3 rounded text-green_200 bg-green_300 font-normal text-xs flex items-center gap-1 ">
                    <InfoCircle size="16" color="#4CAF50" />{" "}
                    {event?.eventCategory}
                  </div>
                </div>

                {event?.soldTicket && (
                  <div className="w-full flex flex-col gap-1">
                    <p className="text-grey_100 font-normal text-xs">
                      Sold Tickets
                    </p>
                    <ProgressBar
                      animateOnRender
                      completed={event.progress}
                      height="10px"
                      barContainerClassName="bg-yellow_100"
                      labelClassName="text-xs text-white font-bold"
                      bgColor="#FF9500"
                      borderRadius="50px"
                    />
                    <p className="text-grey_100 font-normal text-xs">
                      {event.ticketsSold}
                    </p>
                  </div>
                )}
                <div className="w-full flex justify-between items-center mt-2">
                  <div
                    className={`flex items-center gap-1 ${
                      event?.published ? "text-green_200" : "text-grey_400"
                    } text-xs font-normal`}
                  >
                    {event?.published ? (
                      <Verify size="12" color="#4CAF50" />
                    ) : (
                      <Information size="12" color="#9E9E9E" />
                    )}
                    {event?.published ? "Published" : "Not Published"}
                  </div>
                  <div
                    role="button"
                    onClick={() => navigate(`/app/events/${event?.eventId}`)}
                    className="flex cursor-pointer items-center gap-1 text-xs font-normal text-primary_100"
                  >
                    View details
                  </div>
                </div>
              </article>
            ))}
          </>
        )}
      </div>
      {!loadingEvents && (
        <div className="w-full flex justify-center">
          {isArrayEmpty(allEventsData) && (
            <img
              className="w-[400px] h-[400px]"
              src={empty_state}
              alt="empty_state"
            />
          )}
        </div>
      )}
    </>
  );
}
