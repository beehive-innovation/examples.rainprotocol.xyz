import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useEffect} from "react";

/**
 * Sale Form - please note that these examples are examples and don't necessarily follow best coding practices
 *
 * @param defaults
 * @param gatedNFTState
 * @param setGatedNFTState
 * @param currentAccount
 * @constructor
 */
export default function GatedNFTForm ({defaults, gatedNFTState, setGatedNFTState, currentAccount}: any) {

  /**
   * Watch currentAccount for when it is changed
   */
  useEffect(() => {
    handleChangeState(currentAccount, 'royaltyRecipient');
  }, [currentAccount]);

  /**
   * Could move the 'defaults.json into config.param but will have to do this function differently)
   * @param value
   * @param type Corresponds to the keys in defaults.json
   */
  const handleChangeState = (value: any, type: any) => {
    gatedNFTState[type] = value;
    setGatedNFTState(gatedNFTState);
    console.log('gatedNFTState updated:', gatedNFTState);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl focused color="primary">
        <InputLabel htmlFor="component-outlined">My Token Name</InputLabel>
        <OutlinedInput
          sx={{
            color: 'white',
          }}
          id="component-outlined"
          defaultValue={gatedNFTState.name}
          onChange={(event) => { handleChangeState(event.target.value,'name')}}
          label="My Token Name"
        />
      </FormControl>

      <br/>

      <FormControl focused color="primary">
        <InputLabel htmlFor="component-outlined">My Token Symbol</InputLabel>
        <OutlinedInput
          sx={{
            color: 'white',
          }}
          id="component-outlined"
          defaultValue={gatedNFTState.symbol}
          onChange={(event) => { handleChangeState(event.target.value,'symbol')}}
          label="My Token Symbol"
        />
      </FormControl>

      <br/>

      <FormControl focused color="primary">
        <InputLabel htmlFor="component-outlined">Recipient (use connect above)</InputLabel>
        <OutlinedInput
          sx={{
            color: 'white',
          }}
          id="component-outlined"
          value={currentAccount}
          onChange={(event) => { handleChangeState(currentAccount, 'royaltyRecipient')}}
          label="Royalty Recipient (use connect above)"
        />
      </FormControl>

      <br/>
    </Box>
  )
}
