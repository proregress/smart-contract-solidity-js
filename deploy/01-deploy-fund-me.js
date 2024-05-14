//运行yarn hardhat deploy时，deploy文件夹下的所有文件将被部署因此需要序号标注

const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");
const { getNamedAccounts, deployments, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

//导入网络配置
const { networkConfig } = require("../helper-hardhat-config");
//下面两行 = 上面一行
// const helperConfig = require("../helper-hardhat-config")
// const networkConfig = helperConfig.networkConfig;

// async function deployFunc(hre) {
//   console.log("hi!");
// }
// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// 语法糖
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // if chainId is X use Y , if chainId is A use B
  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    //可以使用get命令来获取近期的部署
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // 如果某个合约不存在，就部署一个最小化的版本来进行本地测试

  // what happens when we want to change chains ?
  // when going for localhost or hardhat network we want to use a mock.
  const args = [ethUsdPriceFeedAddress];

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, //put price feed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    //VERIFY
    await verify(fundMe.address, args);
  }

  log("------------------------------------------ ");
};

module.exports.tags = ["all", "fundme"];
