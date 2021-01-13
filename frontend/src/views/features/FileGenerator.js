import React, { useState } from 'react';
import { useGlobalContext } from '../../context/context';
import { CATEGORY } from '../components/common/constant';
import Header from '../components/common/Header';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { TestFileGenerator } from 'test-file-generator';

export default function FileGenerator() {
  var {
    fileSize,
    isCopied,
    handleState,
    deleteTexts,
    handleCopy,
    getFeature,
  } = useGlobalContext();
  const feature = getFeature(CATEGORY.FILE_GENERATOR);
  const optionsValues = ['TXT', 'DOC'];
  const optionsUnitValues = ['Bytes', 'KBytes', 'MBytes'];
  const [option, setOption] = useState(optionsValues[0]);
  const [optionUnit, setOptionUnit] = useState(optionsUnitValues[0]);

  const handleSubmit = () => {
    let generator = new TestFileGenerator('txt');
    generator.generateFile();
    // generator.setLocation('src/output/');
    generator.setSize(3000);
    generator.setName('my_file_name');
    generator.generateFile();
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
          <button onClick={handleSubmit} className="btn btn-primary">download</button>
          <form onSubmit={handleSubmit} className="form-bg">
            <div className="file-gen-center-items center">
              <div className="d-flex justify-content-around">
                <input type="text" className="input" placeholder="File name" />
                <DropdownButton id="dropdown-basic-button" title={option}>
                  {optionsValues.map((option) => (
                    <Dropdown.Item onClick={() => setOption(option)}>
                      {option}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <button type="submit" className="btn btn-primary">
                  Generate
                </button>
              </div>
              <div className="d-flex justify-content-center my-3">
                The total file size is {fileSize} B.
              </div>
              <div
                className=" file-gen-center-items center"
                style={{ width: '60%' }}
              >
                <div className="row">
                  <div className="col-6 font-weight-bold text-center">Size</div>
                  <div className="col-6 font-weight-bold text-center">Unit</div>
                </div>
                <div className="row">
                  <div className="col-6 d-flex justify-content-center">
                    <input
                      type="text"
                      className="input "
                      style={{ width: 110 }}
                      placeholder="Size"
                    />
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={optionUnit}
                    >
                      {optionsUnitValues.map((option) => (
                        <Dropdown.Item onClick={() => setOptionUnit(option)}>
                          {option}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="my-5">
            <p className="s-description">{feature.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
