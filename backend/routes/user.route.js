
import express from'express';
import auth from'../../middlewares/auth';
import validate from'../../middlewares/validate';
import userValidation from'../../validations/user.validation';
import userController from'../../controllers/user.controller';