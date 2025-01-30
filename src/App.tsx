

import React from "react";
import Grid from "./components/Grid";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🐍🎲 Snake and Ladder Game 🎲🔼</h1>
      <Grid rows={10} cols={10} />
    </div>
  );
};

export default App;


