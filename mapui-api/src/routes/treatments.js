import { Router } from 'express';
import {BadRequestError} from "../utils";

const router = Router();

router.get('/treatments/doctor/:doctorId', async (req, res, next) => {
    const treatments = await req.context.models.Treatment.find({
        doctor: req.params.doctorId
    }).populate('doctor').catch(e => next(new BadRequestError(e)));

    return res.send(treatments);
});

router.post('/treatments/', async (req, res, next) => {
    const treatment = await req.context.models.Treatment.create({
        start: req.body.start,
        end: req.body.end,
        text: req.body.text,
        doctor: req.body.doctor
    }).catch(e => next(new BadRequestError(e)));

    if (treatment) {
        const patient = await req.context.models.Patient.findOne({_id: req.body.patientId})
            .catch(e => next(new BadRequestError(e)));

        if (patient) {
            patient.treatments.push(treatment._id);

            await patient.save().catch(e => next(new BadRequestError(e)));
        }
        await treatment.populate('doctor').execPopulate().catch(e => next(new BadRequestError(e)));
    }

    return res.send(treatment);
});

router.delete('/treatments/:treatmentId', async (req, res, next) => {
    const treatment = await req.context.models.Treatment.findOne({_id: req.params.treatmentId})
        .catch(e => next(new BadRequestError(e)));

    if (treatment) await treatment.remove().catch(e => next(new BadRequestError(e)));
    else  return res.status(404).json({error: new Error("Treatment not found.")});

    return res.send(treatment);
});

router.put('/treatments/:treatmentId', async (req, res, next) => {
    const treatment = await req.context.models.Treatment.findOne({_id: req.params.treatmentId})
        .catch(e => next(new BadRequestError(e)));

    if (treatment) {
        treatment.start = req.body.start || treatment.start;
        treatment.end = req.body.end || treatment.end;
        treatment.text = req.body.text || treatment.text;
        treatment.doctor = req.body.doctor || treatment.doctor;

        await treatment.save().catch(e => next(new BadRequestError(e)));
        await treatment.populate('doctor').execPopulate().catch(e => next(new BadRequestError(e)));;
    }
    else return res.status(404).json({error: new Error("Treatment not found.")});

    return res.send(treatment);
});

export default router;
