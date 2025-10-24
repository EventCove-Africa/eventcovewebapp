import { useEffect } from "react";
import PendingWithdrawal from "../components/PendingWithdrawal";
import RevenueChart from "../components/RevenueChart";
import StatsCards from "../components/StatsCards";
import useGetMetricsStats from "../../../hooks/useGetMetrics";

export default function Statistics() {
  const { handleGetMetrics, stats, loading } = useGetMetricsStats();

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetMetrics();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [handleGetMetrics]);

  return (
    <div className="w-full h-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCards details={stats} loading={loading} />
      </div>
      <div className="w-full mt-6 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/5">
          <RevenueChart
            data={stats?.revenueData}
            totalRevenue={stats?.totalEventCoveProfit}
          />
        </div>
        <div className="w-full lg:w-2/5 bg-white rounded-lg p-4 shadow-sm">
          <PendingWithdrawal />
        </div>
      </div>
    </div>
  );
}
