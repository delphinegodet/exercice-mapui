import { Router } from 'express';
import {BadRequestError, NotFoundError} from "../utils";

const router = Router();

router.get('/patients',  async (req, res, next) => {
    const patients = await req.context.models.Patient.find()
        .catch(e => next(new BadRequestError(e)));

    return res.send(patients);
});

router.get('/patients/:patientId', async (req, res, next) => {
    const patient = await req.context.models.Patient.findById(req.params.patientId)
        .catch(e => next(new BadRequestError(e)));

    return res.send(patient);
});

router.post('/patients', async (req, res, next) => {
    const patient = await req.context.models.Patient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        sex: req.body.sex,
        drugs: req.body.drugs,
        treatments: req.body.treatments
    }).catch(e => next(new BadRequestError(e)));

    return res.send(patient);
});

router.delete('/patients/:patientId', async (req, res, next) => {
    const patient = await req.context.models.Patient.findOne({_id: req.params.patientId})
        .catch(e => next(new BadRequestError(e)));

    if (patient) await patient.remove().catch(e => next(new BadRequestError(e)));
    else return next(new NotFoundError("Patient not found."));

    return res.send();
});

router.put('/patients/:patientId', async (req, res, next) => {
    const patient = await req.context.models.Patient.findOne({_id: req.params.patientId})
        .catch(e => next(new BadRequestError(e)));

    if (patient) {
        patient.firstName = req.body.firstName || patient.firstName;
        patient.lastName = req.body.lastName || patient.lastName;
        patient.age = req.body.age || patient.age;
        patient.sex = req.body.sex || patient.sex;
        patient.drugs = req.body.drugs;
        patient.treatments = req.body.treatments;

        await patient.save().catch(e => next(new BadRequestError(e)));
        await patient.populate('treatments').populate('drugs').execPopulate();
    }
    else return res.status(404).json({error: new Error("Patient not found.")});

    return res.send(patient);
});

export default router;
