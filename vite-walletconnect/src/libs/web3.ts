import WalletConnectProvider from "@walletconnect/web3-provider";

export default async function MobileWallet() {
  let web3Provider = null;

  web3Provider = new WalletConnectProvider({
    rpc: {
      1: "https://mainnet.mycustomnode.com",
      3: "https://ropsten.mycustomnode.com",
      4: "https://rinkeby.mycustomnode.com",
      42: "https://kovan.mycustomnode.com",
    },
  });
  await web3Provider.enable();
}
