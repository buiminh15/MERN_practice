import express from 'express'
import testcaseController from '../controllers/testcase.controller'
import WebTestcase from '../models/web_testcase.model';

const router = express.Router();

router.get('/', testcaseController.getTestcases);
router.get('/:id', testcaseController.getTestcase);
router.put('/:id', testcaseController.updateTestcase);
router.delete('/:id', testcaseController.deleteTestcase);


export default router