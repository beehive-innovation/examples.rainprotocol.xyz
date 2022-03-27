import "../../App.css";
import React, { useState } from "react";
import { networks } from "./networks";
import { Contract, ethers } from "ethers";
import saleFactoryABI from "./saleFactoryABI.json";
import saleContractABI from "./saleContractABI.json";
import defaults from "./defaults.json";
import { Button, Divider, Link, Typography } from "@mui/material";
import SaleForm from "./SaleForm";
import RedeemableForm from "./RedeemableForm";
import { concat } from "ethers/lib/utils";
import { op } from "./utils";

export const enum Opcode {
  SKIP,
  VAL,
  DUP,
  ZIPMAP,
  BLOCK_NUMBER,
  BLOCK_TIMESTAMP,
  SENDER,
  IS_ZERO,
  EAGER_IF,
  EQUAL_TO,
  LESS_THAN,
  GREATER_THAN,
  EVERY,
  ANY,
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  POW,
  MIN,
  MAX,
  REPORT,
  NEVER,
  ALWAYS,
  SATURATING_DIFF,
  UPDATE_BLOCKS_FOR_TIER_RANGE,
  SELECT_LTE,
  ERC20_BALANCE_OF,
  ERC20_TOTAL_SUPPLY,
  ERC721_BALANCE_OF,
  ERC721_OWNER_OF,
  ERC1155_BALANCE_OF,
  ERC1155_BALANCE_OF_BATCH,
  REMAINING_UNITS,
  TOTAL_RESERVE_IN,
  LAST_BUY_BLOCK,
  LAST_BUY_UNITS,
  LAST_BUY_PRICE,
  CURRENT_BUY_UNITS,
  TOKEN_ADDRESS,
  RESERVE_ADDRESS,
}

export const getNewChildFromReceipt = (receipt: any, parentContract: any) => {
  return ethers.utils.defaultAbiCoder.decode(
    ["address", "address"],
    receipt.events.filter(
      (event: any) =>
        event.event == "NewChild" &&
        event.address.toUpperCase() == parentContract.address.toUpperCase()
    )[0].data
  )[1];
};

