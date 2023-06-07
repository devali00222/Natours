import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';
import Validate from '../middlewares/validate';
import { Schema } from '../lib/Schemas';
import express from 'express';
const router = express.Router();
const userController = new UserController();
const validate = new Validate();
const auth = new Auth();
// login route
router
  .route('/login')
  .post(
    validate.validateShcema(Schema.User.create),
    auth.logIn,
    userController.login
  );
// register route
router
  .route('/signup')
  .post(
    validate.validateShcema(Schema.User.create),
    auth.signUp,
    userController.register
  );
// user route
router
  .route('/')
  .get(auth.isLogedin, userController.getAllUsers)
  .post(userController.unavilable)
  .put(userController.unavilable)
  .delete(auth.isLogedin, userController.deleteAllUsers);
// router.put('/setadmin', auth.isLogedin, userController.setAdmin);
router
  .route('/:id')
  .get(validate.validateId, userController.getUser)
  .post(userController.unavilable)
  .put(
    validate.validateId,
    validate.validateShcema(Schema.User.update),
    auth.isLogedin,

    userController.updateUser
  )
  .delete(validate.validateId, auth.isLogedin, userController.deleteUser);

export default router;
