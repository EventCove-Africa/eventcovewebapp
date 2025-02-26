/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { _handleThrowErrorMessage } from "../utils";
import toast from "react-hot-toast";
import { appUrls } from "../services/urls";

// Define TypeScript interfaces (optional)

type BankValue = {
  ussd: string;
  slug: string;
  code: string;
  label: string;
};

interface Bank {
  push(arg0: {
    label: any;
    icon: any;
    value: { ussd: any; slug: any; code: any; name: any };
  }): unknown;
  label: string;
  icon: string;
  value: BankValue;
}

const useFetchBanks = () => {
  const [banks, setBanks] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchBanks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls.GET_BANK_LIST_URL);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? null;
        const formatted_data = [] as unknown as Bank;
        for (let index = 0; index < result.length; index++) {
          const res = result[index];
          formatted_data.push({
            label: res?.name || "N/A",
            icon: res?.logo || "",
            value: {
              ussd: res?.ussd,
              slug: res?.slug,
              code: res?.code,
              name: res?.name,
            },
          });
        }
        setBanks(formatted_data);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchBanks();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchBanks]);

  return { banks, loading, refetch: fetchBanks };
};

export default useFetchBanks;
