import express from 'express';
import filesController from '../controllers/index'

const router = express.Router();
router.post('/txt', filesController.generateTextFile);

router.post('/excel', filesController.generateExcelFile );

export default router;
