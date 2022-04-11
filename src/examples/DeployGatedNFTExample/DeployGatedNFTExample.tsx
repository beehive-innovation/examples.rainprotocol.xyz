import "../../App.css";
import React, { useState } from "react";
import {BigNumber, Contract, ethers} from "ethers";
import defaults from "./defaults.json";
import { Button, Divider, Link, Typography } from "@mui/material";
import GatedNFTForm from "./GatedNFTForm";
import { GatedNFT } from "@unegma/rain-sdk";

const CHAIN_ID = 8001;

/**
 * DeploySaleExample
 * An example of how to create a Sale contract (using the Sale factory).
 *
 * This example will use USDCC (see the `redeemable` parameter in defaults)
 * This example will let the user define limited parameters in order to show functionality.
 *
 * Please be aware that this example does not follow best practices as there is no validation in place as
 * well as other checks which have been left out (especially re wallet connection/network switching).
 *
 * These have been left out for simplicity so the user can isolate the required functionality more easily
 * and iterate on that with their own setup.
 *
 * @constructor
 */
export default function DeployGatedNFTExample({}: any) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [gatedNFTState, setGatedNFTState] = useState(defaults.gatedNFT);
  const [gatedNFTContractAddress, setGatedNFTContractAddress] = useState("");

  /**
   * Minimal connectWalletHandler functinality
   */
  const connectWalletHandler = async () => {
    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No Web3 Wallet installed");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
        chainId: CHAIN_ID,
      });
      console.log(`Address ${accounts[0]} connected`);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Function for handling when the user submits the form
   */
  const deploGatedNFTExample = async () => {
    // @ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      console.log("No Web3 Wallet installed");
    }

    try {
      const provider = new ethers.providers.Web3Provider(ethereum, {
        name: 'Mumbai',
        chainId: CHAIN_ID,
      });

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());

      // @ts-ignore
      gatedNFTState.royaltyBPS = BigNumber.from(
        Math.floor(gatedNFTState.royaltyBPS * 100)
      ); // todo check this

      // could put the defaults directly into config.param, but will need to refactor the `handleChangeState` function in the GatedNFTForm
      const gatedNFTConfig = gatedNFTState.config = {
        name: gatedNFTState.name,
        symbol: gatedNFTState.symbol,
        description: gatedNFTState.description,
        animationUrl: gatedNFTState.animationUrl,
        imageUrl: gatedNFTState.imageUrl,
        animationHash: gatedNFTState.animationHash,
        imageHash: gatedNFTState.imageHash,
      }

      console.log(
        "Submitting the following state (with the config fields bundled into config):",
        gatedNFTState,
      );

      const result = await GatedNFT.deploy(
        signer,
        CHAIN_ID,
        {
          config: gatedNFTConfig,
          tier: gatedNFTState.tier,
          minimumStatus: gatedNFTState.minimumStatus,
          maxPerAddress: gatedNFTState.maxPerAddress,
          // gatedNFTState.transferrable.value, // todo check this
          transferrable: gatedNFTState.transferrable, // todo check this
          maxMintable: gatedNFTState.maxMintable,
          royaltyRecipient: gatedNFTState.royaltyRecipient,
          royaltyBPS: gatedNFTState.royaltyBPS
        }
      );

      setGatedNFTContractAddress(result.address)

      console.log(result);

    } catch (err) {
      console.log(err);
    }
  };

  /**
   * View
   */
  return (
    <div className="App">
      <main className="App-main">
        <Typography variant="h4">Deploy GatedNFT Example</Typography>

        <br />

        <Button variant="contained" onClick={connectWalletHandler}>
          Connect
        </Button>

        <br />

        <Typography>{`Connected as: ${currentAccount}`}</Typography>

        <br />

        <GatedNFTForm
          defaults={defaults.gatedNFT}
          gatedNFTState={gatedNFTState}
          setGatedNFTState={setGatedNFTState}
          currentAccount={currentAccount}
        />

        <img className={"nft-image"} src={gatedNFTState.imageUrl} />

        <br/>

        <Button variant="contained" onClick={deploGatedNFTExample}>
          Deploy GatedNFT Example
        </Button>

        <br />
        <Typography>{`GatedNFT Contract Address: ${gatedNFTContractAddress}`}</Typography>
        <br />

        <Divider
          variant="middle"
          style={{ background: "white", width: "90%" }}
        />

        <br />

        {/*todo add tutorial link*/}
        {/*<Link*/}
        {/*  href="https://docs.rainprotocol.xyz/guides/Opcodes/running-an-opcodes-example"*/}
        {/*  variant="body2"*/}
        {/*>*/}
        {/*  Tutorial*/}
        {/*</Link>*/}

        <Link
          href="https://github.com/beehive-innovation/examples.rainprotocol.xyz"
          variant="body2"
        >
          Github
        </Link>
      </main>
    </div>
  );
}
