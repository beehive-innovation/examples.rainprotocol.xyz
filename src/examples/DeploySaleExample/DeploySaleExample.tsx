import '../../App.css';
import React, {useState} from 'react';
import { networks } from "./networks";
// import { isAfterBlockNumber } from "./opcodeExample";
import {ContractInterface, ethers} from 'ethers';
import saleContractABI from "./saleContractABI.json";
import {Button, Divider, Link, Typography} from "@mui/material";

export default function DeploySaleExample({}: any) {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [result, setResult] = useState("Result: ");

  const connectWalletHandler = async () => {
    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No Web3 Wallet installed");
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
        chainId: networks[0].config.chainId,
      });
      console.log(`Address ${accounts[0]} connected`);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const runOpcodesExample = async () => {
    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No Web3 Wallet installed");
    }

    try {
      // const contractInstance = new ethers.Contract(saleContractABI.abi as AbiItem[], networks[0].addresses.SALE_EXAMPLE, ethereum);


      // todo will use typechain
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());

      // @ts-ignore
      const contractInstance = new ethers.Contract(networks[0].addresses.SALE_EXAMPLE, saleContractABI.abi, signer);
      const price = await contractInstance.calculatePrice(2);

      console.log(price);
      setResult(`Result: ${price._hex}`);

      // TODO ADD FUNCTIONALITY FOR CALLING THE SMART CONTRACT WITH THE OPCODE

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <main className="App-main">

        <Typography variant="h4">Deploy Sale Example</Typography>

        <br/>

        <Button variant="contained" onClick={connectWalletHandler}>
          Connect
        </Button>

        <br/>

        <Typography>{`Connected as: ${currentAccount}`}</Typography>

        <br/>

        <Button variant="contained" onClick={runOpcodesExample}>
          Deploy Sale Example
        </Button>

        <br/>

        <Typography>{result}</Typography>

        {/* todo add link to tutorial and github (and to this on the tutorial), also explain that material-ui is used*/}

        <br/>

        <Divider variant="middle" style={{ background: 'white', width: '90%' }} />

        <br/>

        <Link href="https://docs.rainprotocol.xyz/guides/Opcodes/running-an-opcodes-example" variant="body2">
          Tutorial
        </Link>

        <Link href="https://github.com/beehive-innovation/examples.rainprotocol.xyz" variant="body2">
          Github
        </Link>

      </main>
    </div>
  )
}
