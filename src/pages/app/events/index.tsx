import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/FormComponents/Button";
import EventCard from "../../../components/EventCard";

export default function Events() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameter for eventType
  const params = new URLSearchParams(location.search);
  const eventType = params.get("eventType");

  const events = [
    { label: "All Events", type: "all" },
    { label: "Upcoming Events", type: "upcoming" },
    { label: "Completed Events", type: "completed" },
    { label: "Cancelled Events", type: "cancelled" },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <h3 className="text-dark_200 text-base font-normal">
          Here’s what you’ve got going on 🔔
        </h3>
        <div>
          <Button
            backgroundColor="bg-primary_300"
            textColor="text-primary_100"
            title="Create Event"
            type="button"
            onClick={() => navigate("/app/events/add")}
          />
        </div>
      </div>
      <nav
        className="w-full bg-white px-4 py-2 flex justify-around mt-3"
        aria-label="Event navigation"
      >
        {events.map((event) => (
          <h3
            key={event.type}
            onClick={() => navigate(`/app/events?eventType=${event.type}`)}
            className={`text-sm font-normal cursor-pointer ${
              eventType === event.type ? "text-primary_100" : "text-grey_100"
            }`}
          >
            {event.label}
          </h3>
        ))}
      </nav>
      <div className="w-full grid md:grid-cols-3 gap-3 mt-4">
        <EventCard />
      </div>
    </div>
  );
}
