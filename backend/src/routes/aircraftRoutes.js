import express from "express";
import * as aircraftControllers from "../controllers/aircraftControllers.js";
import { upload } from "../middlewares/upload.js";


const router = express.Router();

router.get('/aircrafts', aircraftControllers.getAircrafts);
router.post('/aircrafts', upload.single('image'), aircraftControllers.createAircraft);
router.put('/aircrafts/:id', upload.single('image'), aircraftControllers.updateAircraft);
router.delete('/aircrafts/:id', aircraftControllers.deleteAircraft);

export default router;

