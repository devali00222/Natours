import express from 'express';
import Joi, { ObjectSchema } from '@hapi/joi';
type req = express.Request;
type res = express.Response;
type next = express.NextFunction;

class Validate {
  validateId(req: req, res: res, next: next) {
    if (req.params.id) {
      next();
    } else {
      const err = new Error('please enter Id');
      res.status(404).json({
        status: 'missing a prameter',
        Error: err,
      });
    }
  }
  validateShcema(Schema: ObjectSchema) {
    return async (req: req, res: res, next: next) => {
      try {
        await Schema.validateAsync(req.body);
        next();
      } catch (err) {
        console.log(err);
        res.status(404).json({
          status: 'missing a prameter',
          Error: err,
        });
      }
    };
  }
}

export default Validate;
