import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { operatorsService } from "../api/service";
import { OPERATORS_QUERY_KEYS } from "../model/constants";
import type { OperatorAddon } from "../model";

export function useGetAllOperatorAddonsQuery<TData = OperatorAddon[]>(
  options?: Partial<UseQueryOptions<OperatorAddon[], AxiosError, TData>>
): UseQueryResult<TData, AxiosError> {
  return useQuery<OperatorAddon[], AxiosError, TData>({
    queryKey: [OPERATORS_QUERY_KEYS.GET_ALL_OPERATOR_ADDONS],
    queryFn: () => operatorsService.getAllOperatorAddons(),
    ...options,
  });
}
