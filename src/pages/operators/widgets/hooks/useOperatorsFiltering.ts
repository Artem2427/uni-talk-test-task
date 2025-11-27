import { useMemo } from "react";
import type { MergedRow } from "../OperatorsTable";
import type { WorkingStatus } from "@store/operator-slice";

interface UseOperatorsFilteringParams {
  rows: MergedRow[];
  searchQuery: string;
  workingStatus: WorkingStatus;
  sortField: string | null;
  sortDirection: "asc" | "desc" | null;
  currentPage: number;
  pageSize: number;
}

export const useOperatorsFiltering = ({
  rows,
  searchQuery,
  workingStatus,
  sortField,
  sortDirection,
  currentPage,
  pageSize,
}: UseOperatorsFilteringParams) => {
  const filteredRows = useMemo(() => {
    let result = rows;

    if (searchQuery) {
      result = result.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (workingStatus !== "all") {
      result = result.filter((row) =>
        workingStatus === "working" ? row.isWorking : !row.isWorking
      );
    }

    return result;
  }, [rows, searchQuery, workingStatus]);

  const sortedRows = useMemo(() => {
    if (!sortField || !sortDirection) return filteredRows;

    console.log(sortField, "sortField");

    return [...filteredRows].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === "boolean") {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortField, sortDirection]);

  const totalRows = sortedRows.length;
  const paginatedRows = sortedRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return { filteredRows, sortedRows, paginatedRows, totalRows };
};
