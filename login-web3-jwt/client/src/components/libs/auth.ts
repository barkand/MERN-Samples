import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Context from "../../context";

let DefaultWallet = {
  library: null,
  networkId: 0,
  account: "0x",
  connected: false,
};

async function FillWallet(deviceType: string) {
  // web3
  let web3Provider = null;
  if (deviceType === "mobile") {
    web3Provider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.mycustomnode.com",
        3: "https://ropsten.mycustomnode.com",
        4: "https://rinkeby.mycustomnode.com",
        42: "https://kovan.mycustomnode.com",
      },
    });
    await web3Provider.enable();
  } else if ((window as any).ethereum) {
    web3Provider = (window as any).ethereum;
  } else if ((window as any).web3) {
    web3Provider = (window as any).web3.currentProvider;
  } else {
    web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
  }

  const _wallet = JSON.parse(JSON.stringify(DefaultWallet)); //library
  _wallet.library = new Web3(web3Provider);

  let eth = _wallet.library.eth;
  _wallet.connected = true;

  //networkId
  _wallet.networkId = await eth.net.getId();
  //account
  await eth.getAccounts().then((result: any) => (_wallet.account = result[0]));

  if (_wallet.connected === true) {
    //fetch login
    let _data: any = await fetch(
      `${import.meta.env.VITE_SERVER_PATH}user/login`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: _wallet.account,
        }),
      }
    )
      .then((res) => res.json())
      .then((d) => d)
      .catch((err) => console.log(err));

    if (_data.connected === true) {
      Context.setItems({
        user: _wallet.account,
        token: _data.token,
        refresh: _data.refresh,
      });
    }
  }

  return _wallet;
}

export async function Login() {
  let deviceType =
    "ontouchstart" in window || "onmsgesturechange" in window
      ? "mobile"
      : "web";

  if (deviceType === "mobile") {
    let _wallet = await FillWallet(deviceType).catch((err) => {
      console.log(err);
      return DefaultWallet;
    });

    return _wallet;
  }

  if (!(window as any).ethereum) {
    alert("Please install MetaMask to continue.");
  }

  let _wallet;
  _wallet = await (window as any).ethereum
    .request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
    .then((permissions: any) => {
      const accountsPermission = permissions.find(
        (permission: any) => permission.parentCapability === "eth_accounts"
      );

      if (accountsPermission) {
        return FillWallet(deviceType).then((result) => result);
      }
    })
    .catch((error: any) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        alert("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    });
}

export async function Logout() {
  //fetch logout
  let _username: string = Context.getItem("user") ?? "";
  if (_username === "") return;

  let _data: any = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}user/logout`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: _username,
      }),
    }
  )
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => console.log(err));

  Context.removeItems(["user", "token", "refresh"]);
}
