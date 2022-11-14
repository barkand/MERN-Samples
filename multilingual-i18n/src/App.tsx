import { useTranslation } from "react-i18next";

import "./css/App.css";
import ToggleLanguage from "./libs/langBtn";

function App() {
  const { t } = useTranslation(["public"]);

  return (
    <header className="App-header">
      {t("title")}
      <ToggleLanguage />
    </header>
  );
}

export default App;
