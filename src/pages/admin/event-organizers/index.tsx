/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Column } from "react-table";
import { _handleThrowErrorMessage } from "../../../utils";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import DescriptionBar from "../../../components/DescriptionBar";
import TableComponent from "../../../components/TableComponent";
import toast from "react-hot-toast";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/FormComponents/SearchInput";

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
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the single source of truth
  const curPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const query = searchParams.get("email") || "";

  const [organizers, setOrganizers] = useState<AttendeesProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState(query);

  const columns: Column<AttendeesProps>[] = [
    { Header: "First name", accessor: "firstname" },
    { Header: "Last name", accessor: "lastname" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }: any) => renderActions(row.original),
    },
  ];

  const renderActions = (row: AttendeesProps) => {
    const handleViewAction = () =>
      navigate(`/admin/statistics/view-all-event-organizers/${row.id}`, {
        state: row,
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

  // Fetch organizers using URL parameters
  const handleGetEventOrganizers = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("page", String(curPage - 1));
      params.set("size", "10");

      if (query) {
        params.set("email", query);
      }

      const { status, data } = await api.get(
        `${appUrls.GET_ALL_ORGANIZERS}?${params.toString()}`,
      );

      if ([200, 201].includes(status)) {
        const results = data?.data;

        setOrganizers(results?.organizers ?? []);
        setTotalPages(results?.totalPages ?? 1);
      }
    } catch (error: any) {
      toast.error(_handleThrowErrorMessage(error?.response?.data?.message));
    } finally {
      setLoading(false);
    }
  }, [curPage, query]);

  // Fetch whenever URL parameters change
  useEffect(() => {
    handleGetEventOrganizers();
  }, [handleGetEventOrganizers]);

  // Debounce search and synchronize it with URL

  useEffect(() => {
    const trimmedSearch = searchInput.trim();

    // Don't reset pagination if search hasn't changed
    if (trimmedSearch === query) return;

    const timeout = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);

          if (trimmedSearch) {
            params.set("email", trimmedSearch);
          } else {
            params.delete("email");
          }

          params.set("page", "1");

          return params;
        },
        { replace: true },
      );
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchInput, query, setSearchParams]);

  // Keep input synchronized with browser back/forward navigation
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(page));
      return params;
    });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <DescriptionBar text="All Event Organizers 🌟" />
      </div>

      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search Organizers by Email"
      />

      <TableComponent
        isLoading={loading}
        columns={columns}
        data={organizers}
        setPage={handlePageChange}
        totalPages={totalPages}
      />

      <div className="w-full flex justify-center mt-2">
        <Pagination
          totalPages={totalPages}
          currentPage={curPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
