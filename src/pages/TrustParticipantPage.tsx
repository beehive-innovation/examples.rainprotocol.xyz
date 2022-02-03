import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function TrustParticipantPage({}: any) {

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    // desc seems to show the most recent
    let res = await fetch(`https://api.thegraph.com/subgraphs/name/beehive-innovation/rain-protocol`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            trustParticipants(first: 10) {
              id
              user
              tokenBalance
              seedBalance
            }
          }
        `
      })
    });

    // query {
    //   trustFactories(first: 5) {
    //     id
    //     trustCount
    //     trusts {
    //       id
    //     }
    //   }
    // }

    // query {
    //   trustParticipants {
    //     id
    //     user
    //     tokenBalance
    //     seedBalance
    //   }
    // }

    res = await res.json();
    console.log(res);
    // @ts-ignore
    setData(res.data.trustParticipants);
  }

  let code = `query {
    trustParticipants(first: 10) {
      id
      user
      tokenBalance
      seedBalance
    }`;


  return (
    <div>

      <h1>Entity: TrustParticipant</h1>

      <h2>High Level View:</h2>
      <p>Trust Participants represents...</p>

      <h2>Use Case:</h2>
      <p>Say I want to answer a question such as: how many users are in the system, and what are their seed and token balances?
        I could use a call like the following to Trust Participants in order to answer such a question:</p>

      <h2>GraphQL Query:</h2>
      <code>
        `{code}`
      </code>

      <br/>

      <h2>Code:</h2>
      <p>In order to see how to do this in Javascript, visit the <a target="_blank" href="https://github.com/unegma/examples.rainprotocol.xyz.git">examples repo on Github</a></p>

      <h2>Result:</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Seed Balance</TableCell>
              <TableCell align="right">Token Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.user}
                </TableCell>
                <TableCell align="right">{row.seedBalance}</TableCell>
                <TableCell align="right">{row.tokenBalance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
