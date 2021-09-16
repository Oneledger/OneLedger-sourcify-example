// SPDX-License-Identifier: MIT
const { web3, accounts, contract } = require('@openzeppelin/test-environment');
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');

// Load compiled artifacts
const SigmaToken = contract.fromArtifact("SigmaToken");

// Start test block
describe('SigmaToken', function () {

    const owner = accounts[0];
    const other = accounts[1];
    const NAME = 'SigmaToken';
    const SYMBOL = 'ST';
    const TOTAL_SUPPLY = new BN(web3.utils.toWei('1000000', 'ether'));
    let token;

    beforeEach(async function () {
        token = await SigmaToken.new(NAME, SYMBOL, TOTAL_SUPPLY, { from: owner });
    });

    it('should retieves a total supply', async function () {
        // Use large integer comparisons
        expect(await token.totalSupply()).to.be.bignumber.equal(TOTAL_SUPPLY);
    });

    it('should has a name', async function () {
        expect(await token.name()).to.be.equal(NAME);
    });

    it('should has a symbol', async function () {
        expect(await token.symbol()).to.be.equal(SYMBOL);
    });

    it('should return the balance of token owner', async function () {
        expect(await token.balanceOf(accounts[0])).to.be.bignumber.equal(TOTAL_SUPPLY);
    });

    it('should has an owner', async function () {
        expect(await token.owner()).to.equal(owner);
    });

    it('should transfer ownership', async function () {
        const receipt = await token.transferOwnership(other, { from: owner });
        expectEvent(receipt, 'OwnershipTransferred');

        expect(await token.owner()).to.equal(other);
    });
});