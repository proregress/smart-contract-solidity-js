//定义网络配置的地方，使用aave
const networkConfig = {
  // chainId : {}
  31337: {
    name: "localhost",
  },
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0xF0d50568e3A7e8259E16663972b11910F89BD8e7",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

// 需要导出上面的networkConfig,以便其他脚本可以使用它
module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
};
