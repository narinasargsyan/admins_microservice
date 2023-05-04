import { Response, Request } from "express";
import axios from 'axios';

class ArticleController {
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

export default ArticleController;
