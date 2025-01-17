import {
  Calendar2,
  Information,
  Money,
  TimerStart,
  Verify,
} from "iconsax-react";
import ProgressBar from "@ramonak/react-progress-bar";
import upcoming_event_bg from "../../assets/images/upcoming_event_bg.png";
import { eventTypeStyles, formatToNaira } from "../../utils";

// interface EventData {
//     title: string;
//     location: string;
//     description: string;
//     eventType: string;
//     date: string;
//     price: string;
//     progress: number;
//     ticketsSold: number;
//     isPublished: boolean;
//   }

//   interface EventCardProps {
//     eventData: EventData[];
//   }

const allEvents = [
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "30 / 100",
    progress: "30",
    eventType: "upcoming",
    isPublished: true,
  },
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "10 / 100",
    progress: "50",
    eventType: "completed",
    isPublished: true,
  },
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "80 / 100",
    progress: "80",
    eventType: "cancelled",
    isPublished: false,
  },
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "80 / 100",
    progress: "80",
    eventType: "cancelled",
    isPublished: false,
  },
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "80 / 100",
    progress: "80",
    eventType: "cancelled",
    isPublished: false,
  },
  {
    title: "Envato International Online Meetup 2023",
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th January",
    price: formatToNaira(15000),
    ticketsSold: "80 / 100",
    progress: "80",
    eventType: "cancelled",
    isPublished: false,
  },
  // Add more events as needed
];

export default function EventCard() {
  return (
    <>
      {allEvents.map((event, index: number) => (
        <article
          key={`upcoming-event-${index}`}
          className="bg-white w-full min-h-[392px] h-auto shadow rounded-lg p-3"
        >
          <div className="w-full relative">
            <img
              src={upcoming_event_bg}
              alt={`${event.title} banner`}
              className="rounded-xl object-contain w-full"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <div
                className={`px-3 py-2 ${
                  eventTypeStyles[event?.eventType || "default"]
                } text-xs font-normal rounded-md capitalize`}
              >
                {event?.eventType}
              </div>
              <div className="p-2 bg-white shadow text-dark_100 text-xs font-normal rounded-md flex items-center justify-center gap-1">
                <TimerStart size="12" color="#000000" />
                9:PM
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full mt-2">
            <h3 className="text-dark_200 font-medium md:text-sm text-xs">
              {event.title}
            </h3>
            <p className="text-secondary_300 font-normal text-xs">
              {event.location}
            </p>
            <p className="text-grey_100 font-normal md:text-sm text-xs">
              {event.description}
            </p>
          </div>
          <div className="flex lg:flex-row flex-col gap-3 lg:items-center items-start mt-2">
            <div className="p-3 rounded text-primary_100 font-normal text-xs flex items-center gap-1 bg-pink_100">
              <Calendar2 size="16" color="#A30162" /> {event.date}
            </div>
            <div className="p-3 rounded text-green_200 bg-green_300 font-normal text-xs flex items-center gap-1 ">
              <Money size="16" color="#4CAF50" /> {event.price}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-grey_100 font-normal text-xs">Sold Tickets</p>
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
          <div
            className={`flex items-center gap-1 ${
              event?.isPublished ? "text-green_200" : "text-grey_400"
            } text-xs font-normal mt-2`}
          >
            {event?.isPublished ? (
              <Verify size="12" color="#4CAF50" />
            ) : (
              <Information size="12" color="#9E9E9E" />
            )}
            {event?.isPublished ? "Published" : "Not Published"}
          </div>
        </article>
      ))}
    </>
  );
}
