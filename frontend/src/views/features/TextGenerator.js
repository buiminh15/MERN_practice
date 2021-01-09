import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { featureMixin } from '../../mixins/feature';
import { features } from '../../models/features';
import Header from '../components/common/Header';
import BottomFunctions from '../components/common/BottomFunctions';
import { useGlobalContext } from '../../context/context';
import { SET_CONTENT, SET_NUMBER } from '../../redux/actions';
export default function TextGenerator() {
  var {
    content,
    isCopied,
    handleState,
    maxNumberForTextArea,
    maxNumber,
    number,
    deleteTexts,
    handleCopy,
  } = useGlobalContext();

  const lorem = new LoremIpsum();
  const feature = features.filter((item) => item.name === 'text-generator')[0];
  const optionsValues = [
    'Characters',
    '2-byte Hiragana Characters',
    '2-byte Katakana Characters',
    '1-byte Katakana Characters',
    'Numbers',
    'Symbols',
    'Mixed',
    'Words',
    'Sentences',
    'Paragraphs',
  ];

  const [options, setOptions] = useState(optionsValues);
  const [option, setOption] = useState(options[0]);

  const getContent = (event) => {
    event.preventDefault();
    let contentA = '';
    if (number <= maxNumber) {
      const content = generateString();
      if (number > maxNumberForTextArea) {
        featureMixin.methods.downloadFileFromClient('content.txt', content);
      } else {
        contentA = content;
      }
    }
    handleState(SET_CONTENT, contentA);
  };

  const generateString = () => {
    if (option === 'Characters') {
      return generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    } else if (option === '2-byte Hiragana Characters') {
      return generate(
        'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわを'
      );
    } else if (option === '2-byte Katakana Characters') {
      return generate(
        'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲ'
      );
      return generate('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲ');
    } else if (option === '1-byte Katakana Characters') {
      return generate('ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦ');
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
    <>
      <Header />
      <div>
        <div className="container">
          <h1 className="s-title text-center text-capitalize">
            {feature.title}
          </h1>
          <h2 className="s-sub-title text-center text-capitalize">
            {feature.subTitle}
          </h2>
          <form onSubmit={(e) => getContent(e)} className="form-bg">
            <div className="pl-15">
              <div className="row">
                <input
                  className="input"
                  required
                  min='1'
                  step='1'
                  max={maxNumber}
                  placeholder="Number"
                  type="number"
                  onChange={(e) => handleState(SET_NUMBER, +e.target.value)}
                />
                <Dropdown
                  options={options}
                  onChange={(e) => setOption(e.value)}
                  value={options[0]}
                  className="dropdown mx-3"
                />
                <button type="submit" className="btn btn-primary">
                  Generate
                </button>
              </div>
              {number > maxNumberForTextArea && number <= maxNumber && (
                <span>
                  You have indicated the quantity more than{' '}
                  {maxNumberForTextArea} so the content will be downloaded.
                </span>
              )}
            </div>
            <div className="d-block my-4">
              <textarea
                placeholder="The content appears here..."
                maxRows="30"
                minRows="10"
                value={content}
                className="textarea"
              />
            </div>
            <BottomFunctions
              content={content}
              isCopied={isCopied}
              handleCopy={handleCopy}
              deleteTexts={deleteTexts}
            />
          </form>
          <div className="my-5">
            <p className="s-description">{feature.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
