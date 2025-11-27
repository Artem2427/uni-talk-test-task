import styled from "styled-components";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Checkbox,
  Avatar,
  CircularProgress,
  type TableContainerProps,
  type TablePaginationProps,
  Stack,
  FormControl,
  Typography,
  FormGroup,
} from "@mui/material";

export const Header = styled(Box)`
  margin-bottom: 40px;
  text-align: left;
  color: var(--color-text-primary);
`;

export const StyledTableBlock = styled(Box)`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchContainer = styled(Box)`
  padding: 16px;
  display: flex;
  justify-content: flex-start;
`;

export const SearchField = styled(TextField)`
  width: 100%;
  max-width: 365px;

  & .MuiInputBase-root {
    background: var(--color-white);
  }
`;

export const StyledFilters = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: auto;
`;

export const FilterPanel = styled(Box)`
  padding: 16px;
  margin-bottom: 16px;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-background-panel);
`;

export const FilterStack = styled(Stack)`
  gap: 24px;
`;

export const FilterFormControl = styled(FormControl)`
  min-width: 200px;
`;

export const FilterSection = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const FilterLabel = styled(Typography)`
  margin-bottom: 8px;
  font-weight: 500;
  text-align: left;
`;

export const CheckboxGroup = styled(FormGroup)`
  &.MuiFormGroup-root {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 8px 16px;
  }
`;

export const FilterHint = styled(Typography)`
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
`;

export const ActiveFiltersSection = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const ChipContainer = styled(Stack)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>`
  max-height: calc(100vh - 290px);
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    font-weight: 500;
    font-size: 14px;
    padding: 9px 16px;
    white-space: nowrap;
  }
`;

export const StyledTableBody = styled(TableBody)``;

export const StyledTableRowHeader = styled(TableRow)<{ $isSelected?: boolean }>`
  cursor: pointer;
  position: relative;
  height: 56px;
  transition: background-color 0.2s;

  & .MuiTableCell-root {
    border-bottom: 1px solid var(--color-border);
  }
`;

export const StyledTableRow = styled(TableRow)<{ $isSelected?: boolean }>`
  cursor: pointer;
  position: relative;
  height: 56px;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ $isSelected }) =>
      $isSelected
        ? "var(--color-background-selected)"
        : "var(--color-background-hover)"} !important;
  }

  & .MuiTableCell-root {
    border-bottom: 1px solid var(--color-border);
  }

  &:last-child .MuiTableCell-root {
    border-bottom: none;
  }
`;

export const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    font-size: 14px;
    color: var(--color-text-primary);
  }
`;

export const UserCell = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 40px !important;
  height: 40px !important;
`;

export const UserName = styled(Box)`
  font-size: 14px;
  color: var(--color-text-primary);
  white-space: nowrap;
`;

export const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    color: var(--color-text-secondary);
    padding: 8px;
  }

  &.MuiCheckbox-root.Mui-checked {
    color: var(--color-accent);
  }
`;

export const TextCell = styled(Box)`
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledTablePagination = styled(
  TablePagination
)<TablePaginationProps>`
  border-top: 1px solid var(--color-border);

  .MuiTablePagination-selectLabel {
    color: var(--color-text-secondary);
  }

  .MuiInputBase-root {
    margin-right: 26px;
  }
`;

export const EmptyState = styled(Box)`
  padding: 48px 24px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  color: var(--color-primary);
`;

export const LoadingText = styled(Box)`
  margin-top: 16px;
  font-size: 14px;
  color: var(--color-text-muted);
`;
