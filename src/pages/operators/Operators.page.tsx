import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { operatorsHooks } from "@entities/operators/hooks";
import {
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  toggleSortDirection,
  setWorkingStatusFilter,
  toggleDynamicFieldFilter,
  resetFilters,
  type OperatorsState,
  type WorkingStatus,
} from "@store/operator-slice";

import { sharedHooks } from "@shared/hooks";

import * as S from "./styles";
import { useOperatorsData, useOperatorsFiltering } from "./widgets/hooks";
import { OperatorsFilters } from "./widgets/Operatorsfilters";
import { OperatorsTable } from "./widgets/OperatorsTable";

export const OperatorsPage = () => {
  const dispatch = useDispatch();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const {
    searchQuery,
    currentPage,
    pageSize,
    sortField,
    sortDirection,
    filters,
  } = useSelector((state: { operators: OperatorsState }) => state.operators);

  const debouncedSearchQuery = sharedHooks.useDebounce(localSearchQuery, 500);

  const { data: operators, isPending: isPendingOperators } =
    operatorsHooks.useGetAllOperatorsQuery();

  const { data: operatorAddons, isPending: isPendingOperatorAddons } =
    operatorsHooks.useGetAllOperatorAddonsQuery();

  const { rows, columns, dynamicColumns } = useOperatorsData({
    operators,
    operatorAddons,
    selectedDynamicFields: filters.dynamicFields,
  });

  const { paginatedRows, totalRows } = useOperatorsFiltering({
    rows,
    searchQuery,
    workingStatus: filters.workingStatus,
    sortField,
    sortDirection,
    currentPage,
    pageSize,
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (filters.workingStatus !== "all") count++;
    if (filters.dynamicFields.length > 0) count++;
    return count;
  }, [searchQuery, filters]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalSearchQuery("");
  };

  const handleWorkingStatusChange = (workingStatus: WorkingStatus) => {
    dispatch(setWorkingStatusFilter(workingStatus));
  };

  const handleToggleDynamicField = (field: string) => {
    dispatch(toggleDynamicFieldFilter(field));
  };

  const handleSort = (field: string) => {
    dispatch(toggleSortDirection(field));
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
  };

  const isLoading = isPendingOperators || isPendingOperatorAddons;

  if (isLoading) {
    return (
      <Box>
        <S.LoadingContainer>
          <S.StyledCircularProgress size={40} />
          <S.LoadingText>Завантаження...</S.LoadingText>
        </S.LoadingContainer>
      </Box>
    );
  }

  return (
    <Box>
      <S.Header>
        <Typography variant="h4" component="h1" gutterBottom>
          Оператори
        </Typography>
      </S.Header>

      <S.StyledTableBlock>
        <OperatorsFilters
          localSearchQuery={localSearchQuery}
          showFilters={showFilters}
          activeFiltersCount={activeFiltersCount}
          workingStatus={filters.workingStatus}
          dynamicColumns={dynamicColumns}
          selectedDynamicFields={filters.dynamicFields}
          onSearchChange={handleSearchChange}
          onToggleFilters={handleToggleFilters}
          onResetFilters={handleResetFilters}
          onWorkingStatusChange={handleWorkingStatusChange}
          onToggleDynamicField={handleToggleDynamicField}
        />

        <OperatorsTable
          columns={columns}
          paginatedRows={paginatedRows}
          sortField={sortField}
          sortDirection={sortDirection}
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          activeFiltersCount={activeFiltersCount}
          onSort={handleSort}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </S.StyledTableBlock>
    </Box>
  );
};
