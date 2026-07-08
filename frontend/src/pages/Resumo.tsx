import { useEffect, useState } from "react";
import { pessoaService } from "../services/pessoaService";
import type { ResumoGeralResponse } from "../types/pessoa";

export function Resumo() {
  const [resumo, setResumo] = useState<ResumoGeralResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

 useEffect(() => {
  async function carregarResumo() {
    try {
      setLoading(true);
      setErro("");

      const dados = await pessoaService.obterResumo();
      setResumo(dados);
    } catch {
      setErro("Erro ao carregar resumo.");
    } finally {
      setLoading(false);
    }
  }

  carregarResumo();
}, []);

    const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (loading) return <p>Carregando...</p>;

  if (erro) return <p>{erro}</p>;

  if (!resumo) return null;

  return (
    <div>
      <h2>Resumo Financeiro</h2>

      <h3>Totais Gerais</h3>

      <p>Receitas: R$ {formatarMoeda(resumo.totalReceitas)}</p>
      <p>Despesas: R$ {formatarMoeda(resumo.totalDespesas)}</p>
      <p>Saldo: R$ {formatarMoeda(resumo.saldo)}</p>

      <hr />

      <h3>Por Pessoa</h3>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>

        <tbody>
          {resumo.pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>R$ {pessoa.totalReceitas.toFixed(2)}</td>
              <td>R$ {pessoa.totalDespesas.toFixed(2)}</td>
              <td>R$ {pessoa.saldo.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}