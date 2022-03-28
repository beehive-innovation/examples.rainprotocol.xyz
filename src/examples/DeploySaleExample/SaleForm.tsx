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
 * @param saleState
 * @param setSaleState
 * @param currentAccount
 * @constructor
 */
export default function SaleForm ({defaults, saleState, setSaleState, currentAccount}: any) {

  /**
   * Watch currentAccount for when it is changed
   */
  useEffect(() => {
    handleChangeState(currentAccount, 'recipient');
  }, [currentAccount]);

  /**
   * @param value
   * @param type Corresponds to the keys in defaults.json
   */
  const handleChangeState = (value: any, type: any) => {
    saleState[type] = value;
    setSaleState(saleState);
    console.log('saleState updated:', saleState);
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
        <InputLabel htmlFor="component-outlined">Recipient (use connect above)</InputLabel>
        <OutlinedInput
          sx={{
            color: 'white',
          }}
          id="component-outlined"
          value={currentAccount}
          onChange={(event) => { handleChangeState(currentAccount, 'recipient')}}
          label="Recipient (use connect above)"
        />
      </FormControl>
    </Box>
  )
}
