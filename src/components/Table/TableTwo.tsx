import clsx from "clsx";
import React, { useRef, useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { ErrorBoundary } from "../../shared_components/ErrorBoundary";
import Spinner from "../spinner/Spinner";

export interface ITableProps {
  tableData: object[] | [];
  tableColumns: {
    Header: string;
    accessor: string;
    Cell?: (value: any) => any;
  }[];
  loading: boolean;
}

export const TableTwo = ({
  tableColumns,
  tableData,
  ...props
}: ITableProps) => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { hiddenColumns: ["id"] },
    },
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;
  return (
    <ErrorBoundary>
      <div
        className={clsx([
          "flex flex-col relative overflow-y-hidden w-full h-full bg-white rounded-lg",
        ])}
      >
        <div className="flex-1 overflow-hidden relative">
          {props.loading && (
            <div className="absolute top-0 w-full  z-10 text-center">
              <Spinner />
            </div>
          )}

          <div className="h-full w-full overflow-auto  relative ">
            <table
              className="table table-auto w-full border-collapse text-mid-night-80"
              {...getTableProps()}
            >
              <thead className=" sticky top-0">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))}
              </thead>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
