import express from "express";
import * as aircraftControllers from "../controllers/aircraftControllers.js";
import { upload } from "../middlewares/upload.js";


const router = express.Router();

router.get('/aircrafts', aircraftControllers.getAircrafts);
router.post('/aircrafts', upload.single('image'), aircraftControllers.createAircraft);

export default router;

