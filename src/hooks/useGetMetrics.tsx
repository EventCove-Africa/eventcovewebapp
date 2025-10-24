/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../utils";
import { useCallback, useState } from "react";
import { api } from "../services/api";
import { appUrls } from "../services/urls";

type metricProps = {
  totalNumberOfCompletedEvents: number;
  totalNumberOfPendingEvents: number;
  totalNumberOfPublishedEvents: number;
  totalPaidTicketsSold: number;
  totalFreeTicketsSold: number;
  totalEventCoveProfit: number;
  totalSalesValue: number;
  revenueData: {
    month: string;
    value: number;
  }[];
};

const useGetMetricsStats = () => {
  const [stats, setStats] = useState<metricProps>();
  const [loading, setLoading] = useState(false);

  const handleGetMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls.METRICS_URL + `?graphYear=2025`);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? null;
        setStats(result);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading, handleGetMetrics };
};

export default useGetMetricsStats;
