import express from 'express';
import filesController from '../controllers/files.controller'

const router = express.Router();
router.post('/txt', filesController.generateTextFile);
router.post('/excel', filesController.generateExcelFile );
router.post('/excel_testcase', filesController.generateTestcaseFile);

export default router;
