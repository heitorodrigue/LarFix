import { useState } from "react";
import { Pessoas } from "./pages/Pessoas";
import { Transacoes } from "./pages/Transacoes";
import { Resumo } from "./pages/Resumo";

type Pagina = "pessoas" | "transacoes" | "resumo";

function App() {
  const [pagina, setPagina] = useState<Pagina>("pessoas");

  return (
    <div>
      <nav>
        <button onClick={() => setPagina("pessoas")}>Pessoas</button>
        <button onClick={() => setPagina("transacoes")}>Transações</button>
        <button onClick={() => setPagina("resumo")}>Resumo</button>
      </nav>

      <hr />

      {pagina === "pessoas" && <Pessoas />}
      {pagina === "transacoes" && <Transacoes />}
      {pagina === "resumo" && <Resumo />}
    </div>
  );
}

export default App;