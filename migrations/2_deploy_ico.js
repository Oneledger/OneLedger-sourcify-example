const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const SigmaToken = artifacts.require("SigmaToken");
const totalSupply = new BN(web3.utils.toWei('1000000', 'ether'));

module.exports = async function (deployer) {
  await deployer.deploy(SigmaToken, "SigmaToken", "ST", totalSupply);
  const token = await SigmaToken.deployed();
};