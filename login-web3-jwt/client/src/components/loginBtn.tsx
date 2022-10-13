import React from "react";

import useUser from "./libs/use-user";
import { Login, Logout } from "./libs/auth";

function LoginBtn() {
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
    <>
      <button onClick={walletClick}>
        {!loggedOut === true ? "Logout" : "Login"}
      </button>
      <p>{loading ? "loading..." : !loggedOut === true ? user?.name : ""}</p>
    </>
  );
}

export default LoginBtn;
