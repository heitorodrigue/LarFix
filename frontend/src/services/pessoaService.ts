import { api } from "./api";
import type {
  PessoaCreateRequest,
  PessoaResponse,
  ResumoGeralResponse,
} from "../types/pessoa";

export const pessoaService = {
  async listar(): Promise<PessoaResponse[]> {
    const response = await api.get<PessoaResponse[]>("/Pessoa");
    return response.data;
  },

  async criar(pessoa: PessoaCreateRequest): Promise<PessoaResponse> {
    const response = await api.post<PessoaResponse>("/Pessoa", pessoa);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await api.delete(`/Pessoa/${id}`);
  },

  async obterResumo(): Promise<ResumoGeralResponse> {
    const response = await api.get<ResumoGeralResponse>("/Pessoa/resumo");
    return response.data;
  },
};