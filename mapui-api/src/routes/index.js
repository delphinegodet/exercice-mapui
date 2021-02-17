import patients from './patients';
import doctors from './doctors';
import treatments from './treatments';
import drugs from "./drugs";

import {Router} from "express";
const router = Router();

router.get('/',  (req, res) => {
    return res.send("mdr");
});

router.get('/patient-list',  (req, res) => {
    return res.send("mdr");
});

export default {
    patients,
    doctors,
    treatments,
    drugs,
    router
};
