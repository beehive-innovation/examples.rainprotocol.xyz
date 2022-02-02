import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import Web3 from 'web3';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    // desc seems to show the most recent
    let res = await fetch(`https://api.thegraph.com/subgraphs/name/vishalkale151071/rain-protocol`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query {
            trustFactories(first: 5) {
              id
              trustCount
              trusts {
                id
              }
            }
          }
        `
      })
    });

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
    setData(res.data.trustFactories);
  }


  return (
    <div>
      <h2>Trust Factories</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Trust Count</TableCell>
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
                <TableCell align="right">{row.trustCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br/>
      <br/>
      <a target="_blank" href="https://github.com/unegma/examples.rainprotocol.xyz.git">Github</a>

    </div>
  );
}

export default App;
