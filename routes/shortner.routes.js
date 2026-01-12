
import { Router } from "express";
import { postURLShortner,getShortnerPage, redirectToShortLink } from "../controllers/postURLShortner.js";
const router = Router();


router.get("/report",(req,res)=>{
    res.render("report");
})

router.get("/", getShortnerPage);

router.post("/",postURLShortner);


router.get("/:shortCode",redirectToShortLink);
//default export
// export default router;
// Named export
export const shortenedRoutes = router;
