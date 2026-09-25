import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toast";
// @ts-ignore
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>,
  );
}
