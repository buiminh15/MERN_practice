import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { processData } from './process';

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
            var arr = obj.result.split(":")
            obj.result = "{\"" + arr[0] + "\"" + ":" + "\"" + arr[1] + "\"}"
            obj.result = JSON.parse(obj.result)
            return { ...obj, name: obj.name, result: obj.result }
        })
        //console.log('newData: ', newData);
        const [text_merged, excelCases] = processData(newData)

        console.log("===");
        console.log(text_merged.join("\n"));
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
                            Key {index}:
                            <input
                                type="text"
                                name={`${fieldName}.key`}
                                ref={register({ required: true })}
                            />
                        </label>
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
                        <label>
                            Break {index}:
                            <input
                                type="checkbox"
                                name={`${fieldName}.break`}
                                ref={register()}
                            />
                        </label>
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
