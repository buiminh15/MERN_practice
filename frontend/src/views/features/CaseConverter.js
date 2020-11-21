import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { features } from '../../models/features'
import _ from "lodash";

export default function CaseConverter() {
    const init = {
        content: ""
    }
    const feature = features.filter(item => item.name === 'case-generator')[0]
    var [content, setContent] = useState(init.content)
    // var [content, setContent] = useState('aa')
    const sentenceCase = () => {
        lowerCase()
        content = content
            .match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)
            .map(sentence => sentence.replace(/[a-z]/i, letter => letter.toUpperCase()))
            .join("");
        setContent(content)
    }
    const capitalizeCase = () => {
        lowerCase();
        content = content.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        setContent(content)
    }

    const upperCase = () => {
        content = content.toUpperCase();
        setContent(content)
    }

    const lowerCase = () => {
        content = content.toLowerCase();
        setContent(content)
    }
    const camelCase = () => {
        content = content.split("\n").map(word => _.camelCase(word)).join("\n");
        setContent(content)
    }
    const snakeCase = () => {
        content = content.split("\n").map(word => _.snakeCase(word)).join("\n");
        setContent(content)
    }
    const kebabCase = () => {
        content = content.split("\n").map(word => _.kebabCase(word)).join("\n");
        setContent(content)
    }
    const inverseCase = () => {
        content = content.split("").map(s => (s === s.toUpperCase() ? s.toLowerCase() : s.toUpperCase())).join("");
        setContent(content)
    }

    return (
        <div>
            <section>
                <div className="inner">
                    <h1 className="s-title">{feature.title}</h1>
                    <h2 className="s-sub-title">{feature.subTitle}</h2>
                    <form className="s-block">
                        <div className="cases-block s-sub-block">
                            <button type="button" onClick={() => sentenceCase()}>Sentence case</button>
                            <button type="button" onClick={() => capitalizeCase()}>Capitalize Case</button>
                            <button type="button" onClick={() => upperCase()}>UPPER CASE</button>
                            <button type="button" onClick={() => lowerCase()}>lower case</button>
                            <button type="button" onClick={() => camelCase()}>camelCase</button>
                            <button type="button" onClick={() => snakeCase()}>snake_case</button>
                            <button type="button" onClick={() => kebabCase()}>kebab-case</button>
                            <button type="button" onClick={() => inverseCase()}>iNVERSE cASE</button>
                        </div>
                        <div className="content-block s-sub-block">
                            <TextareaAutosize
                                placeholder="Type your content here..."
                                onChange={(e) => setContent(e.target.value)}
                                className="s-textarea"
                                value={content}
                            ></TextareaAutosize>
                        </div>
                        <div className="counter-block s-text-with-opacity">
                            <div className="counters">
                                <span className="border-line">Character Count: {content.length}</span>
                                <span className="border-line">Word Count: {content ? content.trim().split(/\s+/).length : 0}</span>
                                <span>Line Count: {content ? content.split(/\r\n|\r|\n/).length : 0}</span>
                            </div>
                            <div>
                                <span></span>
                                <span
                                    className="s-icon-margin"

                                >
                                </span>

                            </div>
                        </div>
                    </form>
                    <p className="s-description">{feature.description}</p>
                </div>
            </section>
        </div>
    )
}
