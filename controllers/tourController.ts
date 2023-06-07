import Tour from '../models/tourModel';
import express from 'express';
type req = express.Request;
type res = express.Response;
class TourController {
  async getAllTours(req: req, res: res) {
    try {
      const tours = await Tour.find({});
      res.status(200).json({
        status: 'success',
        data: tours,
        result: tours.length,
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  async getTour(req: req, res: res) {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: tour,
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  async publishTour(req: req, res: res) {
    try {
      const tour = await Tour.create(req.body);
      res.status(200).json({
        status: 'success',
        data: tour,
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  async updateTour(req: req, res: res) {
    try {
      const tour = await Tour.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(201).json({
        status: 'success',
        data: tour,
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  async deleteAllTours(req: req, res: res) {
    try {
      await Tour.deleteMany({});
      res.status(201).json({
        status: 'success',
        result: 'all tours deleted',
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  async deleteTour(req: req, res: res) {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(201).json({
        status: 'success',
        result: 'deleted',
      });
    } catch (err) {
      res.status(404).json({
        status: 'faild',
        result: err,
      });
    }
  }
  unavilable(req: req, res: res) {
    res.status(400).send(`${req.method} is unavilable`);
  }
}
export default TourController;
