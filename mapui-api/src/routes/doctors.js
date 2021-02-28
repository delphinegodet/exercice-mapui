import { Router } from 'express';
import {BadRequestError} from "../utils";

const router = Router();

router.get('/doctors', async (req, res, next) => {
    const doctors = await req.context.models.Doctor.find()
        .catch(e => next(new BadRequestError(e)));

    return res.send(doctors);
});

router.post('/doctors', async (req, res, next) => {
    const doctor = await req.context.models.Doctor.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        speciality: req.body.speciality
    }).catch(e => next(new BadRequestError(e)));

    return res.send(doctor);
});

router.delete('/doctors/:doctorId', async(req, res, next) => {
    const doctor = await req.context.models.Doctor.findOne({_id: req.params.doctorId})
        .catch(e => next(new BadRequestError(e)));

    if (doctor) await doctor.remove().catch(e => next(new BadRequestError(e)));
    else return res.status(404).json({error: new Error("Doctor not found.")});

    return res.send(doctor);
});


router.put('/doctors/:doctorId', async (req, res, next) => {
    const doctor = await req.context.models.Doctor.findOne({_id: req.params.doctorId})
        .catch(e => next(new BadRequestError(e)));

    if (doctor) {
        doctor.firstName = req.body.firstName || doctor.firstName;
        doctor.lastName = req.body.lastName || doctor.lastName;
        doctor.speciality = req.body.speciality || doctor.speciality;

        await doctor.save().catch(e => next(new BadRequestError(e)));
    }
    else return res.status(404).json({error: new Error("Patient not found.")});

    return res.send(doctor);
});

export default router;
