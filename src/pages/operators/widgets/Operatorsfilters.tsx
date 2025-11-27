import React from "react";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { WorkingStatus } from "@store/operator-slice";
import type { TableColumn } from "./OperatorsTable";
import * as S from "../styles";

interface OperatorsFiltersProps {
  localSearchQuery: string;
  showFilters: boolean;
  activeFiltersCount: number;
  workingStatus: WorkingStatus;
  dynamicColumns: TableColumn[];
  selectedDynamicFields: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleFilters: () => void;
  onResetFilters: () => void;
  onWorkingStatusChange: (status: WorkingStatus) => void;
  onToggleDynamicField: (field: string) => void;
}

export const OperatorsFilters: React.FC<OperatorsFiltersProps> = ({
  localSearchQuery,
  showFilters,
  activeFiltersCount,
  workingStatus,
  dynamicColumns,
  selectedDynamicFields,
  onSearchChange,
  onToggleFilters,
  onResetFilters,
  onWorkingStatusChange,
  onToggleDynamicField,
}) => {
  return (
    <>
      <S.SearchContainer>
        <S.SearchField
          placeholder="Ім'я користувача..."
          value={localSearchQuery}
          onChange={onSearchChange}
          variant="outlined"
          label="Пошук"
        />
        <S.StyledFilters>
          <Button
            variant={showFilters ? "contained" : "outlined"}
            onClick={onToggleFilters}
          >
            Фільтри {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant="text" onClick={onResetFilters}>
              Скинути все
            </Button>
          )}
        </S.StyledFilters>
      </S.SearchContainer>

      {showFilters && (
        <S.FilterPanel>
          <S.FilterStack>
            <S.FilterFormControl size="small">
              <InputLabel>Статус роботи</InputLabel>
              <Select
                value={workingStatus}
                label="Статус роботи"
                onChange={(e) =>
                  onWorkingStatusChange(e.target.value as WorkingStatus)
                }
              >
                <MenuItem value="all">Всі</MenuItem>
                <MenuItem value="working">Працює</MenuItem>
                <MenuItem value="notWorking">Не працює</MenuItem>
              </Select>
            </S.FilterFormControl>

            {dynamicColumns.length > 0 && (
              <S.FilterSection>
                <S.FilterLabel variant="subtitle2">
                  Додаткові поля для відображення:
                </S.FilterLabel>
                <S.CheckboxGroup>
                  {dynamicColumns.map((col) => (
                    <FormControlLabel
                      key={col.field}
                      control={
                        <Checkbox
                          checked={selectedDynamicFields.includes(col.field)}
                          onChange={() => onToggleDynamicField(col.field)}
                        />
                      }
                      label={col.header}
                    />
                  ))}
                </S.CheckboxGroup>
                <S.FilterHint>
                  {selectedDynamicFields.length === 0
                    ? "Всі поля відображаються за замовчуванням"
                    : `Обрано полів: ${selectedDynamicFields.length}`}
                </S.FilterHint>
              </S.FilterSection>
            )}
          </S.FilterStack>
        </S.FilterPanel>
      )}
    </>
  );
};
