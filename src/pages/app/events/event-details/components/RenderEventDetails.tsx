/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar2, Notepad2, TimerPause, User } from "iconsax-react";
import {
  arrayToFormattedDateWithYear,
  eventTypeStyles,
  formatTimeToshowAmPm,
} from "../../../../../utils";
import CopyToClipboard from "../../../../../components/CopyToClipboard";

export default function RenderEventDetails({
  allEventDetails,
  classNameImageBannerLoader,
  classNameGridEventDetails,
  loadingEventDetails,
}: any) {
  if (loadingEventDetails) return null;
  return (
    <>
      <div className="w-full relative">
        <img
          src={allEventDetails?.eventImageUrl}
          alt={`${allEventDetails.eventName} banner`}
          className={`rounded-xl object-fit w-full ${classNameImageBannerLoader}`}
          style={{ width: "100%" }}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div
            className={`px-3 py-2 ${
              eventTypeStyles[
                allEventDetails?.deleted
                  ? "deleted"
                  : allEventDetails?.status || "upcoming"
              ]
            } text-xs font-normal rounded-md capitalize`}
          >
            {allEventDetails?.deleted ? "Deleted" : allEventDetails?.status}
          </div>
        </div>
      </div>
      <div className="w-full flex sm:flex-row flex-col justify-between items-center">
        <div className="flex flex-col gap-1 w-full mt-4">
          <h3 className="text-dark_200 font-medium md:text-base text-sm">
            {allEventDetails.eventName}
          </h3>
          <p className="text-secondary_300 font-normal text-xs">
            {allEventDetails?.location}{" "}
            {allEventDetails?.eventVenueType?.toLowerCase() == "physical" &&
              allEventDetails?.city}
          </p>
        </div>
        {["private"]?.includes(allEventDetails?.eventPrivacy?.toLowerCase()) && (
          <div className="w-full font-semibold justify-end flex items-center gap-2 md:text-sm text-xs">
            Passcode:
            <span className="font-bold">{allEventDetails?.passCode}</span>
          </div>
        )}
      </div>
      <div className={classNameGridEventDetails}>
        <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
          <Calendar2 size="20" color="#429EFF" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Start Date</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {arrayToFormattedDateWithYear(allEventDetails?.startDate || [])}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
          <Calendar2 size="20" color="#429EFF" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">End Date</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {arrayToFormattedDateWithYear(allEventDetails?.endDate || [])}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
          <Notepad2 size="20" color="#82476E" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Event Privacy</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {allEventDetails?.eventPrivacy}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
          <TimerPause size="20" color="#FA43AF" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Start Time</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {formatTimeToshowAmPm(allEventDetails?.startTime || "24:00")}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md p-2 flex gap-2 items-center">
          <TimerPause size="20" color="#FA43AF" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">End Time</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {formatTimeToshowAmPm(allEventDetails?.endTime || "24:00")}
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
              {allEventDetails?.phoneNumber}
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-dark_200 font-normal text-sm">Event Details</h3>
        <div className="h-auto max-h-[200px] overflow-auto bg-grey_500 p-3 text-grey_100 font-normal text-sm">
          {allEventDetails?.eventDescription}
        </div>
      </div>
      {allEventDetails?.published && (
        <div className="mt-2">
          <h3 className="text-grey_100 font-normal text-xs">
            Share the event link with others!
          </h3>
          <div className="w-full h-auto rounded-lg bg-primary_300 p-3 flex justify-between items-center border border-dotted border-grey_100 text-primary_100 mt-2 font-normal text-sm flex-wrap">
            {allEventDetails?.eventUrl}
            <CopyToClipboard
              text={allEventDetails?.eventUrl}
              size="20"
              color="text-primary_100"
            />
          </div>
        </div>
      )}
    </>
  );
}
