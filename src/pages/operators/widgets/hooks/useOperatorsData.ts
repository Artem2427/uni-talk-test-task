import { useMemo } from "react";
import type { Operator } from "@entities/operators/model";
import type { OperatorAddon } from "@entities/operators/model";
import type { MergedRow, TableColumn } from "../OperatorsTable";

interface UseOperatorsDataProps {
  operators: Operator[] | undefined;
  operatorAddons: OperatorAddon[] | undefined;
  selectedDynamicFields: string[];
}

export const useOperatorsData = ({
  operators,
  operatorAddons,
  selectedDynamicFields,
}: UseOperatorsDataProps) => {
  return useMemo(() => {
    if (!operators || !operatorAddons) {
      return { rows: [], columns: [], dynamicColumns: [] };
    }

    const dynamicFields = [...new Set(operatorAddons.map((a) => a.fieldName))];

    const staticCols: TableColumn[] = [
      { field: "#", header: "#", type: "static", sortable: true },
      { field: "name", header: "Користувач", type: "static", sortable: true },
      { field: "isWorking", header: "Працює", type: "static", sortable: true },
      {
        field: "createdAt",
        header: "Дата / Час створення",
        type: "static",
        sortable: true,
      },
    ];

    const dynamicCols: TableColumn[] = dynamicFields.map((field) => ({
      field,
      header: field,
      type: "dynamic" as const,
      sortable: false,
    }));

    const visibleDynamicCols =
      selectedDynamicFields.length > 0
        ? dynamicCols.filter((col) => selectedDynamicFields.includes(col.field))
        : dynamicCols;

    const cols = [...staticCols, ...visibleDynamicCols];

    const mergedRows: MergedRow[] = operators.map((operator, index) => {
      const row: MergedRow = {
        ...operator,
        "#": index + 1,
      };

      const operatorAddonsList = operatorAddons.filter(
        (a) => a.id === operator.id
      );
      operatorAddonsList.forEach((addon) => {
        row[addon.fieldName] = addon.text;
      });

      return row;
    });

    return { rows: mergedRows, columns: cols, dynamicColumns: dynamicCols };
  }, [operators, operatorAddons, selectedDynamicFields]);
};
