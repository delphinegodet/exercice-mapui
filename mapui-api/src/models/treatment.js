import mongoose from 'mongoose';

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
    return await this.findOne({id});
}

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;
