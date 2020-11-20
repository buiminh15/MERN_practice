import React, { useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TextareaAutosize from 'react-textarea-autosize';

export default function TextGenerator() {
  const lorem = new LoremIpsum();
  const feature = {
    title: 'Random text generator',
    subTitle: 'Create dummy text for all your layout needs',
    description:
      'This generator allows to generate random text for testing purposes. ' +
      'If you are the QA Engineer, you, probably, have needed at least once to paste any dummy text to test ' +
      'the field in the site, or to test any function, or feature, etc. It takes time to find any random text with exact ' +
      'symbols or words you need. But with our generator you can create random text in several seconds. ' +
      'Usually, the most often used dummy text is the text which begins with "Lorem Ipsum". ' +
      'We use this text for our generator too. All our generators are created by testers, so we ' +
      'truly believe that this random symbols generator will save your time.',
    icon: ['fas', 'pen-square'],
    path: '/text-generator/',
    name: 'text-generator',
    meta: {
      layout: 'main',
      title: 'Random text generator - Fast random text for web or typography',
      tag:
        'This text generator will allow you to create a dummy text that you can use for testing any software.',
    },
    component: TextGenerator,
  };

  const optionsValues = [
    'Characters',
    'Numbers',
    'Symbols',
    'Mixed',
    'Words',
    'Sentences',
    'Paragraphs',
  ];

  const [options, setOptions] = useState(optionsValues);
  const [option, setOption] = useState(options[0]);
  const [number, setNumber] = useState(1)
  const [result, setResult] = useState('');
  console.log('init number: ', number)
  const getResult = (event) => {
      event.preventDefault()
      const result = generateString()
      console.log('getResult :', result);
      setResult(result)
  }

  const generateString = () => {
    if (option === 'Characters') {
      return generate('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
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
      console.log('generate ', values);
      console.log(number)
      let aa = [...Array(number)]
        .map((_) => values[~~(Math.random() * values.length)])
        .join('');
        console.log(aa)
    return aa;
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
                <input required placeholder="Number" type="number" onChange={e => setNumber( e.target.value)}/>
              </label>
              <Dropdown
                options={options}
                onChange={(e) => setOption(e.value)}
                value={options[0]}
                placeholder="Select an option"
              />
              <button type="submit">Generate</button>
            </div>
            <div>
              <TextareaAutosize
                placeholder="The result appears here..."
                maxRows="30"
                minRows="10"
                value={result}
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
