import React from "react";

import useUser from "./libs/use-user";
import { Login, Logout } from "./libs/auth";
import "./css/App.css";

function App() {
  const { user, loading, loggedOut, mutate } = useUser();

  const walletClick = async () => {
    if (!loggedOut === true) {
      Logout();
      mutate(() => null);
    } else {
      Login();
      mutate();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={walletClick}>
          {!loggedOut === true ? "Logout" : "Login"}
        </button>
        <p>{loading ? "loading..." : !loggedOut === true ? user?.name : ""}</p>
      </header>
    </div>
  );
}

export default App;
