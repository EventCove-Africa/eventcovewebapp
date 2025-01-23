import DescriptionBar from "../../../../components/DescriptionBar";
import { eventTypeStyles, formatToNaira } from "../../../../utils";
import upcoming_event_bg from "../../../../assets/images/upcoming_event_bg.png";
import {
  Briefcase,
  Calendar2,
  Crown1,
  Money4,
  Notepad2,
  Teacher,
  Ticket,
  TimerPause,
  User,
} from "iconsax-react";
import Button from "../../../../components/FormComponents/Button";

export default function EventDetails() {
  return (
    <div className="w-full h-full">
      <DescriptionBar text="Get the full picture of your event 🌟" />
      <div className="w-full flex lg:flex-row flex-col gap-4">
        <div className="bg-white w-full h-full rounded-xl p-3">
          <div className="w-full relative">
            <img
              src={upcoming_event_bg}
              alt={`banner`}
              className="rounded-xl object-contain w-full"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <div
                className={`px-3 py-2 ${eventTypeStyles["upcoming"]} text-xs font-normal rounded-md capitalize`}
              >
                Upcoming
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full mt-4">
            <h3 className="text-dark_200 font-medium md:text-base text-sm">
              🎉 Get Ready for an Unforgettable House Party! 🎉
            </h3>
            <p className="text-secondary_300 font-normal text-xs">
              Eko hotel,Lagos, Nigeria
            </p>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-4">
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <Calendar2 size="20" color="#429EFF" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">
                  Start Date
                </h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  Sun 12 Jun 2023
                </h5>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <Calendar2 size="20" color="#429EFF" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">End Date</h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  Sun 12 Jun 2023
                </h5>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <Notepad2 size="20" color="#82476E" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">
                  Event Privacy
                </h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  Public
                </h5>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <TimerPause size="20" color="#FA43AF" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">
                  Start Time
                </h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  9:AM
                </h5>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <TimerPause size="20" color="#FA43AF" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">End Time</h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  12:AM
                </h5>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
              <User size="20" color="#A30162" />
              <div className="flex flex-col gap-1">
                <h3 className="text-grey_100 text-xs font-normal">
                  Organizer Phone Number
                </h3>
                <h5 className="text-dark_200 font-normal md:text-base text-sm">
                  09012345678
                </h5>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-dark_200 font-normal text-sm">Event Details</h3>
            <div className="h-auto bg-grey_500 p-3 text-grey_100 font-normal text-sm">
              We’re turning up the vibes and making this a night to remember!
              Join us for an epic house party filled with good music, great
              company, and plenty of fun. Here’s everything you need to know:
            </div>
          </div>
        </div>
        <div className="bg-white w-full rounded-xl h-fit p-3">
          <h3 className="text-sm font-normal text-dark_200">Tickets</h3>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-4">
            <div className="bg-grey_500 rounded-md p-2 flex flex-col justify-between">
              <div className="flex gap-2 items-center">
                <Teacher size="20" color="#4242FD" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Early bird
                  </h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    {formatToNaira(0)}
                  </h5>
                </div>
              </div>
              <div className="self-end font-medium md:text-base text-sm text-grey_100">
                200/
                <span className="font-medium md:text-base text-sm text-dark_200">
                  500
                </span>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex flex-col justify-between">
              <div className="flex gap-2 items-center">
                <Briefcase size="20" color="#4242FD" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Standard
                  </h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    {formatToNaira(0)}
                  </h5>
                </div>
              </div>
              <div className="self-end font-medium md:text-base text-sm text-grey_100">
                200/
                <span className="font-medium md:text-base text-sm text-dark_200">
                  500
                </span>
              </div>
            </div>
            <div className="bg-grey_500 rounded-md p-2 flex flex-col justify-between">
              <div className="flex gap-2 items-center">
                <Crown1 size="20" color="#4242FD" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">Vip</h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    {formatToNaira(0)}
                  </h5>
                </div>
              </div>
              <div className="self-end font-medium md:text-base text-sm text-grey_100">
                200/
                <span className="font-medium md:text-base text-sm text-dark_200">
                  500
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-4">
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Total Revenue
                </h4>
                <Money4 size="24" color="#4CAF50" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">
                {formatToNaira(0)}
              </h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Total Ticket
                </h4>
                <Ticket size="24" color="#A30162" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">0</h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Sold Ticket
                </h4>
                <Ticket size="24" color="#6100FF" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">0</h3>
            </div>
            <div className="w-full bg-grey_500 p-3">
              <div className="flex justify-between">
                <h4 className="text-grey_100 text-sm font-normal">
                  Refunded Ticket
                </h4>
                <Ticket size="24" color="#F44336" />
              </div>
              <h3 className="text-dark_400 font-bold md:text-2xl text-xl">0</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Button
          title="Publish Event"
          type="button"
          // onClick={() => navigate("/app/events/add")}
        />
        <Button
          title="Edit Event"
          type="button"
          backgroundColor="bg-primary_300"
          textColor="text-primary_100"
          className="border border-dark_100"
          // onClick={() => navigate("/app/events/add")}
        />
      </div>
    </div>
  );
}
