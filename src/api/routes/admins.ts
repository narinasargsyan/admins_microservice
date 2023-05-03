import * as express from "express";
const adminsRouter = express.Router();
import AdminController from "../controller/admins.controller";
import validate from "../middleweares/validation/validate";
import auth from "../middleweares/authentication.middlewear";

const admin = new AdminController();

const { authenticate } = auth;

adminsRouter.post("/sign-up", validate("signUpAdminsSchema"), admin.signUp);
adminsRouter.post("/sign-in", validate("signInAdminsSchema"), admin.signIn);

adminsRouter.use(authenticate);

adminsRouter.get("/", admin.getArticleList);
adminsRouter.put("/update", admin.updateArticle);
adminsRouter.delete("/delete", admin.deleteArticle);

export { adminsRouter };
