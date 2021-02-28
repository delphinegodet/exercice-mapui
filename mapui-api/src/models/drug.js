import mongoose from 'mongoose';

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
const Drug = mongoose.model('Drug', drugSchema);

export default Drug;
