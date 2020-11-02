import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import InputValue from './InputValue';
import NavbarCustom from './NavbarCustom';
import { List, ListItem } from '@material-ui/core';

export default function GenFile() {
    const blankCheck = { name: '', condition_name: [], condition_value: '', result: '' }
    const [checkState, setCheckState] = useState([{ ...blankCheck }])

    const addCheck = () => {
        setCheckState([...checkState, { ...blankCheck }])
    }

    const handleCheckChange = (e) => {
        const updatedChecks = [...checkState]
        updatedChecks[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedChecks);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`22222 `,ownerState );
        console.log(`1111 `,catState );
      };
    const [data, setData] = React.useState([]);

    const addComponent = () => {
        var dataCopy = [...data];
        dataCopy.push(
            <ListItem >
                <InputValue key={dataCopy.length + 1} index={dataCopy.length + 1} />
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
                <List>{data}</List>
                <div className="row">
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
                </div>
            </div>
        </>
    );
}
