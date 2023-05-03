import * as bcrypt from "bcrypt";
import { models } from "../../db";
import { Response, Request } from "express";
import axios from 'axios';
import authService from "../services/auth.service";

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

      const auth = { email, id: String(isAdminExists.id) };
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

  updateArticle = async (req: Request & { payload: { id: number } }, res: Response) => {
    try{
      const { id } = req.payload;
      const { text, articleId } = req.body;
      const response = await axios({
        baseURL: 'http://localhost:3020/articles/api/admin/update',
        method: 'PUT',
        headers: {
          X_AUTH: process.env.X_AUTH,
          'Content-Type': 'application/json',
        },
        data: {
          editorId:id,
          text,
          articleId,
        },
      });
      res.send({ response: response.data });
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };


  getArticleList = async (req: Request,res: Response) => {
    try{
      const { id, userId, text } = req.body;
      const response = await axios({
        baseURL: 'http://localhost:3020/articles/api/admin/list',
        method: 'GET',
        headers: {
          X_AUTH: process.env.X_AUTH,
          'Content-Type': 'application/json',
        },
        data: {
          id,userId,text
        }
      });
      res.send({ response: response.data });
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  deleteArticle = async (req: Request & { payload: { id: number } }, res: Response) => {
    try{
      const { id } = req.payload;
      const { articleId } = req.body;
      const response = await axios({
        baseURL: 'http://localhost:3020/articles/api/admin/delete',
        method: 'DELETE',
        headers: {
          X_AUTH: process.env.X_AUTH,
          'Content-Type': 'application/json',
        },
        data: {
          editorId: id,
          articleId,
        },
      });
      res.send({ response: response.data });
    } catch (err) {
      console.log("err", err);
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };
}

export default AdminController;
