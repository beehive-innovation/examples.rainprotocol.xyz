import "../../App.css";
import React, { useState } from "react";
import { networks } from "./networks";
import {BigNumber, Contract, ethers} from "ethers";
import gatedNFTFactoryABI from "./gatedNFTFactoryABI.json";
import defaults from "./defaults.json";
import { Button, Divider, Link, Typography } from "@mui/material";
import GatedNFTForm from "./GatedNFTForm";

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
        chainId: networks[0].config.chainId,
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
        name: networks[0].config.chainName,
        chainId: parseInt(networks[0].config.chainId),
      });

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());

      // todo will use typechain
      // @ts-ignore
      const gatedNFTFactory = new ethers.Contract(
        networks[0].addresses.GATED_NFT_FACTORY,
        gatedNFTFactoryABI.abi,
        signer
      );


      // @ts-ignore
      gatedNFTState.royaltyBPS = BigNumber.from(
        Math.floor(gatedNFTState.royaltyBPS * 100)
      ); // todo check this

      // could put the defaults directly into config.param, but will need to refactor the `handleChangeState` function in the GatedNFTForm
      gatedNFTState.config = {
        name: gatedNFTState.name, symbol: gatedNFTState.symbol, description: gatedNFTState.description,
        animationUrl: gatedNFTState.animationUrl, animationHash: gatedNFTState.animationHash,
        imageUrl: gatedNFTState.imageUrl, imageHash: gatedNFTState.imageHash,
      }

      console.log(
        "Submitting the following state (with the config fields bundled into config):",
        gatedNFTState,
      );

      const txDeploy = await gatedNFTFactory.createChildTyped(
        gatedNFTState.config,
        gatedNFTState.tier, gatedNFTState.minimumStatus, gatedNFTState.maxPerAddress,
        // gatedNFTState.transferrable.value, // todo check this
        gatedNFTState.transferrable, // todo check this
        gatedNFTState.maxMintable, gatedNFTState.royaltyRecipient, gatedNFTState.royaltyBPS
      );
      const receipt = await txDeploy.wait();
      receipt.events.forEach((event: any) => {
        if (event.event == "NewChild") {
          let nftContractAddress = ethers.utils.defaultAbiCoder.decode(
            ["address", "address"],
            event.data
          )[1];
          setGatedNFTContractAddress(nftContractAddress);
        }
      });

      // if (!ethers.utils.isAddress(gatedNFTContractAddress.address)) {
      //   throw new Error(
      //     `invalid sale address: ${gatedNFTContractAddress.address} (${gatedNFTContractAddress.address.length} chars)`
      //   );
      // }

      console.log(receipt); // the sale contract
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
