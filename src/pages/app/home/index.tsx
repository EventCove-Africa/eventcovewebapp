import { useNavigate } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import Button from "../../../components/FormComponents/Button";
import EventCard from "../../../components/EventCard";
import { useEffect } from "react";
import useGetOrganizerStats from "../../../hooks/useGetOrganizerStats";
import Statistics from "./components/Statistics";
import { useUserProps } from "../../../types";
import { useUser } from "../../../context/UserDetailsProvider.tsx";

function CircularProgress({
  value = 0,
  size = 48,
  stroke = 4,
}: {
  value?: number;
  size?: number;
  stroke?: number;
}) {
  const val = Math.max(0, Math.min(100, Math.round(value || 0)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (val / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Profile completion ${val} percent`}
      >
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A30162" />
            <stop offset="100%" stopColor="#A30162" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EDEDED"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="none"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={size * 0.32}
          fill="#333"
          className="font-medium text-xs"
        >
          {val}%
        </text>
      </svg>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { fetchStatistics, stats, loading } = useGetOrganizerStats();
  const { userDetails } = useUser() as useUserProps;

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
      <header className="flex flex-col md:flex-row gap-3 md:items-start justify-between">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-grey_100 md:text-base text-sm font-normal">
            Hey, welcome to Event Cove! 🌊{" "}
            {`${
              !loading && !stats?.totalEvents
                ? "Tap Create Event to get started!"
                : ""
            }`}
          </h1>
          <div className="w-full flex flex-wrap justify-between items-center gap-2">
            <Button
              title="Create Event"
              type="button"
              onClick={() => navigate("/app/events/add")}
            />
          </div>
        </div>

        {userDetails?.profileCompletionLevel !== 100 ? (
          <>
            <div className="flex gap-2 w-full md:justify-end justify-end items-center">
              <CircularProgress
                value={userDetails?.profileCompletionLevel ?? 0}
                size={50}
                stroke={3}
              />
              <h2 className="text-grey_100 text-[11px] font-normal">
                Profile completion
                <span
                  className="text-primary_100 font-medium ml-1 cursor-pointer hover:underline"
                  onClick={() => navigate("/app/wallet")}
                  aria-label="Complete profile now"
                >
                  complete now
                </span>
              </h2>
            </div>
          </>
        ) : null}
      </header>

      {/* Statistics Section */}
      <section className="lg:h-[236.92px] h-auto w-full flex lg:flex-row flex-col md:gap-3 gap-3 my-8">
        <Statistics details={stats} loading={loading} />
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
