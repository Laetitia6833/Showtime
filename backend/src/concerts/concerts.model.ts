import * as mongoose from 'mongoose';

export const ConcertSchema = new mongoose.Schema({
  nameGroup: { type: String },
  eventName: { type: String },
  eventLoc: { type: String },
  eventDate: { type: String },
  type: { type: String },
  price: { type: Number },
  imagepath: { type: String },
  nbticket: { type: Number },
});
export interface Concert extends mongoose.Document {
  id: string;
  nameGroup: string;
  eventName: string;
  eventLoc: string;
  eventDate: string;
  type: string;
  price: number;
  imagepath: string;
  nbticket: number;
}
