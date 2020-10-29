import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import InputValue from './InputValue'

export default function GenFile() {
    const [data, setData] = React.useState([]);

    const addComponent = () => {
        var dataCopy = [...data]
        dataCopy.push(<InputValue key={dataCopy.length + 1} index={dataCopy.length + 1} />)
        setData(dataCopy)
    };

    const getDataHandler = () => {
        var obj = {
            input: {}
        };
        for (var i = 0; i < data.length; i++) {
            var key = eval("key" + (i + 1)).value;
            var val = eval("value" + (i + 1)).value;
            obj.input[key] = val
        }
        console.log(JSON.stringify(obj, null, 4));
    };
    return (
        <div className="container">
            {data}
            <div className="row">
                <div className="col col-4"></div>
                <div className="col col-4">
                    <Button variant="contained" color="primary" onClick={addComponent}>Add More</Button>
                </div>
                <div className="col col-4">
                    <Button variant="contained" color="primary" onClick={getDataHandler}>Gen Data</Button>
                </div>
            </div>


        </div>
    )
}
