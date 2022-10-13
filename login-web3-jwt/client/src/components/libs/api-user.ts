import Context from "../../context";

let userFetcher = async () => {
  if (Context.getItem("user") !== null) {
    // authorized
    await fetch(`${import.meta.env.VITE_SERVER_PATH}user/refresh`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Context.getItem("user"),
        refresh: Context.getItem("refresh"),
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.connected === false) {
          Context.removeItems(["user", "token", "refresh"]);
        } else {
          Context.setItems({ token: d.token });
        }
      });

    return {
      name: Context.getItem("user"),
    };
  }

  // not authorized
  const error = new Error("Not authorized!");
  throw error;
};

export default userFetcher;
