import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Login from "./components/Login";
import Consentimiento from "./components/Consentimiento";
import Instrucciones from "./components/Instructions";
import Experimento from "./components/Experimento";
import Tutorial from "./components/Tutorial";
import MainTask from "./components/MainTask";
import FinalScreen from "./components/FinalScreen";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/consentimiento" element={<Consentimiento />} />
            <Route path="/instrucciones" element={<Instrucciones />} />
            <Route path="/experimento" element={<Experimento />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/main-task" element={<MainTask />} />
            <Route path="/final" element={<FinalScreen />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
