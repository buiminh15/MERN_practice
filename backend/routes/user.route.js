
import express from 'express';
import auth from '../middlewares/auth';
// import validate from'../../middlewares/validate';
// import userValidation from'../validations/user.validation';
// import userController from'../controllers/user.controller';

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), (req, res) => {
    console.log('aaa')
  })
  // .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

  export default router