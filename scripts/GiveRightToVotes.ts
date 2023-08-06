

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

    const ballotFactory = new Ballot__factory(wallet);
    // Attatch
    const contractAddress = "0x1454A8ad478F3304F35f11af627b9d6f8207eCbb";
    const address1 = "0x33422cAdAcd0E11105Eca50154be1250b95D092a";
    const ballotContractGive = ballotFactory.attach(contractAddress) as Ballot;
    const tx = await ballotContractGive.giveRightToVote(address1);
    console.log("Tx giveRightToVote: ", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});