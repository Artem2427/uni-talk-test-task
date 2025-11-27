import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { operatorsService } from "../api/service";
import { OPERATORS_QUERY_KEYS } from "../model/constants";
import type { Operator } from "../model";

export function useGetAllOperatorsQuery<TData = Operator[]>(
  options?: Partial<UseQueryOptions<Operator[], AxiosError, TData>>
): UseQueryResult<TData, AxiosError> {
  return useQuery<Operator[], AxiosError, TData>({
    queryKey: [OPERATORS_QUERY_KEYS.GET_ALL_OPERATORS],
    queryFn: () => operatorsService.getAllOperators(),
    ...options,
  });
}
