import React from "react";

// import useUser from "./libs/use-user";
import { Login, Logout } from "./libs/auth";

import "./css/App.css";

function App() {
  const [connect, setConnect] = React.useState(false);
  const [walletAccount, setWalletAccount] = React.useState("0x");
  // const { user, loading, loggedOut, mutate } = useUser();

  const walletClick = async () => {
    if (connect) {
      let _logout = await Logout();
      setConnect(false);

      // mutate(() => null); // optimistically update the data and revalidate
    } else {
      let _login = await Login();
      console.log(_login);
      if (_login.connected) {
        setWalletAccount(_login.account);
        setConnect(true);
      }
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
        <p>{connect ? walletAccount : ""}</p>
        {/* <p>{loading ? "loading..." : user && connect ? user.name : ""}</p> */}
      </header>
    </div>
  );
}

export default App;
