import mongoose from 'mongoose';

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
        drugs: { type: mongoose.Schema.Types.Array, ref: 'Drug' },
        treatments: { type: mongoose.Schema.Types.Array, ref: 'Treatment' },
    },
);

patientSchema.statics.findById = async function (id) {
    return await this.findOne({id});
}

/*patientSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
});*/

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
