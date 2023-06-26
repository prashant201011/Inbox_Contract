const hdWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { evm, abi } = require("./compile");

const provider = new hdWalletProvider(
  "wire ahead clump wolf stick sand sting short milk minute vital youth",
  "https://sepolia.infura.io/v3/4051c978c719401bb8695291762f0b25"
);

const web3 = new Web3(provider);

let deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);

  provider.engine.stop();
};
deploy();
