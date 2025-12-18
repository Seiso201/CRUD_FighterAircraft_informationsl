import express from "express";

import * as aircraftControllers from "../controllers/aircraftControllers.js";

const router = express.Router();

router.get('/aircrafts', aircraftControllers.getAircrafts);

export default router;

