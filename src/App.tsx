import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LoadingScreen from "./components/feature/LoadingScreen";
import { AnimReadyContext } from "./context/AnimReadyContext";


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <I18nextProvider i18n={i18n}>
      <AnimReadyContext.Provider value={!loading}>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
        </BrowserRouter>
      </AnimReadyContext.Provider>
    </I18nextProvider>
  );
}

export default App;
