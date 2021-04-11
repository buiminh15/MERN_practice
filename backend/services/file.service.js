import fs from 'fs';
import XlsxPopulate from 'xlsx-populate';
import request from 'request-promise';
import path from 'path';
import { MAX_LINE_IN_SHEET } from '../utils/constants';
import {
    createEmptyFileOfSize,
    cloneFileTemplateExcel,
    convertJsonToCsvTestCase,
    sendFileToClient,
    cloneFileCsv,
    setResultToSheet,
    setValueToSheet,
    splitArray,
    translateSheet
} from '../utils/functions';
import Testcase from '../models/testcase.model';
import WebTestcase from '../models/webtest.model';
import { MIME_TYPE, DESTINATION_PATH } from '../utils/constants';
import httpStatus from 'http-status';

const filePath = path.join(__dirname, '..', 'templates', 'test.xlsx')
const fileTransPath = path.join(__dirname, '..', 'templates', 'dich.xlsx')
// const fileCsvPath = path.join(__dirname, '..', 'upload', 'test.csv')

const rangeTrans = { s: { c: 1, r: 1 }, e: { c: 75, r: 100 } }

const getFileCsvPath = (file_name) => {
    return path.join(__dirname, '..', 'upload', `${file_name}`)
}

const genTextFile = async (res, file_name, size) => {
    await createEmptyFileOfSize(file_name, size);
    sendFileToClient(res, file_name, MIME_TYPE.TXT);
}

const genExcelFile = async (res, file_name) => {
    const filePath = path.join(__dirname, '..', `upload`, file_name);
    if (!fs.existsSync(DESTINATION_PATH)) {
        makeDir(DESTINATION_PATH)
    }
    try {
        await Testcase.find({}, (err, datas) => {
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else if (!datas) {
                res.json({ success: false, message: 'No datas found.' }); // Return error of no blogs found
            }
            convertJsonToCsvTestCase(datas, file_name, ['test_case'])
            if (fs.existsSync(filePath)) {
                //file exists
                cloneFileCsv(file_name, path.join(DESTINATION_PATH, file_name))
            }
            res.json({ success: true })
        });
    } catch (error) {
        console.error(error)
    }
}

const genExcelTestcaseFile = async (req, res) => {
    const { field_name, ids } = req.body
    let range;
    let rangeResult;
    if (ids.length < MAX_LINE_IN_SHEET) {
        range = { s: { c: 3, r: 8 }, e: { c: 3, r: 8 + ids.length - 1} }
        rangeResult = { s: { c: 3, r: 27 }, e: { c: 3, r: 27 + ids.length - 1} }
    } else {
        range = { s: { c: 3, r: 8 }, e: { c: 3, r: 8 + MAX_LINE_IN_SHEET - 1 } }
        rangeResult = { s: { c: 3, r: 27 }, e: { c: 3, r: 27 + MAX_LINE_IN_SHEET - 1 } }
    }
    // range = { s: { c: 3, r: 8 }, e: { c: 3, r: 8 + MAX_LINE_IN_SHEET - 1 } }
    // rangeResult = { s: { c: 3, r: 27 }, e: { c: 3, r: 27 + MAX_LINE_IN_SHEET - 1 } }
    let dataArray;
    let arrayOfArrays;
    let file_name = 'minhbb_test.csv';
    try {
        const testcases = await WebTestcase.find({ name: field_name })
        const filteredArray = testcases[0].testcases.filter(testcase => ids.includes(testcase._id.toString()));

        await convertJsonToCsvTestCase(filteredArray, file_name, ['testcase'])
        const data = fs.readFileSync(getFileCsvPath(file_name), 'utf8')
        dataArray = data.replace(/"$/gm, '",');
        dataArray = dataArray.split(/,$/gm)
        arrayOfArrays = splitArray(dataArray, MAX_LINE_IN_SHEET)

        const workbook = await XlsxPopulate.fromFileAsync(filePath)
        for (let index = 0; index < arrayOfArrays.length; index++) {
            let sheet = workbook.sheet(index)
            workbook.cloneSheet(sheet, `M${index + 2}`)
            setValueToSheet(sheet, range, arrayOfArrays[index])
            setResultToSheet(sheet, rangeResult)
        }
        await workbook.toFileAsync("./out.xlsx")
        res.json({ message: 'done' })

    } catch (error) {
        console.log(error);
    }
}

const generateExcelTranslatorFile = async (req, res) => {
    const { translate_from, translate_to } = req.body;
    const workbook = await XlsxPopulate.fromFileAsync(fileTransPath)
    const sheets = workbook.sheets();
    for (let i = 0; i < sheets.length; i++) {
        await translateSheet(translate_from, translate_to, workbook.sheet(i), rangeTrans)
    }
    await workbook.toFileAsync("./out.xlsx")
    res.status(httpStatus.OK).json({ message: 'Done' })
}

export { genTextFile, genExcelFile, genExcelTestcaseFile, generateExcelTranslatorFile }