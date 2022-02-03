import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export default function ContractPage({}: any) {

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
            contract(first: 10) {
              id
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
    setData(res.data.contracts);
  }

  let code = `query {
    contract(first: 10) {
      id
    }`;


  return (
    <div>

      <h1>Entity: Contract</h1>

      <h2>High Level View:</h2>
      <p>Contracts represents...</p>

      <h2>Use Case:</h2>
      <p>An example where Contracts could be used would be: </p>

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
              <TableCell>ID</TableCell>
              {/*<TableCell align="right">ID</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                {/*<TableCell align="right">{row.seedBalance}</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
