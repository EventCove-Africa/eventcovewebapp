/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useTable,
  usePagination,
  Column,
  TableState,
  TableInstance,
} from "react-table";
// import SearchInput from "../FormComponents/SearchInput";
import Pagination from "../Pagination";
import empty_state from "../../assets/images/empty_state.svg";
import { isArrayEmpty } from "../../utils";
import SkeletonLoader from "../EventCard/components/SkeletonLoader";

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  showPagination?: boolean;
  isLoading?: boolean;
  totalPages?: number;
  setPage?: (props: number) => void;
  // onSearch?: (query: string) => Promise<T[]>;
};

const TableComponent = <T extends object>({
  columns,
  data,
  showPagination = true,
  isLoading,
  totalPages,
  setPage,
}: TableProps<T>) => {
  // const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page: number) => {
    setPage?.(page);
  };

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable<T>(
      {
        columns,
        data,
        initialState: { pageIndex: 0 } as TableState<T>,
      },
      usePagination
    ) as TableInstance<T> & {
      page: any[];
      canPreviousPage: boolean;
      canNextPage: boolean;
      pageOptions: number[];
      nextPage: () => void;
      previousPage: () => void;
      setPageSize: (size: number) => void;
      state: { pageIndex: number };
    };

  return (
    <>
      {/* <div className="mt-5 w-full p-3 bg-white rounded-tl-xl rounded-tr-xl">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      {/* Scroll container for mobile */}
      <div className="overflow-x-auto overflow-hidden">
        <table
          {...getTableProps()}
          className="min-w-full text-sm sm:text-base mt-4"
        >
          <thead className="bg-secondary_500 mb-3">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-left text-xs sm:text-sm py-2 px-4 text-dark_200 font-normal whitespace-nowrap"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {!isLoading && (
            <tbody {...getTableBodyProps()} className="w-full mt-3">
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-100 bg-white my-4 whitespace-nowrap"
                  >
                    {row.cells.map((cell: any) => (
                      <td
                        {...cell.getCellProps()}
                        className="py-2 px-4 text-left text-dark_300 font-normal md:text-sm text-xs"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {isLoading && (
          <SkeletonLoader count={3} className="py-2 px-4 h-auto my-2" />
        )}
      </div>
      <div className="w-full flex justify-center">
        {!isLoading && isArrayEmpty(data) && (
          <img
            className="w-[250px] h-[250px]"
            src={empty_state}
            alt="empty_state"
          />
        )}
      </div>
      {!isLoading && showPagination && (
        <div className="w-full flex justify-center items-center mt-8">
          <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  );
};

export default TableComponent;
