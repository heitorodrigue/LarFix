export interface PessoaCreateRequest {
  nome: string;
  idade: number;
}

export interface PessoaResponse {
  id: number;
  nome: string;
  idade: number;
}

export interface PessoaResumoResponse {
  id: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface ResumoGeralResponse {
  pessoas: PessoaResumoResponse[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}