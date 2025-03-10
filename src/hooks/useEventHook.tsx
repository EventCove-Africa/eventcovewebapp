/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { api } from "../services/api";
import { _handleThrowErrorMessage } from "../utils";
import toast from "react-hot-toast";
import { appUrls } from "../services/urls";
import { useUser } from "../context/UserDetailsProvider.tsx";
import { eventSalesStatsProps, useUserProps } from "../types/generalTypes.tsx";

type ticketDetailsProps = {
  ticketType: string;
  colour: string;
  price: number;
  validatedCount: number;
  soldCount: number;
  capacity: number;
};

type ticketTypesProps = {
  totalTicketsSold: number;
  totalTicketsValidated: number;
  ticketDetails: ticketDetailsProps[];
};

const useEventHook = () => {
  const { userDetails } = useUser() as useUserProps;
  const [categories, setCategories] = useState<any>();
  const [allEventsData, setAllEventsData] = useState<any[]>([]);
  const [eventTeamMembers, setEventTeamMembers] = useState<any>([]);
  const [eventTeamMembersUrl, setEventTeamMembesUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allEventDetails, setEventDetails] = useState<any>({});
  const [loadingEventDetails, setLoadingEventDetails] = useState({
    event: false,
    publish: false,
    export: false,
    delete: false,
    sales: false,
    ticketType: false,
  });
  const [eventSalesStats, setEventSalesStats] =
    useState<eventSalesStatsProps>();
  const [ticketTypes, setTicketTypes] = useState<ticketTypesProps | null>(null);

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

  // const handleGetFilteredEvents = useCallback(
  //   async (eventType?: string | undefined | null) => {
  //     setLoadingEvents(true);
  //     const event_Type = eventType !== "all" ? `&status=${eventType}` : "";
  //     try {
  //       const { status, data } = await api.get(
  //         appUrls.EVENT_URL +
  //           `/all?page=${curPage}&size=10&organizerId=${userDetails?.id}${event_Type}`
  //       );
  //       const results = data?.data;
  //       if ([200, 201].includes(status)) {
  //         setAllEventsData(results?.events || []);
  //         setTotalPages(results?.totalPages);
  //       }
  //     } catch (error: any) {
  //       toast.error(_handleThrowErrorMessage(error?.data?.message));
  //     } finally {
  //       setLoadingEvents(false);
  //     }
  //   },
  //   [userDetails?.id, curPage]
  // );

  // In useEventHook.ts - Update handleGetFilteredEvents

  const handleGetFilteredEvents = useCallback(
    async (eventType?: string | undefined | null) => {
      setLoadingEvents(true);
      const event_Type = eventType !== "all" ? `&status=${eventType}` : "";
      try {
        const { status, data } = await api.get(
          appUrls.EVENT_URL +
            `/all?page=${curPage}&size=9&organizerId=${userDetails?.id}${event_Type}`
        );
        const results = data?.data;
        if ([200, 201].includes(status)) {
          if (curPage === 1) {
            setAllEventsData(results?.events || []);
          } else {
            setAllEventsData((prev) => [...prev, ...(results?.events || [])]);
          }
          setTotalPages(results?.totalPages);
        }
      } catch (error: any) {
        toast.error(_handleThrowErrorMessage(error?.data?.message));
      } finally {
        setLoadingEvents(false);
      }
    },
    [userDetails?.id, curPage]
  );

  const handleGetEventDetails = async (event_id: string | undefined) => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      event: true,
    }));
    try {
      const { status, data } = await api.get(
        appUrls.EVENT_URL + `/${event_id}`
      );
      const results = data?.data;
      if ([200, 201].includes(status)) {
        setEventDetails(results);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        event: false,
      }));
    }
  };

  const handleGetEventTeamMembers = async (event_id: string | undefined) => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      event: !loadingEventDetails?.event,
    }));
    try {
      const { status, data } = await api.get(
        appUrls.EVENT_URL + `/fetch/members/${event_id}`
      );
      const results = data?.data?.eventTeamMembers;
      const eventUrl = data?.data?.eventUrl;
      if ([200, 201].includes(status)) {
        setEventTeamMembers(results);
        setEventTeamMembesUrl(eventUrl);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        event: !!loadingEventDetails?.event,
      }));
    }
  };

  const handleGetEventTicketSalesStats = async (
    event_id: string | undefined
  ) => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      sales: true,
    }));
    try {
      const { status, data } = await api.get(
        appUrls.EVENT_TICKET_SALES_URL + `/${event_id}`
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        const totalTicketBuyers = result?.totalTicketBuyers || 0;
        const totalTicketNotValidated = result?.totalTicketNotValidated || 0;
        const totalTicketSales = result?.totalTicketSales || 0;
        const totalTicketSold = result?.totalTicketSold || 0;
        const totalTicketValidated = result?.totalTicketValidated || 0;
        setEventSalesStats({
          totalTicketBuyers,
          totalTicketNotValidated,
          totalTicketSales,
          totalTicketSold,
          totalTicketValidated,
        });
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        sales: false,
      }));
    }
  };

  const handleGetEventTicketTypeDetails = async (
    event_id: string | undefined
  ) => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      ticketType: true,
    }));
    try {
      const { status, data } = await api.get(
        appUrls.TICKET_TYPE_URL + `/${event_id}`
      );
      const result = data?.data;
      if ([200, 201].includes(status)) {
        setTicketTypes(result);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.data?.message));
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        ticketType: false,
      }));
    }
  };

  return {
    categories,
    loading,
    loadingEvents,
    fetchEventCategories,
    handleGetFilteredEvents,
    handleGetEventDetails,
    handleGetEventTicketSalesStats,
    handleGetEventTicketTypeDetails,
    ticketTypes,
    eventSalesStats,
    allEventDetails,
    loadingEventDetails,
    setLoadingEventDetails,
    handleGetEventTeamMembers,
    eventTeamMembersUrl,
    eventTeamMembers,
    allEventsData,
    setCurPage,
    curPage,
    totalPages,
  };
};

export default useEventHook;
