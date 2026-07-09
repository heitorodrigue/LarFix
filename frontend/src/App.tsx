import { useState } from "react";
import { Pessoas } from "./pages/Pessoas";
import { Transacoes } from "./pages/Transacoes";
import { Resumo } from "./pages/Resumo";

type Pagina = "pessoas" | "transacoes" | "resumo";

function App() {
  const [pagina, setPagina] = useState<Pagina>("pessoas");

  return (
   <div className="app">
      <header className="header">
        <h1>LarFix</h1>
        <p>Controle de Gastos Residenciais</p>
      </header>

      <nav className="menu">
        <button
          className={pagina === "pessoas" ? "active" : ""}
          onClick={() => setPagina("pessoas")}
        >
          Pessoas
        </button>

        <button
          className={pagina === "transacoes" ? "active" : ""}
          onClick={() => setPagina("transacoes")}
        >
          Transações
        </button>

        <button
          className={pagina === "resumo" ? "active" : ""}
          onClick={() => setPagina("resumo")}
        >
          Resumo
        </button>
      </nav>

     <main className="content">
        {pagina === "pessoas" && <Pessoas />}
        {pagina === "transacoes" && <Transacoes />}
        {pagina === "resumo" && <Resumo />}
      </main>
    </div>
  );
}

export default App;