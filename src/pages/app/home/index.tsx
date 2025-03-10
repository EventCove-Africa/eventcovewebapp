import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import PieChartComponent from "../../../components/PieChartComponent";
import CalendarComponent from "../../../components/CalendarComponent";
import SelectDropdown from "../../../components/FormComponents/SelectDropdown";
import Button from "../../../components/FormComponents/Button";
import { formatToNaira } from "../../../utils";
import event2 from "../../../assets/icons/events2.svg";
import guest from "../../../assets/icons/guest.svg";
import payment from "../../../assets/icons/payment.svg";
import ticket2 from "../../../assets/icons/ticket2.svg";
import EventCard from "../../../components/EventCard";

export default function Home() {
  const navigate = useNavigate();
  const [, setSelectedOption] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const eventData = [
    { title: "Total Number of Events", value: 0, icon: event2 },
    { title: "Total Guests", value: 0, icon: guest },
    { title: "Total Revenue", value: formatToNaira(0), icon: payment },
    { title: "Total Tickets", value: 0, icon: ticket2 },
  ];

  const ticketsData = [
    { label: "Sold (70%)", color: "bg-purple_100" },
    { label: "Not Sold (30%)", color: "bg-grey_300" },
  ];

  return (
    <div className="w-full h-full">
      {/* Header Section */}
      <header className="w-full flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-grey_100 md:text-base text-sm font-normal">
            Hey, welcome to Event Cove! 🌊 Tap Create Event to get started!
          </h1>
          <div className="w-full flex flex-wrap justify-between items-center gap-2">
            <Button
              title="Create Event"
              type="button"
              onClick={() => navigate("/app/events/add")}
            />
            <SelectDropdown
              options={["All Events", "Paid Events", "Free Events"]}
              onChange={handleSelectChange}
            />
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="lg:h-[236.92px] h-auto w-full flex lg:flex-row flex-col md:gap-3 gap-3 my-3">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
          {eventData.map((item, index) => (
            <article
              key={`event-stat-${index}`}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:gap-0 gap-4 justify-between h-full"
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
              <span className="text-dark_400 text-lg md:text-2xl font-bold">
                {item.value}
              </span>
            </article>
          ))}
        </div>

        {/* Pie Chart & Calendar */}
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-3 gap-3 w-full">
          <article className="bg-white h-full w-full rounded-md p-4 flex flex-col justify-between">
            <h2 className="text-dark_200 text-sm font-normal">
              Tickets Sold vs Not Sold
            </h2>
            <div className="w-full flex justify-center items-center my-4">
              <PieChartComponent
                data={[
                  { name: "Tickets sold", value: 70 },
                  { name: "Not sold", value: 30 },
                ]}
              />
            </div>
            <div className="flex items-center gap-4">
              {ticketsData.map((item, index) => (
                <div
                  key={`ticket-data-${index}`}
                  className="flex items-center gap-2"
                >
                  <div className={`${item.color} w-3 h-3 rounded-full`} />
                  <span className="text-grey_100 text-sm font-normal flex-wrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
          <article className="h-full w-full rounded-md overflow-auto">
            <CalendarComponent />
          </article>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-dark_200 font-bold text-base">Upcoming Events</h2>
          <span
            className="cursor-pointer text-secondary_400 font-medium text-sm flex gap-2 items-center"
            aria-label="View more upcoming events"
            onClick={() => navigate("/app/events?eventType=upcoming")}
          >
            View More
            <ArrowRight size="20" color="#E26E00" />
          </span>
        </div>
        <EventCard eventType="upcoming" />
      </section>
    </div>
  );
}
