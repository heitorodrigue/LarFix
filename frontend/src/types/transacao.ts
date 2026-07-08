export interface TransacaoCreateRequest {
  descricao: string;
  valor: number;
  tipo: string;
  pessoaId: number;
}

export interface TransacaoResponse {
  id: number;
  descricao: string;
  valor: number;
  tipo: string;
  pessoaId: number;
}