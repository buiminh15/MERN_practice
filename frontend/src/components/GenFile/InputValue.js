import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  InputBase,
  TextField,
  Button,
} from '@material-ui/core';

const inputs = [
  {
    name: 'input',
    condition_name: ['max-length', 'min-length'],
    condition_value: '2',
    result: 'aaaaa',
    index: 1,

  },
  {
    name: 'checkbox',
    values_name: ['checked', 'uncheck'],
    index: 2,
  },
];

export default function InputValue({ idx, checkState, handleCheckChange, handleChange, handleConditionChange }) {
  const field1Id = `field1-${idx}`
  const field2Id = `field2-${idx}`
  const field3Id = `field3-${idx}`
  const field4Id = `field4-${idx}`
  const field5Id = `field5-${idx}`

  const [input, setInput] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const valuesArr = [];
  // useEffect(() => {
  //   console.log('hello', input);
  //   inputs.find((obj) => {
  //     if (obj.name === input) {
  //       obj.values_name.map((val) =>
  //         valuesArr.push(
  //           <MenuItem key={val} value={val}>
  //             {val}
  //           </MenuItem>
  //         )
  //       );
  //     }
  //   });
  // }, [input]);

  // const handleChange = (event) => {
  //   setInput(event.target.value);
  //   setDisabled(false)
  // };

  // const handleConditionChange = (event) => {
  //   setCondition(event.target.value);
  // };

  return (
    <div key={`field1-${idx}`}>
      <TextField
        id={field1Id}
        name={field1Id}
        select
        label="Select"
        value={checkState[idx].name}
        onChange={handleChange}
        helperText="Please select your inputs"
        variant="outlined"
      >
        {inputs.map((option) => (
          <MenuItem key={option.index} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id={field2Id}
        name={field2Id}
        disabled={disabled}
        select
        label="Select Condition Name"
        value={checkState[idx].condition_name}
        onChange={handleConditionChange}
        helperText="Please select your condition"
        variant="outlined"
      >
        {valuesArr}
      </TextField>

      <TextField
        id={field3Id}
        name={field3Id}
        label="Enter Condition Value"
        value={checkState[idx].condition_value}
        defaultValue="Default Value"
        helperText="Some important text"
        variant="outlined"
        onChange={handleCheckChange}
      />

      <TextField
        id={field4Id}
        name={field4Id}
        disabled={disabled}
        value={checkState[idx].result}
        label="Result"
        placeholder="Placeholder"
        multiline
        variant="outlined"
        onChange={handleCheckChange}
      />
      <Button variant="outlined" color="secondary">
        X
      </Button>
    </div>
  );
}
