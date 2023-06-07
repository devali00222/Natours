import Joi, { ObjectSchema } from '@hapi/joi';
import { ITour } from '../models/tourModel';
import { IUser } from '../models/userModel';
export const Schema = {
  Tour: {
    create: Joi.object<ITour>({
      name: Joi.string().required(),
      rating: Joi.number(),
      price: Joi.number(),
    }),
    update: Joi.object<ITour>({
      name: Joi.string(),
      rating: Joi.number(),
      price: Joi.number(),
    }),
  },
  User: {
    create: Joi.object<IUser>({
      email: Joi.string().required(),
      password: Joi.string().required(),
      fullName: Joi.string(),
    }),
    update: Joi.object<IUser>({
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    }),
  },
};
