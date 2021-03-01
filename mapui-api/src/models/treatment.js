import mongoose from 'mongoose';
import {BadRequestError} from "../utils";

const treatmentSchema = new mongoose.Schema(
    {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    },
);

treatmentSchema.statics.findById = async function (id) {
    return await this.findOne({_id: id});
}

treatmentSchema.pre('remove', async function(next) {
    this.model("Patient").updateMany({treatments: this._id}, { $pull: { treatments: this._id } }, next).catch(e => next(new BadRequestError(e)));

    next();
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;
