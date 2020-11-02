import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormGroup,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  NativeSelect,
  InputBase,
  TextField,
  Button,
} from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
// const inputs = [
//   {
//     name: 'input',
//     values: ['max-length', 'min-length'],
//     index: 1,
//   },
//   {
//     name: 'checkbox',
//     values: ['checked', 'uncheck'],
//     index: 2,
//   },
// ];
const inputs = [
  {
    name: 'input',
    values_name: ['max-length'],
    index: 1,
  },
  {
    name: 'checkbox',
    values_name: ['checked'],
    index: 2,
  },
];
export default function InputValue(props) {
  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const valuesArr = [];
  useEffect(() => {
    console.log('hello', input);
    inputs.find((obj) => {
      if (obj.name === input) {
        obj.values_name.map((val) =>
          valuesArr.push(
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          )
        );
      }
    });
  }, [input]);
  useEffect(() => {
    function handleConditionChangeA() {
        setCondition('input');
    }
    return () => {handleConditionChangeA()};
  }, [condition]);

  const handleChange = (event) => {
    setInput(event.target.value);
    setDisabled(false)
  };

  const handleConditionChange = (event) => {
    console.log('aaaa ', event.target.value);
    setCondition(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        value={input}
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
        id="outlined-select-currency"
        disabled={disabled}
        select
        label="Select Condition"
        value={condition}
        onChange={handleConditionChange}
        helperText="Please select your condition"
        variant="outlined"
      >
        {valuesArr}
      </TextField>

      <TextField
        id="outlined-helperText"
        label="Enter Value"
        defaultValue="Default Value"
        helperText="Some important text"
        variant="outlined"
      />

      <TextField
        id="outlined-textarea"
        disabled={disabled}
        label="Multiline KQ"
        placeholder="Placeholder"
        multiline
        variant="outlined"
      />
      <Button variant="outlined" color="secondary">
        X
      </Button>
    </form>

    // <FormGroup>
    //   <div className="row">
    //     <div className="col col-2">
    //       <FormControl className={classes.margin}>
    //         <InputLabel htmlFor="demo-customized-textbox">Type </InputLabel>
    //         <Select
    //           labelId="demo-customized-select-label"
    //           style={{ width: 'auto' }}
    //           value={items}
    //           placeholder="assf"
    //           input={<BootstrapInput id={'key' + props.index} />}
    //         >
    //           {datas &&
    //             datas.map((item, index) => (
    //               <MenuItem
    //                 value={item}
    //                 onClick={() => handleChange(item, index)}
    //               >
    //                 {item}
    //               </MenuItem>
    //             ))}
    //         </Select>
    //       </FormControl>
    //     </div>

    //     <div className="col col-3">
    //       <FormControl className={classes.margin}>
    //         <InputLabel htmlFor="demo-customized-textbox">Key</InputLabel>
    //         <Select
    //           labelId="demo-customized-select-label"
    //           style={{ width: '150px' }}
    //           value={items}
    //           input={<BootstrapInput id={'key' + props.index} />}
    //         >
    //           {datas &&
    //             datas.map((item, index) => (
    //               <MenuItem
    //                 value={item}
    //                 onClick={() => handleChange(item, index)}
    //               >
    //                 {item}
    //               </MenuItem>
    //             ))}
    //         </Select>
    //       </FormControl>
    //     </div>
    //     <div className="col col-3">
    //       <FormControl className={classes.margin}>
    //         <InputLabel htmlFor="demo-customized-textbox">Value</InputLabel>
    //         <BootstrapInput id={'value' + props.index} />
    //       </FormControl>
    //     </div>

    //     <div className="col col-3">
    //       <FormControl className={classes.margin}>
    //         <InputLabel htmlFor="demo-customized-textbox">Result</InputLabel>
    //         <BootstrapInput id={'value' + props.index} />
    //       </FormControl>
    //     </div>
    //     <div className="col col-2">
    //         <button className="btn btn-danger">X</button>
    //     </div>
    //   </div>
    // </FormGroup>
  );
}
