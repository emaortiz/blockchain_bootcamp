import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();
// const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const proposals = process.argv.slice(2);
    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });

    // const provider = ethers.getDefaultProvider("sepolia");
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");

    // Creating a Wallet from your Mnemonic Phrase:
    const wallet = ethers.Wallet.fromPhrase(process.env.MNEMONIC ?? "", provider);

    // Creating a Wallet from your Private Key:
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    // Example
    console.log(`Using address ${wallet.address}`);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
        throw new Error("Not enough ether");
    }

    const ballotFactory = new Ballot__factory(wallet);
    
    // Attatch
    // const contractAddress = "123123";
    // const ballotContractGive = ballotFactory.attach(contractAddress) as Ballot;
    // const tx = ballotContractGive.giveRightToVote();

    const ballotContract = await ballotFactory.deploy(
        proposals.map(ethers.encodeBytes32String)
    );
    await ballotContract.waitForDeployment();


    const address = await ballotContract.getAddress();
    console.log(`Contract deployed at address ${address}`);

    for (let index = 0; index < proposals.length; index++) {
        const proposal = await ballotContract.proposals(index);
        const name = ethers.decodeBytes32String(proposal.name);
        console.log({ index, name, proposal });
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});