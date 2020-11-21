import React, { useState } from 'react'
import Dropdown from 'react-dropdown';
import { features } from '../../models/features'
import TextareaAutosize from 'react-textarea-autosize';
import { diffJson, diffLines, diffWords, diffArrays, diffCss } from "diff";

export default function DataComparer() {
    var init = {
        format: "JSON",
        firstData: "",
        secondData: "",
        amountAdded: null,
        amountDeleted: null,
    }
    var feature = features.filter(item => item.name === 'data-comparer')[0]
    var optionsValues = [
        'JSON', 'XML', 'CSV', 'YAML', 'TXT', 'ARRAY', 'CSS'
    ];
    var [options, setOptions] = useState(optionsValues);
    var [format, setFormat] = useState(options[0]);
    var [firstData, setFirstData] = useState(init.firstData);
    var [secondData, setSecondData] = useState(init.secondData);
    var [amountAdded, setAmountAdded] = useState(init.amountAdded);
    var [amountDeleted, setAmountDeleted] = useState(init.amountDeleted);

    var compare = (e) => {
        e.preventDefault()
        var result = document.getElementById("result");
        result.textContent = "";
        amountAdded = amountDeleted = 0;
        getDiff().forEach((part) => {
            var span = document.createElement("span");
            if (part.added) {
                span.style.color = "#406619";
                span.style.background = "#eaf2c2";
                amountAdded += part.count;
                setAmountAdded(amountAdded)
            } else if (part.removed) {
                span.style.color = "#b30000";
                span.style.background = "#fadad7";
                amountDeleted += part.count;
                setAmountDeleted(amountDeleted)
            }
            span.appendChild(document.createTextNode(part.value));
            result.appendChild(span);
        });
    }

    var getDiff = () => {
        console.log('firstData ', firstData);
        console.log('secondData ', secondData);
        if (format === "JSON") {
            return diffJson(firstData, secondData);
        } else if (format === "XML" || format === "YAML") {
            return diffLines(firstData, secondData);
        } else if (format === "CSV" || format === "TXT") {
            return diffWords(firstData, secondData);
        } else if (format === "ARRAY") {
            return diffArrays(firstData, secondData);
        } else if (format === "CSS") {
            return diffCss(firstData, secondData);
        }
    }

    return (
        <div>
            <section>
                <div>
                    <h1 className="s-title">{feature.title}</h1>
                    <h2 className="s-sub-title">{feature.subTitle}</h2>
                </div>
                <form onSubmit={e => compare(e)}>
                    <div>
                        <div>
                            <Dropdown
                                options={options}
                                onChange={(e) => setFormat(e.value)}
                                value={options[0]}
                            />
                            <button type="submit">Compare</button>
                        </div>
                        <div className="s-margin-between-elems">
                            {/* {
                                amountAdded || amountDeleted &&
                                <span className="s-warning-message">
                                    Value added: {amountAdded} | Value deleted: {amountDeleted}
                                </span>
                            } */}
                            {
                                amountAdded === 0 && amountDeleted === 0 ?
                                    <span
                                        className="s-warning-message">
                                        Data are semantically identical
                                </span> :
                                    <span className="s-warning-message">
                                        Value added: {amountAdded} | Value deleted: {amountDeleted}
                                    </span>
                            }

                        </div>
                    </div>
                    <div className="data-blocks s-sub-block">
                        <div className="data-block">
                            <TextareaAutosize
                                id="firstData"
                                onChange={(e) => setFirstData(e.target.value)}
                                value={firstData}
                                className="s-textarea"
                                placeholder="Type your data here..."
                            ></TextareaAutosize>
                        </div>
                        <div className="data-block">
                            <TextareaAutosize
                                id="secondData"
                                onChange={(e) => setSecondData(e.target.value)}
                                value={secondData}
                                className="s-textarea"
                                placeholder="Type your data here..."
                            ></TextareaAutosize>
                        </div>
                        <div className="data-block">
                            <pre id="result" className="s-element"></pre>
                        </div>
                    </div>
                </form>
                <p className="s-description">{feature.description}</p>
            </section >
        </div >
    )
}
