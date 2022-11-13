import React from "react";
import jwt_decode from "jwt-decode";

export default function Oauth({ setUser }: { setUser: any }) {
  const divRef = React.useRef(null);

  function handleCredentialResponse(response: any) {
    var user_object: any = jwt_decode(response.credential);

    if (user_object.email !== undefined) {
      async function signing() {
        setUser({
          email: user_object.email,
          name: user_object.name,
          picture: user_object.picture,
        });

        console.log(user_object);
      }
      signing();
    }
  }

  const initializeGsi = () => {
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(divRef.current, {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  };

  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.onload = initializeGsi;
  script.async = true;
  script.id = "google-client-script";
  document.querySelector("body")?.appendChild(script);

  return <div ref={divRef} />;
}
