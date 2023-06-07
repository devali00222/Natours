import { Schema, model, Document } from 'mongoose';

export interface ITour {
  name: String;
  rating: number;
  price: number;
}
export interface ITourModel extends ITour, Document {}
const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Tour = model<ITourModel>('Tour', tourSchema);
export default Tour;
