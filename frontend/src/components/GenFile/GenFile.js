import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputValue from './InputValue';
import NavbarCustom from './NavbarCustom';
import { List, ListItem } from '@material-ui/core';
import InputValue2 from './InputValue2';
import InputValue3 from './InputValue3';

export default function GenFile() {
  const [data, setData] = React.useState([]);

  const addComponent = () => {
    var dataCopy = [...data];
    dataCopy.push(
        <ListItem >
            <InputValue3 key={dataCopy.length + 1} index={dataCopy.length + 1} />
        </ListItem>
    );
    setData(dataCopy);
  };

  const getDataHandler = () => {
    var obj = {
      input: {},
    };
    for (var i = 0; i < data.length; i++) {
      var key = eval('key' + (i + 1)).value;
      var val = eval('value' + (i + 1)).value;
      obj.input[key] = val;
    }
    console.log(JSON.stringify(obj, null, 4));
  };
  return (
    <>
      <NavbarCustom />
      <div className="container" style={{ marginTop: '80px' }}>
        <InputValue3 />
        {/* <List>{data}</List> */}
        {/* <div className="row">
          <div className="col col-4"></div>
          <div className="col col-4">
            <Button variant="contained" color="primary" onClick={addComponent}>
              Add More
            </Button>
          </div>
          <div className="col col-4">
            <Button
              variant="contained"
              color="primary"
              onClick={getDataHandler}
            >
              Gen Data
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
}
