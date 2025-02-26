/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { _handleThrowErrorMessage } from "../utils";
import toast from "react-hot-toast";
import { appUrls } from "../services/urls";

const useEventHook = () => {
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchEventCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls.EVENT_URL + "/categories");
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? null;
        const formatted_data = [];
        for (let index = 0; index < result.length; index++) {
          const res = result[index];
          formatted_data.push({
            label: res,
            value: res,
          });
        }
        setCategories(formatted_data);
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
        fetchEventCategories();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchEventCategories]);

  return { categories, loading, refetch: fetchEventCategories };
};

export default useEventHook;
