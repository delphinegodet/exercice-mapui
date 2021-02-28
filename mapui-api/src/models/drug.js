import mongoose from 'mongoose';
import {BadRequestError} from "../utils";

const drugSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        }
    },
);

drugSchema.statics.findById = async function (id) {
    return await this.findOne({_id: id});
}

drugSchema.pre('remove', async function(next) {
    this.model("Patient").update({drugs: this._id}, { $pull: { drugs: this._id } }, next).catch(e => next(new BadRequestError(e)));

    next();
});

const Drug = mongoose.model('Drug', drugSchema, "drugs");

export default Drug;
