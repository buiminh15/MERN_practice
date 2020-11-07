import React, { useEffect } from 'react';

const inputs = [
    {
        name: 'input',
        values_name: ['max-length', 'min-length'],
        index: 1,
    },
    {
        name: 'checkbox',
        values_name: ['checked', 'uncheck'],
        index: 2,
    },
];

export default function InputValue2(props) {
    const [data, setData] = React.useState({ input: '', condition: '', value: '', result: '' })
    const [datas, setDatas] = React.useState([])

    // const handleInput = (event) => {
    //     setData({ ...data, input: event.target.value });
    // }

    // const handleCondition = (event) => {
    //     setData({ ...data, condition: event.target.value });
    // }

    // const handleValue = (event) => {
    //     setData({ ...data, value: event.target.value })
    // }

    // const handleResult = (event) => {
    //     setData({ ...data, result: event.target.value })
    // }


    const handleChange = (event) => {
        setData({
            ...data,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('data: ', data);
        setDatas([...datas, data])
        // setData({ input: '', condition: '', value: '', result: '' })
        console.log(datas);
    }

    const findObject = (obj) => {
        return obj.name === data.input
    }

    return (
        <div>
            <form>
                <select name="input" value={data.input} onChange={handleChange}>
                    {
                        inputs.map(val => (
                            <option value={val.name}>{val.name}</option>
                        ))
                    }
                </select>

                <select name="condition" name="" id="" value={data.condition} onChange={handleChange}>
                    {
                        inputs.find(findObject) && inputs.find(findObject).values_name.map(item => (
                            <option value={item}>{item}</option>
                        ))
                    }
                </select>

                <input name="value" type="text" value={data.value} onChange={handleChange} placeholder="enter value" />
                <input name="result" type="text" value={data.result} onChange={handleChange} placeholder="enter result" />

            </form>
            
            <input type="button" value="Submit" onClick={handleSubmit}/>

        </div>
    );
}
