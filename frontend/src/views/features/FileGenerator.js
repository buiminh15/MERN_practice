import React from 'react'
import { TestFileGenerator } from 'test-file-generator';

export default function FileGenerator() {
    const generateFile = () => {
        let generator = new TestFileGenerator('txt');
        generator.setLocation('output/');
        generator.setSize(10);
        generator.setName('my_file_name');
        generator.generateFile();
    }
    return (
        <div>
            FileGenerator
            <button onClick={()=>generateFile()}>Download</button>
        </div>
    )
}
