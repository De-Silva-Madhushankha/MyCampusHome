import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";
import {store} from "./redux/store.js";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
