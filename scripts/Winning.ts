

import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();
// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {

    // const provider = ethers.getDefaultProvider("sepolia");
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    // Creating a Wallet from your Mnemonic Phrase:
    const wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC ?? "", provider);
    console.log(`Using address ${wallet.address}`);

    const ballotFactory = new Ballot__factory(wallet);
    const contractAddress = "0x54789A4B1F16D9E240ffF8Bc5A05258bf34c0E88";
    const ballotContractGive = ballotFactory.attach(contractAddress) as Ballot;
    const tx = await ballotContractGive.winnerName();
    const name = ethers.decodeBytes32String(tx);

    console.log("Tx Winner: ", name);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});