import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' instead of 'react-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
