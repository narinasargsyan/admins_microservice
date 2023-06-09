import * as bcrypt from "bcrypt";
import { models } from "../../db";
import db from "../../db/models"
import { Response, Request } from "express";
import AuthService from "common_auth";
const authService = new AuthService(db.redis)

class AdminController {

  signUp = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await models.Admins.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.send("You have successfully registered as admin!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const isAdminExists = await models.Admins.findOne({ where: { email } });
      if (!isAdminExists) {
        res.status(400).send("Admin not exists");
        return;
      }
      const validPassword = bcrypt.compare(password, isAdminExists.password);
      if (!validPassword) {
        res.status(400).send("Credentials are invalid");
        return;
      }

      const auth = { email, id: String(isAdminExists.id), isAdmin: true };
      const accessToken = await authService.signAccessToken(auth);

      const result = {
        accessToken,
      };
      res.status(200).send(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };
}

export default AdminController;
