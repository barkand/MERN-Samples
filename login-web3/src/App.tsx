import React from "react";

// import useUser from "./libs/use-user";
import { Login, Logout } from "./libs/auth";

import "./css/App.css";

function App() {
  const [connect, setConnect] = React.useState(false);
  // const { user, loading, loggedOut, mutate } = useUser();

  const walletClick = async () => {
    if (connect) {
      Logout();
      // mutate(() => null); // optimistically update the data and revalidate
    } else {
      Login();
      // mutate(); // after logging in, we revalidate the SWR
    }
  };

  // React.useEffect(() => {
  //   setConnect(user && !loggedOut === true ? true : false);
  // }, [user, loggedOut]);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={walletClick}>{connect ? "Logout" : "Login"}</button>
        {/* <p>{loading ? "loading..." : user && connect ? user.name : ""}</p> */}
      </header>
    </div>
  );
}

export default App;
