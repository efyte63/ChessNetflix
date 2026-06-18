import  {Router} from "express";
import { getbyplayers, getcontent , topten , searchcontent ,findbycatogary } from "../Controller/netflix.controller.js";
import { middleware } from "../Middleware/middleware.js";
const routes = Router();
routes.get("/getplayers" , getbyplayers);
routes.get("/getcontent/:id" , getcontent);
routes.get("/searchcontent" , searchcontent);
routes.get("/topten" , topten);
routes.get("/findbycatogary",findbycatogary);
export default routes;

