/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../utils";
import { useCallback, useState } from "react";
import { api } from "../services/api";
import { appUrls } from "../services/urls";
import { useUser } from "../context/UserDetailsProvider.tsx";
import { useUserProps } from "../types/generalTypes.tsx";

type statsProps = {
  totalAttendees: number;
  totalEvents: number;
  totalSales: number;
  totalTicketsPurchase: number;
  totalReferralCount: number;
};

const useGetOrganizerStats = () => {
  const [stats, setStats] = useState<statsProps>();
  const [loading, setLoading] = useState(false);
  const { userDetails } = useUser() as useUserProps;
  const organizerId = userDetails?.id;

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        appUrls.GET_USER_STATISTICS_URL + `/${organizerId}`
      );
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
  }, [organizerId]);

  return { stats, loading, fetchStatistics };
};

export default useGetOrganizerStats;
