export type TipoTransacao = "Receita" | "Despesa";

export interface TransacaoCreateRequest {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
}

export interface TransacaoResponse {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
  pessoaNome: string;
}