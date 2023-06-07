import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, VerifyCallback } from 'jsonwebtoken';
import { catchAsync } from './handlingErrors';
import User, { IUser } from '../models/userModel';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

class Auth {
  signUp = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
      });
      next();
    }
  );
  logIn = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findOne({ email: req.body.email });
      const isValidated = bcrypt.compareSync(
        req.body.password,
        user?.password!
      );
      const err = new Error("username or password isn't valid");
      if (!isValidated) return next(err);
      next();
    }
  );
  getToken = (email: string) => {
    const token = jwt.sign(
      { email: email },
      process.env.SECRET || '12345-67890-09876-54321',
      { expiresIn: '2d' }
    );
    return token;
  };
  // auth if the user logedIn
  isLogedin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let token;
      // check if the token is given
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      //check if the token is valid
      if (!token) return next(new Error("you aren't logged in"));
      // if the user still exist
      const decode: any = jwt.verify(
        token,
        process.env.SECRET || '12345-67890-09876-54321'
      );
      const freshUser = await User.findOne({ email: decode.email });
      if (!freshUser) return next(new Error("this user dosn't exist"));

      next();
    }
  );

  // if the user is admin
  isModrator = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      const decode: any = jwt.verify(
        token!,
        process.env.SECRET || '12345-67890-09876-54321'
      );
      const user = await User.findOne({ email: decode.email });
      if (user?.role !== 'modrator')
        return next(
          new Error("you didn't have the premission for this opration")
        );
      next();
    }
  );
  // if the user is the super admin
  isAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      const decode: any = jwt.verify(
        token!,
        process.env.SECRET || '12345-67890-09876-54321'
      );
      const user = await User.findOne({ email: decode.email });
      if (user?.role !== 'admin')
        return next(
          new Error("you didn't have the premission for this opration")
        );
      next();
    }
  );
}
export default Auth;
