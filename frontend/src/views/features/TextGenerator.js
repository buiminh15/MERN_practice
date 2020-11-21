import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TextareaAutosize from 'react-textarea-autosize';
import { FaCopy, FaSave } from 'react-icons/fa';
import { AiFillDelete } from "react-icons/ai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect } from 'react';
import { featureMixin } from '../../mixins/feature';
import { features } from '../../models/features'
export default function TextGenerator() {
  const init = {
    number: null,
    maxNumberForTextArea: 10000,
    maxNumber: 100000,
    entity: "Characters",
    result: "",
    isCopied: false
  }
  const lorem = new LoremIpsum();
  const feature = features.filter(item => item.name === 'text-generator')[0]

  const optionsValues = [
    'Characters',
    '2-byte Hiragana Characters',
    '2-byte Katakana Characters',
    'Numbers',
    'Symbols',
    'Mixed',
    'Words',
    'Sentences',
    'Paragraphs',
  ];

  const [options, setOptions] = useState(optionsValues);
  const [option, setOption] = useState(options[0]);
  const [number, setNumber] = useState(init.number)
  const [result, setResult] = useState(init.result);
  const [copied, setCopied] = useState(init.isCopied)
  useEffect(() => {
    setTimeout(() => setCopied(false), 2000)
  }, [copied])

  const getResult = (event) => {
    event.preventDefault()
    let resultA = ''
    if (number <= init.maxNumber) {
      const result = generateString()
      if (number > init.maxNumberForTextArea) {
        featureMixin.methods.downloadFileFromClient("result.txt", result)
      } else {
        resultA = result
      }
    }
    setResult(resultA)
  }

  const generateString = () => {
    if (option === 'Characters') {
      return generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    } else if (option === '2-byte Hiragana Characters') {
      return generate('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわを');
    } else if (option === '2-byte Katakana Characters') {
      return generate('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲ');
    } else if (option === 'Numbers') {
      return generate('0123456789');
    } else if (option === 'Symbols') {
      return generate('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
    } else if (option === 'Mixed') {
      return generate(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
      );
    } else if (option === 'Words') {
      return lorem.generateWords(number);
    } else if (option === 'Sentences') {
      return lorem.generateSentences(number);
    } else if (option === 'Paragraphs') {
      return lorem.generateParagraphs(number);
    }
  };

  const generate = (values) => {
    return [...Array(number)]
      .map((_) => values[~~(Math.random() * values.length)])
      .join('');
  };

  return (
    <div>
      <section>
        <div className="inner">
          <h1 className="s-title">{feature.title}</h1>
          <h2 className="s-sub-title">{feature.subTitle}</h2>
          <form onSubmit={e => getResult(e)}>
            <div>
              <label>
                <input required max={init.maxNumber} placeholder="Number" type="number" onChange={e => setNumber(+e.target.value)} />
              </label>
              <Dropdown
                options={options}
                onChange={(e) => setOption(e.value)}
                value={options[0]}
                placeholder="Select an option"
              />
              <button type="submit">Generate</button>
            </div>
            {
              number > init.maxNumberForTextArea && number <= init.maxNumber &&
              <span>You have indicated the quantity more than {init.maxNumberForTextArea} so the result will be downloaded.</span>
            }
            <div>
              <TextareaAutosize
                placeholder="The result appears here..."
                maxRows="30"
                minRows="10"
                value={result}
              />
            </div>
            <div>
              <div>
                <span className="border-line">Character Count: {result.length}</span>
                <span className="border-line">Word Count: {result ? result.trim().split(/\s+/).length : 0}</span>
                <span>Line Count: {result ? result.split(/\r\n|\r|\n/).length : 0}</span>
              </div>
              <div>
                <span onClick={() => featureMixin.methods.downloadFileFromClient('text.txt', result)}>
                  <FaSave />
                </span>
                <CopyToClipboard text={result}
                  onCopy={() => setCopied(true)}>
                  <span><FaCopy /></span>
                </CopyToClipboard>
                {copied ?
                  <span style={{ color: 'red' }}>Copied.</span> : null}
                <span onClick={() => setResult('')}>
                  <AiFillDelete />
                </span>
              </div>
            </div>
          </form>
          <p className="s-description">{feature.description}</p>
        </div>
      </section>
    </div>
  );
}
