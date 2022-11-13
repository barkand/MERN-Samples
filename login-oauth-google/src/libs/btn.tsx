import React from "react";
import Oauth from "./oauth";

export default function OAuthBtn() {
  const [user, setUser] = React.useState({ name: "", email: "", picture: "" });

  return (
    <>
      <Oauth setUser={setUser} />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <img src={user.picture} />
    </>
  );
}
