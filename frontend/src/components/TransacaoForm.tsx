import { useEffect, useState } from "react";
import { pessoaService } from "../services/pessoaService";
import { transacaoService } from "../services/transacaoService";
import type { PessoaResponse } from "../types/pessoa";
import type { TipoTransacao } from "../types/transacao";
import axios from "axios";

interface TransacaoFormProps {
  onCriado: () => void;
}

export function TransacaoForm({ onCriado }: TransacaoFormProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao | "">("");
  const [pessoaId, setPessoaId] = useState("");

  const [pessoas, setPessoas] = useState<PessoaResponse[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPessoas() {
      try {
        const resultado = await pessoaService.listar();
        setPessoas(resultado);
      } catch {
        setErro("Não foi possível carregar as pessoas.");
      }
    }

    carregarPessoas();
  }, []);

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!descricao || !valor || !tipo || !pessoaId) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
        setErro("");
        
        await transacaoService.criar({
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId: Number(pessoaId),
      });

      setDescricao("");
      setValor("");
      setTipo("");
      setPessoaId("");
      setErro("");

      onCriado();
    } catch (error) {
  console.log(error);

  if (axios.isAxiosError(error)) {
    setErro(
      error.response?.data?.message ??
      "Não foi possível cadastrar a transação."
    );
  } else {
    setErro("Não foi possível cadastrar a transação.");
  }
}
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar transação</h3>

      {erro && <p className="erro">{erro}</p>}

      <label htmlFor="descricao">Descrição</label>
      <input
        id="descricao"
        placeholder="Digite a descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <label htmlFor="valor">Valor</label>
      <input
        id="valor"
        type="number"
        step="0.01"
        placeholder="Digite o valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <label htmlFor="tipo">Tipo</label>
      <select
        id="tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoTransacao)}
      >
        <option value="">Selecione o tipo</option>
        <option value="Despesa">Despesa</option>
        <option value="Receita">Receita</option>
      </select>

      <label htmlFor="pessoa">Pessoa</label>
      <select
        id="pessoa"
        value={pessoaId}
        onChange={(e) => setPessoaId(e.target.value)}
      >
        <option value="">Selecione uma pessoa</option>

        {pessoas.map((pessoa) => (
          <option key={pessoa.id} value={pessoa.id}>
            {pessoa.nome}
          </option>
        ))}
      </select>

      <button type="submit">
        Cadastrar
      </button>
    </form>
  );
}