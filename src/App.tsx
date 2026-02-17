import FormulaExpression from "./components/FormulaExpression";

function App() {
  return (
    <section className="max-w-7xl mx-auto py-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Test Marble
      </h1>
      <p className="text-sm text-muted-foreground">
        Composant de base pour la définition de règles.
      </p>
      <div className="p-4 bg-gray-100 rounded-lg">
        <FormulaExpression />
      </div>
    </section>
  );
}

export default App;
