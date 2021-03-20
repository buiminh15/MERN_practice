import path from 'path';
import fs from 'fs';
import { createEmptyFileOfSize, makeDir, cloneFileTemplateExcel, convertJsonToCsvTestCase, sendFileToClient, cloneFileCsv } from '../helper/functions';
import Testcase from '../models/Testcase.model';
import { MIME_TYPE, DESTINATION_PATH } from '../helper/constants';

const filesController = {
    generateTextFile: (req, res, next) => {
        const { file_name, size } = req.body
        createEmptyFileOfSize(file_name, size);
        sendFileToClient(res, file_name, MIME_TYPE.TXT);
    },
    generateExcelFile: async (req, res, next) => {
        const { file_name } = req.body
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
                convertJsonToCsvTestCase(datas, file_name)
                if (fs.existsSync(filePath)) {
                    //file exists
                    cloneFileCsv(file_name, path.join(DESTINATION_PATH, file_name))
                }
                res.json({ success: true })
            });
        } catch (error) {
            console.error(error)
        }
    },
}

export default filesController