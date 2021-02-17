import mongoose from 'mongoose';

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
    return await this.findOne({id});
}

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
