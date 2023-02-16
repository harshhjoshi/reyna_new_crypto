import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { AppProvider } from "./context/context";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)

// if (process.env.NODE_ENV === "development") {
//   console.log = () => { }
//   console.error = () => { }
//   console.debug = () => { }
//   console.warn = () => { }
// }
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppProvider>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </AppProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
