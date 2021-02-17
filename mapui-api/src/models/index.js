import mongoose from 'mongoose';

import Patient from './patient';
import Doctor from './doctor';
import Drug from './drug';
import Treatment from "./treatment";

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

const models = { Patient, Doctor, Drug, Treatment };

export { connectDb };

export default models;
