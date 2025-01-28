/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useTable,
  usePagination,
  Column,
  TableState,
  TableInstance,
} from "react-table";
import SearchInput from "../FormComponents/SearchInput";

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  onSearch: (query: string) => Promise<T[]>;
};

const TableComponent = <T extends object>({ columns, data }: TableProps<T>) => {
  const [tableData] = useState<T[]>(data);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable<T>(
    {
      columns,
      data: tableData,
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
      <div className="mt-5">
        <div className="w-full p-3 bg-white rounded-tl-xl rounded-tr-xl">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto mt-4">
          <table
            {...getTableProps()}
            className="min-w-full text-sm sm:text-base"
          >
            <thead className="bg-secondary_500">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-left p-3 text-dark_200 font-normal text-xs whitespace-nowrap"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
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
                        className={`p-3 text-left text-grey_100 font-normal text-xs`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="w-full flex items-center justify-between mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-center">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TableComponent;
