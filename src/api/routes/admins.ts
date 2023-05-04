import * as express from "express";
const adminsRouter = express.Router();
import AdminController from "../controller/admins.controller";
import validate from "../middleweares/validation/validate";

const admin = new AdminController();

adminsRouter.post("/sign-up", validate("signUpAdminsSchema"), admin.signUp);
adminsRouter.post("/sign-in", validate("signInAdminsSchema"), admin.signIn);

export { adminsRouter };
