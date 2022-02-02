import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// import Web3 from 'web3';

function App() {

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    // desc seems to show the most recent
    let data = await fetch(`https://api.thegraph.com/subgraphs/name/vishalkale151071/rain-protocol`, {
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

    data = await data.json();
    console.log(data);
  }


  return (
    <div>
    </div>
  );
}

export default App;
