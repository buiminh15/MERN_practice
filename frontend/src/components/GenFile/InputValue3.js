import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { convertData, getText } from './process';
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

export default function InputValue3(props) {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, errors, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const onSubmit = data => {
        const newData = data['PCL'].map((obj, index) => {
            obj.name = obj.element + ' ' + index
            return { ...obj, name: obj.name }
        }
        )
        console.log('newData: ', newData);
        const convertedData = convertData(newData)
        console.log("===");
        var [text, cases] = getText(convertedData)

        // hien thi text
        console.log(text.join("\n"));

        // chuyen cases thanh tick va tab
        var excelCases = [];
        var len = cases[0].length;
        for (var i = 0; i < len; i++) {
            var row = "";
            for (var j = 0; j < cases.length; j++) {
                row += (cases[j][i] === "1" ? "\u25ef" : "") + "\t";
            }
            excelCases.push(row);
        }
        console.log("===");
        console.log(excelCases.join("\n"));
        console.log("===");

    };

    const addFriend = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeFriend = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const clearFriends = () => {
        setIndexes([]);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {indexes.map(index => {
                const fieldName = `PCL[${index}]`;
                return (
                    <fieldset name={fieldName} key={fieldName}>
                        <label>
                            Element {index}:
                            <input
                                type="text"
                                name={`${fieldName}.element`}
                                ref={register({ required: true })}

                            />
                        </label>
                        {errors.element && "Element is required"}
                        <label>
                            Option {index}:
                            <input
                                type="text"
                                name={`${fieldName}.option`}
                                ref={register({ required: true })}

                            />
                        </label>
                        {errors.option && "Option is required"}
                        <label>
                            Value {index}:
                            <input
                                type="text"
                                name={`${fieldName}.value`}
                                ref={register({ required: true })}

                            />
                        </label>
                        {errors.value && "Value is required"}
                        <label>
                            Expect Result {index}:
                            <input
                                type="text"
                                name={`${fieldName}.result`}
                                ref={register({ required: true })}

                            />
                        </label>
                        {errors.result && "Result is required"}
                        <button type="button" onClick={removeFriend(index)}>
                            Remove
              </button>
                    </fieldset>
                );
            })}
            <button type="button" onClick={addFriend}>
                Add Conditions
        </button>
            <button type="button" onClick={clearFriends}>
                Clear Conditions
        </button>
            <input type="submit" />
        </form>
    );
}
