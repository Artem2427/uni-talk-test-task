import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortDirection = "asc" | "desc" | null;
export type WorkingStatus = "all" | "working" | "notWorking";

export interface OperatorsFilters {
  workingStatus: WorkingStatus;
  dynamicFields: string[];
}

export interface OperatorsState {
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  sortField: string | null;
  sortDirection: SortDirection;
  filters: OperatorsFilters;
}

const initialState: OperatorsState = {
  searchQuery: "",
  currentPage: 0,
  pageSize: 10,
  sortField: null,
  sortDirection: null,
  filters: {
    workingStatus: "all",
    dynamicFields: [],
  },
};

const operatorSlice = createSlice({
  name: "operators",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 0;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 0;
    },
    setSorting: (
      state,
      action: PayloadAction<{ field: string; direction: SortDirection }>
    ) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    toggleSortDirection: (state, action: PayloadAction<string>) => {
      if (state.sortField === action.payload) {
        if (state.sortDirection === "asc") {
          state.sortDirection = "desc";
        } else if (state.sortDirection === "desc") {
          state.sortDirection = null;
          state.sortField = null;
        }
      } else {
        state.sortField = action.payload;
        state.sortDirection = "asc";
      }
    },
    setWorkingStatusFilter: (
      state,
      action: PayloadAction<"all" | "working" | "notWorking">
    ) => {
      state.filters.workingStatus = action.payload;
      state.currentPage = 0;
    },
    toggleDynamicFieldFilter: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      const index = state.filters.dynamicFields.indexOf(field);

      if (index > -1) {
        state.filters.dynamicFields.splice(index, 1);
      } else {
        state.filters.dynamicFields.push(field);
      }
      state.currentPage = 0;
    },
    setDynamicFieldFilters: (state, action: PayloadAction<string[]>) => {
      state.filters.dynamicFields = action.payload;
      state.currentPage = 0;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.currentPage = 0;
      state.sortField = null;
      state.sortDirection = null;
      state.filters = {
        workingStatus: "all",
        dynamicFields: [],
      };
    },
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  setSorting,
  toggleSortDirection,
  setWorkingStatusFilter,
  toggleDynamicFieldFilter,
  setDynamicFieldFilters,
  resetFilters,
} = operatorSlice.actions;

export default operatorSlice.reducer;
