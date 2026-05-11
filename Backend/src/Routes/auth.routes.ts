import { Router } from "express";
import { register , login , logout } from "../Controller/auth.controller.js";

const router = Router();

router.post("/v1/register", register);
router.post("/v1/login", login );
router.post("/v1/logout", logout);

export default router;

