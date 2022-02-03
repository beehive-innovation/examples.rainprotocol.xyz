import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function RedeemablePage({}: any) {

  // const [data, setData] = useState([]);
  //
  // useEffect(() => {
  //   getData();
  // }, [])
  //
  // async function getData() {
  //
  //   // desc seems to show the most recent
  //   let res = await fetch(`https://api.thegraph.com/subgraphs/name/beehive-innovation/rain-protocol`, {
  //     method: 'POST',
  //     headers: {
  //       // 'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: `
  //         query {
  //           trustParticipants(first: 10) {
  //             id
  //             user
  //             tokenBalance
  //             seedBalance
  //           }
  //         }
  //       `
  //     })
  //   });

  //   res = await res.json();
  //   console.log(res);
  //   // @ts-ignore
  //   setData(res.data.trustParticipants);
  // }

  // let code = `query {
  //   trustParticipants(first: 10) {
  //     id
  //     user
  //     tokenBalance
  //     seedBalance
  //   }`;


  return (
    <div>

      <h1>Type: Redeemable</h1>

      <h2>High Level View:</h2>
      <p>This Type represents...</p>

    </div>
  )
}
