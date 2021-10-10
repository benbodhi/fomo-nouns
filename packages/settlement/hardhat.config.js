require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
   solidity: "0.8.6",
   networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_KEY}`,
        blockNumber: 13287091, // One block prior to Noun 51 settlement at Sep-24-2021 07:14:39 AM +UTC
        accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`]
      },
      mining: {
        auto: false,
        interval: 5000
      }
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_KEY}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_KEY}`,
      accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_KEY}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
    },
   }
 };
