import express from 'express'
import testcaseController from '../controllers/testcase.controller'

const router = express.Router();

router.get('/', testcaseController.getTestcases);
router.get('/:id', testcaseController.getTestcase);
router.put('/edit/:id', testcaseController.updateTestcase);
router.post('/delete/:id', testcaseController.deleteTestcase);

export default router