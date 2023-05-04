import * as express from "express";
const articlesRouter = express.Router();
import ArticleController from "../controller/article.controller";
import auth from "../middleweares/authentication.middlewear";

const article = new ArticleController();

const { authenticate } = auth;

articlesRouter.use(authenticate);

articlesRouter.get("/", article.getArticleList);
articlesRouter.put("/update", article.updateArticle);
articlesRouter.delete("/delete", article.deleteArticle);

export { articlesRouter };
