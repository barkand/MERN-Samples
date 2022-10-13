import React from "react";

import useUser from "../libs/use-user";
import { Login, Logout } from "../libs/auth";

function LoginBtn() {
  const { user, loading, loggedOut, mutate } = useUser();
  let interval: any;

  const refreshToken = async () => {
    if (localStorage.getItem("user") === null) return;

    await fetch(`${import.meta.env.VITE_SERVER_PATH}user/refresh`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: localStorage.getItem("user"),
        refresh: localStorage.getItem("refresh"),
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.connected === false) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
        } else {
          localStorage.setItem("token", d.token);
        }
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("user") === null) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        refreshToken();
      }, 1000 * import.meta.env.VITE_SECRET_KEY_LIFE_TIME);
    }
  });

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
