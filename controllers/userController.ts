import { Request, Response, NextFunction } from 'express';
import Auth from '../middlewares/auth';
import { catchAsync } from '../middlewares/handlingErrors';
import User from '../models/userModel';
const auth = new Auth();
class UserController {
  // login method
  login = catchAsync(async (req: Request, res: Response) => {
    const token = auth.getToken(req.body.email);
    const user = await User.find({email:req.body.email})
    res.status(200).json({
      token,
      user
    });
  });
  // register methode
  register = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
    });
  });
  // user normal methodes
  // get oprations
  getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      result: user,
    });
  });
  getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find({});
    res.status(200).json({
      status: 'success',
      result: users,
      count: users.length,
    });
  };
  // update user
  updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({
      status: 'updated',
      result: user,
    });
  });
  // delete oprations
  deleteUser = catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.body.id);
    res.status(201).json({
      status: 'deleted',
      result: user,
    });
  });
  deleteAllUsers = catchAsync(async (req: Request, res: Response) => {
    await User.deleteMany({});
    res.status(201).json({
      status: 'deleted',
      result: 'users data deleted',
    });
  });
  // setAdmin = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     let user = await User.findById(req.user?._id);
  //     user?.admin
  //       ? await User.updateOne(
  //           { _id: user?._id },
  //           { $set: { admin: false } },
  //           { new: true }
  //         )
  //       : await User.updateOne(
  //           { _id: user?._id },
  //           { $set: { admin: true } },
  //           { new: true }
  //         );

  //     res.status(201).json({
  //       status: 'updated',
  //       result: {
  //         user,
  //         update: {
  //           admin: !user?.admin,
  //         },
  //       },
  //     });
  //   }
  // );
  // unavilable opration
  unavilable(req: Request, res: Response) {
    res.status(401).json({
      status: `${req.method} unavilable on this route`,
    });
  }
}

export default UserController;
