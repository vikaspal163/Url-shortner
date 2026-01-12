import {Router} from "express";

const router = Router();

router.get("/register",authControllers.getRegisterPage);
router.get("/login",authControllers.getLoginPage);

export const authRoute = (req,res)=>{

}