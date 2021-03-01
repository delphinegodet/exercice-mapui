import { Router } from 'express';
import {BadRequestError, NotFoundError} from "../utils";

const router = Router();

router.get('/drugs',  async (req, res, next) => {
    const drugs = await req.context.models.Drug.find()
        .catch(e => next(new BadRequestError(e)));

    return res.send(drugs);
});

router.post('/drugs', async (req, res, next) => {
    const drug = await req.context.models.Drug.create({
        name: req.body.name,
        code: req.body.code
    }).catch(e => next(new BadRequestError(e)));

    return res.send(drug);
});

router.delete('/drugs/:drugId', async (req, res, next) => {
    const drug = await req.context.models.Drug.findById(req.params.drugId)
        .catch(e => next(new BadRequestError(e)));

    if (drug) await drug.remove().catch(e => next(new BadRequestError(e)));
    else return next(new NotFoundError("dRUG not found."));

    return res.send(drug);
});

export default router;
