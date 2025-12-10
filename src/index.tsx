import React from "react";
import App from "./App";
import {createRoot} from "react-dom/client"
import { store } from './store/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = createRoot(rootElement)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
    
  );
}

