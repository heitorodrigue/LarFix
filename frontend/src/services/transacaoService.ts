import { api } from "./api";
import type {
  TransacaoCreateRequest,
  TransacaoResponse,
} from "../types/transacao";

export const transacaoService = {
  async listar(): Promise<TransacaoResponse[]> {
    const response = await api.get<TransacaoResponse[]>("/Transacao");
    return response.data;
  },

  async criar(
    transacao: TransacaoCreateRequest
  ): Promise<TransacaoResponse> {
    const response = await api.post<TransacaoResponse>(
      "/Transacao",
      transacao
    );

    return response.data;
  },
};