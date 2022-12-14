const { ethers } = require("hardhat");

const DEPOSIT_AMOUNT = ethers.utils.parseEther("0.1");

const getWeth = async (account) => {
    // need to call the "deposit" function on the WETH token contract
    // need 1. contract address 2. abi
    // WETH mainnet contract address: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        account
    );

    console.log("[EXCHANGE_WETH]");
    console.log("Exchanging ETH for WETH...");

    // call deposit function on the IWeth token contract
    const tx = await iWeth.deposit({ value: DEPOSIT_AMOUNT });
    await tx.wait(1);

    const wethBal = await iWeth.balanceOf(account);
    console.log("Obtained ", ethers.utils.formatUnits(wethBal), " WETH");
};

module.exports = { getWeth, DEPOSIT_AMOUNT };
