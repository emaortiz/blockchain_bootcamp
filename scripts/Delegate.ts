

import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    // Creating a Wallet from your Mnemonic Phrase:
    const wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC ?? "", provider);

    const ballotFactory = new Ballot__factory(wallet);
    const contractAddress = "0x1454A8ad478F3304F35f11af627b9d6f8207eCbb";
    const ballotContractGive = ballotFactory.attach(contractAddress) as Ballot;
    const addressDelegated = "XXX";
    const tx = await ballotContractGive.delegate(addressDelegated);
    console.log("Delegate: ", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});