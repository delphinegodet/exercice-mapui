import 'dotenv/config'; //tjr première ligne d'import
import cors from 'cors';
import express from 'express';
import routes from './routes';
import { v4 as uuidv4 } from 'uuid';
import models, { connectDb } from './models';

const id = uuidv4();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
    };
    next();
});

app.use(routes.patients);
app.use(routes.doctors);
app.use(routes.treatments);
app.use(routes.drugs);

app.use((error, req, res, next) => {
    return res.status(error.statusCode).json({ error: error.toString() });
});

connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`)
    );
}, (err) => console.log(err));
