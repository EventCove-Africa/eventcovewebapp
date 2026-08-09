/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import { _handleThrowErrorMessage } from "../../../utils";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import DescriptionBar from "../../../components/DescriptionBar";
import TableComponent from "../../../components/TableComponent";
import toast from "react-hot-toast";

type AttendeesProps = {
  email: string;
  firstname: string;
  lastname: string;
  id: string;
  balance: number;
  actions: React.ReactElement;
};

export default function EventOrganizers() {
  const navigate = useNavigate();
  const [organizers, setOrganizers] = useState<AttendeesProps[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const columns: Column<AttendeesProps>[] = [
    { Header: "First name", accessor: "firstname" },
    { Header: "Last name", accessor: "lastname" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => renderActions(row.original), // Return JSX here
    },
  ];

  const renderActions = (_row: AttendeesProps) => {
    const organizerId = _row?.id;

    const handleViewAction = () =>
      navigate(`/admin/statistics/view-all-event-organizers/${organizerId}`, {
        state: _row,
      });

    return (
      <div className="flex space-x-2">
        <button
          onClick={handleViewAction}
          className="text-primary_100 px-2 py-1 rounded-md cursor-pointer"
        >
          View events
        </button>
      </div>
    );
  };

  const handleGetEventOrganizers = useCallback(async () => {
    setLoading(true);
    try {
      const { status, data } = await api.get(
        appUrls.GET_ALL_ORGANIZERS + `?page=${curPage}&size=10`,
      );
      if ([200, 201].includes(status)) {
        const results = data?.data;
        setOrganizers(results?.organizers);
        setTotalPages(results?.totalPages);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  }, [curPage]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetEventOrganizers();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [handleGetEventOrganizers]);

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <DescriptionBar text="All Event Organizers 🌟" />
      </div>
      <TableComponent
        isLoading={loading}
        columns={columns}
        data={organizers}
        setPage={(number) => setCurPage(number)}
        totalPages={totalPages}
        showPagination={true}
      />
    </div>
  );
}
