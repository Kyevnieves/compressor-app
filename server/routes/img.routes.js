import { Router } from "express";
import {
  convertWebp50,
  convertWebpResize50
} from "../controllers/img.controllers.js";
const router = Router();

router.get('/webpResize50', (req, res)=>{
	res.sendfile(dirServerViews + 'webpResize50.html')
})

router.post("/convertwebp50", convertWebp50);

router.post("/webpResize50", convertWebpResize50);



export default router;
