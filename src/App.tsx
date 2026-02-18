import { FormulaExpressionsMapProvider } from "@/contexts/FormulaExpressionsMapContext";
import Expressions from "./components/Expressions";

function App() {
  return (
    <FormulaExpressionsMapProvider>
      <section className="max-w-7xl mx-auto py-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Test Marble
        </h1>
        <p className="text-sm text-muted-foreground">
          Composant de base pour la définition de règles.
        </p>
        <div className="p-4 bg-gray-100 rounded-lg">
          <Expressions />
        </div>

        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Résultat
        </h2>
      </section>
    </FormulaExpressionsMapProvider>
  );
}

export default App;
