import React from "react";
import { createRoot } from "react-dom/client";
import Data from "./Data";

const container = document.getElementById("root");
const root = createRoot(container);

class App extends React.Component {
  state = { names: [], var2: null };

  render() {
    return <Data names={this.state.names}></Data>;
  }
}
root.render(<App />);
