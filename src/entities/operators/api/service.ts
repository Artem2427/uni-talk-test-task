import { api } from "@shared/api";
import type { Operator, OperatorAddon } from "../model";

class OperatorsService {
  async getAllOperators(): Promise<Operator[]> {
    const res = await api.get("/operator");
    return res.data;
  }

  async getAllOperatorAddons(): Promise<OperatorAddon[]> {
    const res = await api.get("operatorAddon");
    return res.data;
  }
}

export const operatorsService = new OperatorsService();
