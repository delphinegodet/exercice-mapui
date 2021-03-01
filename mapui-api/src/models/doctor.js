import mongoose from 'mongoose';
import {BadRequestError} from "../utils";

const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        speciality: {
            type: String,
            required: true,
        },
    },
);

doctorSchema.statics.findById = async function (id) {
    return await this.findOne({_id: id});
}

doctorSchema.pre('remove', async function(next) {
    this.model("Treatment").update({doctor: this._id}, { $unset: { doctor: "" } }, next).catch(e => next(new BadRequestError(e)));

    next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
