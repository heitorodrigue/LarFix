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
      <h1>Resumo Financeiro</h1>

      <h3>Totais Gerais</h3>

    <div className="cards-resumo">

      <div className="card-resumo receita">
        <span>Receitas</span>
        <strong>{formatarMoeda(resumo.totalReceitas)}</strong>
      </div>

      <div className="card-resumo despesa">
        <span>Despesas</span>
        <strong>{formatarMoeda(resumo.totalDespesas)}</strong>
      </div>

      <div className="card-resumo saldo">
        <span>Saldo</span>
        <strong>{formatarMoeda(resumo.saldo)}</strong>
      </div>

    </div>

      <h3>Resumo por Pessoa</h3>
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