/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { api } from "../services/api";
import { _handleThrowErrorMessage } from "../utils";
import toast from "react-hot-toast";
import { appUrls } from "../services/urls";

const useFetchWalletDetails = () => {
  const [walletDetails, setWalletDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAmount, setHasAmount] = useState(false);

  const fetchWalletDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls.WALLET_URL);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? null;
        setWalletDetails(result);
        if (result?.balance > 0) return setHasAmount(!hasAmount);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { walletDetails, loading, hasAmount, fetchWalletDetails };
};

export default useFetchWalletDetails;
