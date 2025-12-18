import express from "express";
import cors from "cors";
import aircraftRoutes from "./routes/aircraftRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api', aircraftRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});