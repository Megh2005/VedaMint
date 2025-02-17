require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "flowevm",
  networks: {
    fuji: {
      url: process.env.FUJI_URL,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};


// 0x04d99B240Ad5a9f96e06154d3cd4Af9A084c6d06