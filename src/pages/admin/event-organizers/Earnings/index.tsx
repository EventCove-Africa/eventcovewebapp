/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";
import {
  _handleThrowErrorMessage,
  formatToNairaShortenFigure,
} from "../../../../utils";
import toast from "react-hot-toast";
import DescriptionBar from "../../../../components/DescriptionBar";

type EarningsProps = {
  eventId: number;
  eventName: string;
  eventCoveProfit: number;
  organizerProfit: number;
};

export default function Earnings() {
  const { eventId } = useParams();
  const [earnings, setEarnings] = useState<EarningsProps>({
    eventId: 0,
    eventName: "",
    eventCoveProfit: 0,
    organizerProfit: 0,
  });

  const handleGetEventCoveOrganizerEarnings = useCallback(async () => {
    try {
      const { status, data } = await api.get(
        appUrls.GET_EVENTCOVE_EVENT_PROFIT + `/${eventId}`,
      );
      if ([200, 201].includes(status)) {
        const result = data?.data;
        setEarnings(result);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    }
  }, [eventId]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEventCoveOrganizerEarnings();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [handleGetEventCoveOrganizerEarnings]);

  return (
    <>
      <DescriptionBar text="View Event Earnings 🌟" />
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="p-4 sm:p-6">
          {/* Event heading */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Event
              </p>

              <h3 className="mt-1 truncate text-lg font-semibold text-slate-900 sm:text-xl">
                {earnings?.eventName || 'N/A'}
              </h3>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 sm:h-10 sm:w-10 sm:text-sm">
              {earnings?.eventId}
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-slate-100 sm:my-6" />

          {/* Metrics */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                EventCove Profit
              </p>

              <p className="mt-1.5 text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl">
                {formatToNairaShortenFigure(earnings.eventCoveProfit)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Organizer Profit
              </p>

              <p className="mt-1.5 text-xl font-bold text-slate-900 sm:mt-2 sm:text-2xl">
                {formatToNairaShortenFigure(earnings?.organizerProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
