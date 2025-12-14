import express from 'express';
import pg from 'pg';
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
env.config();

app.use(express.static("public"));
app.use(cors());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get('/', async(req, res) => {
  const result = await db.query("SELECT * FROM fighter_aircrafts");

  const data = {
    name:  result.rows[0].aircraft_name,
    country: result.rows[0].country,
    role: result.rows[0].primary_role,
    max_speed: result.rows[0].max_speed,
    year: result.rows[0].first_service_year,
    stealth: result.rows[0].stealth
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});