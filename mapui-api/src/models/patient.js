import mongoose from 'mongoose';
import {BadRequestError} from "../utils";

const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            type: Number,
            required: true,
        },
        drugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }],
        treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' }],
    },
);

patientSchema.statics.findById = async function (id) {
    return await this.findOne({_id: id}).populate('drugs').populate({
        path : 'treatments',
        populate : {
            path : 'doctor'
        }
    });
}

patientSchema.pre('remove', function(next) {
    if (this.treatments.length > 0) this.model("Treatment").deleteMany({ "_id": { "$in": this.treatments } }, next).catch(e => next(new BadRequestError(e)));
    next();
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
