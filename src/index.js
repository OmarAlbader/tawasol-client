import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// *Strict mode best practice for development but not for production
// const isDevelopment = process.env.NODE_ENV !== "production";

// ReactDOM.render(
//   isDevelopment ? (
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   ) : (
//     <App />
//   ),
//   document.getElementById("root")
// );
