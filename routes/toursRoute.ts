import express from 'express';
import TourController from '../controllers/tourController';
import { Schema } from '../lib/Schemas';
import Validate from '../middlewares/validate';
import { ITour } from '../models/tourModel';
const tourController = new TourController();
const validate = new Validate();
const router = express.Router();
router.use(express.json());
router
  .route('/')
  .get(tourController.getAllTours)
  .post(validate.validateShcema(Schema.Tour.create), tourController.publishTour)
  .put(tourController.unavilable)
  .delete(tourController.deleteAllTours);
router
  .route('/:id')
  .get(validate.validateId, tourController.getTour)
  .post(tourController.unavilable)
  .put(
    validate.validateId,
    validate.validateShcema(Schema.Tour.update),
    tourController.updateTour
  )
  .delete(validate.validateId, tourController.deleteTour);

export default router;
