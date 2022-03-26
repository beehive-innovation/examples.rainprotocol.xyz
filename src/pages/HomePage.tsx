import React from "react";
import {Grid, Link, Paper} from "@mui/material";

export default function HomePage({}: any) {

  return (
    <div>
      <h2>Rain Protocol - Examples Site</h2>
      <h4>Build Your Economy</h4>

      <p><a target="_blank" href="https://rainprotocol.xyz">
        Main Website
      </a> for Rain Protocol</p>

      <p><a target="_blank" href="https://docs.rainprotocol.xyz">
        Main Docs
      </a> for Rain Protocol</p>

      <p><a target="_blank" href="https://github.com/beehive-innovation">
        Main Github
      </a> for Rain Protocol</p>

      <p><a target="_blank" href="https://docs.rainprotocol.xyz/guides/Opcodes/running-an-opcodes-example">
        Matching tutorials
      </a> for this site, these are also linked individually per example</p>

      <p><a target="_blank" href="https://github.com/beehive-innovation/examples.rainprotocol.xyz">
        Matching Github
      </a> for this repo (please be aware that examples in the tutorials don't use Material UI for styling)</p>

      <p>Also check out the <a target="_blank" href="https://thegraph.com/hosted-service/subgraph/beehive-innovation/rain-protocol">Subgraph Playground</a></p>
    </div>
  )
}
