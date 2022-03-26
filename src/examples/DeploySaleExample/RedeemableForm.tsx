import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

/**
 * Redeemable Form - please note that these examples are examples and don't necessarily follow best coding practices
 *
 * @param defaults
 * @param redeemableState
 * @param setRedeemableState
 * @constructor
 */
export default function RedeemableForm ({defaults, redeemableState, setRedeemableState}: any) {

  /**
   * @param value
   * @param type Corresponds to the keys in defaults.json
   */
  const handleChangeState = (value: any, type: any) => {
    redeemableState[type] = value;
    setRedeemableState(redeemableState);
    console.log('redeemableState updated:', redeemableState);
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
          defaultValue={'MyToken'}
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
          defaultValue={'mTKN'}
          onChange={(event) => { handleChangeState(event.target.value,'symbol')}}
          label="My Token Symbol"
        />
      </FormControl>
    </Box>
  )
}
