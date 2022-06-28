import React from "react";
import { render } from "react-dom";
import ReactDemo from "../src/index.tsx"; //引入组件

const App = () => {
  return <ReactDemo />;
};
render(<App />, document.getElementById("root"));