export const afterTimestampConfig = (timestamp: any) => {
  return {
    sources: [
      concat([
        // (BLOCK_NUMBER blockNumberSub1 gt)
        op(Opcode.BLOCK_TIMESTAMP),
        op(Opcode.VAL, 0),
        op(Opcode.GREATER_THAN),
      ]),
    ],
    constants: [timestamp],
    stackLength: 3,
    argumentsLength: 0,
  };
};

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
export default function DeploySaleExample({}: any) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [saleState, setSaleState] = useState(defaults.sale);
  const [redeemableState, setRedeemableState] = useState(defaults.redeemable);

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
  const deploySaleExample = async () => {
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
      const saleFactory = new ethers.Contract(
        networks[0].addresses.SALE_FACTORY,
        saleFactoryABI.abi,
        signer
      );

      const staticPrice = 100; // todo this might not work and is not currently retreived dynamically here from a reserveErc20
      const walletCap = 10; // too see above

      const constants = [staticPrice, walletCap, ethers.constants.MaxUint256];
      const sources = [
        concat([
          op(Opcode.CURRENT_BUY_UNITS),
          op(Opcode.TOKEN_ADDRESS),
          op(Opcode.SENDER),
          op(Opcode.ERC20_BALANCE_OF),
          op(Opcode.ADD, 2),
          op(Opcode.VAL, 1),
          op(Opcode.GREATER_THAN),
          op(Opcode.VAL, 2),
          op(Opcode.VAL, 0),
          op(Opcode.EAGER_IF),
        ]),
      ];

      // TODO: This is sent to `afterTimestampConfig` function and cause the `constant` being a NaN
      // let raiseRange;
      // In the rain tool kit, this variable is set with a range of dates on front end where [0] is start date
      // and [1] is end date.
      // I added both Dates:
      // The startDate is raiseRange[0] and will be the current Date
      // The endDate is raiseRange[1] and will be the current Date + 30 minutes (30 * 60000 miliseconds)
      const currentDate = new Date();
      const raiseRange = [
        currentDate,
        new Date(currentDate.getTime() + 30 * 60000),
      ];
      // let raiseRange;

      let extendedSaleState: any = saleState;
      extendedSaleState.canStartStateConfig = afterTimestampConfig(
        Math.floor(raiseRange[0].getTime() / 1000)
        // @ts-ignore
        // Math.floor(raiseRange?.[0].$d.getTime() / 1000)
      );
      extendedSaleState.canEndStateConfig = afterTimestampConfig(
        Math.floor(raiseRange[1].getTime() / 1000)
        // @ts-ignore
        // Math.floor(raiseRange?.[1].$d.getTime() / 1000)
      );

      extendedSaleState.calculatePriceStateConfig = {
        sources,
        constants,
        stackLength: 10,
        argumentsLength: 0,
      };
      extendedSaleState.dustSize = 0;

      // big numbers
      // extendedSaleState.cooldownDuration = ethers.utils.parseUnits(extendedSaleState.cooldownDuration.toString())
      extendedSaleState.minimumRaise = ethers.utils.parseUnits(
        extendedSaleState.minimumRaise.toString()
      );

      let extendedRedeemableState: any = redeemableState;
      // todo find a way to do away with this
      extendedRedeemableState.erc20Config = {
        name: extendedRedeemableState.name,
        symbol: extendedRedeemableState.symbol,
        distributor: ethers.constants.AddressZero,
        initialSupply: ethers.utils.parseUnits(
          extendedRedeemableState.initialSupply.toString()
        ),
      };

      // todo might need to remove: price, saleTimeout, startBlock
      // todo might need to remove initial supply (2nd one), minimum status, name, symbol, raiseRange, walletCap
      delete extendedSaleState.price;
      delete extendedSaleState.saleTimeout;
      delete extendedSaleState.startBlock;
      delete extendedRedeemableState.initialSupply;
      // delete extendedRedeemableState.minimumStatus;
      delete extendedRedeemableState.name;
      delete extendedRedeemableState.symbol;
      delete extendedRedeemableState.raiseRange;
      delete extendedRedeemableState.walletCap;

      console.log(
        "Submitting the following state:",
        extendedSaleState,
        extendedRedeemableState
      );

      const txDeploy = await saleFactory.createChildTyped(
        saleState,
        redeemableState
      );
      const receipt = await txDeploy.wait();
      const saleContractAddress = getNewChildFromReceipt(receipt, saleFactory);
      console.log(saleContractAddress);

      const sale = new ethers.Contract(
        saleContractAddress,
        saleContractABI.abi,
        signer
      ) as Contract;

      if (!ethers.utils.isAddress(sale.address)) {
        throw new Error(
          `invalid sale address: ${sale.address} (${sale.address.length} chars)`
        );
      }

      console.log(sale); // the sale contract
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
        <Typography variant="h4">Deploy Sale Example</Typography>

        <br />

        <Button variant="contained" onClick={connectWalletHandler}>
          Connect
        </Button>

        <br />

        <Typography>{`Connected as: ${currentAccount}`}</Typography>

        <br />

        <SaleForm
          defaults={defaults.sale}
          saleState={saleState}
          setSaleState={setSaleState}
          currentAccount={currentAccount}
        />

        <RedeemableForm
          defaults={defaults.redeemable}
          redeemableState={redeemableState}
          setRedeemableState={setRedeemableState}
        />

        <Button variant="contained" onClick={deploySaleExample}>
          Deploy Sale Example
        </Button>

        <br />

        <Divider
          variant="middle"
          style={{ background: "white", width: "90%" }}
        />

        <br />

        <Link
          href="https://docs.rainprotocol.xyz/guides/Opcodes/running-an-opcodes-example"
          variant="body2"
        >
          Tutorial
        </Link>

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
