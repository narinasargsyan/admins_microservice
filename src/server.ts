import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { adminsRouter } from "./api/routes/admins";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/admins", adminsRouter);

app.listen(process.env.APP_PORT);
