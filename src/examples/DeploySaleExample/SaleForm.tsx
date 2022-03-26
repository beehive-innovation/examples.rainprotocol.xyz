import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useEffect} from "react";

// todo add a disclaimer that these examples are examples and dont necessarily follow best codin practices

export default function SaleForm ({defaults, saleState, setSaleState, currentAccount}: any) {

  // const [reserve, setReserve] = React.useState(defaults.reserve);

  useEffect(() => {
    handleChangeState(currentAccount, 'recipient');
  }, [currentAccount]);


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
        // minWidth: '500px',
        // minHeight: '500px',
        // bgcolor: 'white',
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
      {/*<br/>*/}
      {/*<FormControl>*/}
      {/*  <InputLabel htmlFor="component-outlined">Reserve</InputLabel>*/}
      {/*  <OutlinedInput*/}
      {/*    id="component-outlined"*/}
      {/*    defaultValue={defaults.reserve}*/}
      {/*    onChange={(event) => { handleChangeState(event.target.value,'reserve')}}*/}
      {/*    label="Reserve"*/}
      {/*  />*/}
      {/*</FormControl>*/}
    </Box>
  )
}
