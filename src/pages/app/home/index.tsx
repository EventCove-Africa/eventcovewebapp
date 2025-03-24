import { useNavigate } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import Button from "../../../components/FormComponents/Button";

import EventCard from "../../../components/EventCard";
import { useEffect } from "react";
import useGetOrganizerStats from "../../../hooks/useGetOrganizerStats";
import Statistics from "./components/Statistics";

export default function Home() {
  const navigate = useNavigate();
  const { fetchStatistics, stats, loading } = useGetOrganizerStats();

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchStatistics();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchStatistics]);

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
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="lg:h-[236.92px] h-auto w-full flex lg:flex-row flex-col md:gap-3 gap-3 my-8">
        <Statistics details={stats} loading={loading}  />
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
