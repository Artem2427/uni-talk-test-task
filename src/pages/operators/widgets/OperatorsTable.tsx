import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import type { Operator } from "@entities/operators/model";
import * as S from "../styles";

export interface MergedRow extends Operator {
  "#": number;
  [key: string]: any;
}

export interface TableColumn {
  field: string;
  header: string;
  type: "static" | "dynamic";
  sortable?: boolean;
}

interface OperatorsTableProps {
  columns: TableColumn[];
  paginatedRows: MergedRow[];
  sortField: string | null;
  sortDirection: "asc" | "desc" | null;
  currentPage: number;
  pageSize: number;
  totalRows: number;
  activeFiltersCount: number;
  onSort: (field: string) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OperatorsTable: React.FC<OperatorsTableProps> = ({
  columns,
  paginatedRows,
  sortField,
  sortDirection,
  currentPage,
  pageSize,
  totalRows,
  activeFiltersCount,
  onSort,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    if (sortDirection === "asc") return "↑";
    if (sortDirection === "desc") return "↓";
    return null;
  };

  return (
    <>
      <S.StyledTableContainer component="div">
        <S.StyledTable stickyHeader aria-label="sticky table">
          <S.StyledTableHead>
            <S.StyledTableRowHeader>
              {columns.map((col) => (
                <S.StyledTableCell
                  key={col.field}
                  onClick={() => col.sortable && onSort(col.field)}
                  sx={{
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {col.header}
                    {col.sortable && (
                      <span
                        style={{ opacity: getSortIcon(col.field) ? 1 : 0.3 }}
                      >
                        {getSortIcon(col.field) || "↕"}
                      </span>
                    )}
                  </Box>
                </S.StyledTableCell>
              ))}
            </S.StyledTableRowHeader>
          </S.StyledTableHead>

          <S.StyledTableBody>
            {paginatedRows.length === 0 ? (
              <S.StyledTableRow>
                <S.StyledTableCell colSpan={columns.length}>
                  <S.EmptyState>
                    {activeFiltersCount > 0
                      ? "Нічого не знайдено за вказаними фільтрами"
                      : "Немає операторів"}
                  </S.EmptyState>
                </S.StyledTableCell>
              </S.StyledTableRow>
            ) : (
              paginatedRows.map((row) => (
                <S.StyledTableRow key={row.id}>
                  <S.StyledTableCell>{row["#"]}</S.StyledTableCell>

                  <S.StyledTableCell>
                    <S.UserCell>
                      <S.StyledAvatar src={row.avatar} alt={row.name}>
                        {row.name.charAt(0)}
                      </S.StyledAvatar>
                      <S.UserName>{row.name}</S.UserName>
                    </S.UserCell>
                  </S.StyledTableCell>

                  <S.StyledTableCell>
                    <S.StyledCheckbox checked={row.isWorking} />
                  </S.StyledTableCell>

                  <S.StyledTableCell>
                    {dayjs(row.createdAt).format("DD.MM.YYYY HH:mm")}
                  </S.StyledTableCell>

                  {columns
                    .filter((col) => col.type === "dynamic")
                    .map((col) => (
                      <S.StyledTableCell key={col.field}>
                        <S.TextCell title={row[col.field] || ""}>
                          {row[col.field] || "-"}
                        </S.TextCell>
                      </S.StyledTableCell>
                    ))}
                </S.StyledTableRow>
              ))
            )}
          </S.StyledTableBody>
        </S.StyledTable>
      </S.StyledTableContainer>

      <S.StyledTablePagination
        component="div"
        size="small"
        count={totalRows}
        page={currentPage}
        onPageChange={onPageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 20, 50]}
        labelRowsPerPage="Рядків на сторінці:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} з ${count}`}
      />
    </>
  );
};
