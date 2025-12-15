import express from 'express';
import pg from 'pg';
import env from "dotenv";
import cors from "cors";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
env.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get('/', async(req, res) => {
  const result = await db.query("SELECT * FROM fighter_aircrafts ORDER BY first_service_year ASC");
  const rows = result.rows;

  const data = rows.map(result => ({
    id: result.id,
    name:  result.aircraft_name,
    country: result.country,
    role: result.primary_role,
    max_speed: result.max_speed,
    year: result.first_service_year,
    stealth: result.stealth,
    image: result.image_url,
  }));

  console.log(data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});