import React from "react";
import {
  useTable,
  usePagination,
  Column,
  TableState,
  TableInstance,
} from "react-table";
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
};

const TableComponent = <T extends object>({
  columns,
  data,
  showPagination = true,
  isLoading,
  totalPages,
  setPage,
}: TableProps<T>) => {
  type PropsWithKey<T> = T & { key?: React.Key };

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
      usePagination,
    ) as TableInstance<T> & {
      page: import("react-table").Row<T>[];
      canPreviousPage: boolean;
      canNextPage: boolean;
      pageOptions: number[];
      nextPage: () => void;
      previousPage: () => void;
      setPageSize: (size: number) => void;
      state: { pageIndex: number };
    };

  const tableProps = getTableProps() as PropsWithKey<
    React.TableHTMLAttributes<HTMLTableElement>
  >;
  const { key: tableKey, ...tableRest } = tableProps || {};

  return (
    <>
      <div className="overflow-x-auto overflow-hidden">
        <table
          key={tableKey}
          {...(tableRest as React.TableHTMLAttributes<HTMLTableElement>)}
          className="min-w-full text-sm sm:text-base mt-4"
        >
          <thead className="bg-secondary_500 mb-3">
            {headerGroups.map((headerGroup) => {
              const hgProps = headerGroup.getHeaderGroupProps() as PropsWithKey<
                React.HTMLAttributes<HTMLTableRowElement>
              >;
              const { key: hgKey, ...hgRest } = hgProps || {};
              return (
                <tr key={hgKey} {...(hgRest as React.HTMLAttributes<HTMLTableRowElement>)}>
                  {headerGroup.headers.map((column) => {
                    const colProps = column.getHeaderProps() as PropsWithKey<
                      React.ThHTMLAttributes<HTMLTableHeaderCellElement>
                    >;
                    const { key: colKey, ...colRest } = colProps || {};
                    return (
                      <th
                        key={colKey}
                        {...(colRest as React.ThHTMLAttributes<HTMLTableHeaderCellElement>)}
                        className="text-left text-xs sm:text-sm py-2 px-4 text-dark_200 font-normal whitespace-nowrap"
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          {!isLoading && (() => {
            const tbProps = getTableBodyProps() as PropsWithKey<
              React.HTMLAttributes<HTMLTableSectionElement>
            >;
            const { key: tbKey, ...tbRest } = tbProps || {};
            return (
              <tbody
                key={tbKey}
                {...(tbRest as React.HTMLAttributes<HTMLTableSectionElement>)}
                className="w-full mt-3"
              >
                {page.map((row) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps() as PropsWithKey<
                    React.HTMLAttributes<HTMLTableRowElement>
                  >;
                  const { key: rowKey, ...rowRest } = rowProps || {};
                  return (
                    <tr
                      key={rowKey}
                      {...(rowRest as React.HTMLAttributes<HTMLTableRowElement>)}
                      className="hover:bg-gray-100 bg-white my-4 whitespace-nowrap"
                    >
                      {row.cells.map((cell) => {
                        const cellProps = cell.getCellProps() as PropsWithKey<
                          React.TdHTMLAttributes<HTMLTableDataCellElement>
                        >;
                        const { key: cellKey, ...cellRest } = cellProps || {};
                        return (
                          <td
                            key={cellKey}
                            {...(cellRest as React.TdHTMLAttributes<HTMLTableDataCellElement>)}
                            className="py-2 px-4 text-left text-dark_300 font-normal md:text-sm text-xs"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            );
          })()}
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