// import express from 'express';
// import cors from "cors";
// import multer from "multer";
// import path, { parse } from 'path';
// import { fileURLToPath } from 'url';
// import { query } from './db.js';

// const app = express();
// const port = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static("public"));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// // กำหนดที่เก็บไฟล์ (Storage Engine)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../public/uploads'));
//   },
//   filename: (req, file, cb) => {
//     // กำหนดชื่อไฟล์ให้ไม่ซ้ำกัน เช่น ใช้ timestamp
//     cb(null, Date.now() + '-' + file.originalname); 
//   }
// });

// // 2. สร้าง Multer Instance
// const upload = multer({ storage: storage });

// app.get('/', async(req, res) => {
//   const result = await query("SELECT * FROM fighter_aircrafts ORDER BY first_service_year ASC");
//   const rows = result.rows;

//   const data = rows.map(result => ({
//     id: result.id,
//     name:  result.aircraft_name,
//     country: result.country,
//     role: result.primary_role,
//     max_speed: result.max_speed,
//     year: result.first_service_year,
//     stealth: result.stealth,
//     image: result.image_url,
//   }));

//   console.log(data);
//   res.json(data);
// });

// // image เป็นชื่อตาม frontend
// app.post('/create', upload.single('image'), async(req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // console.log('File uploaded:', req.file.filename);
//   // console.log('Body data:', req.body.name);

//   const data = {
//     name: req.body.name,
//     country: req.body.country,
//     role: req.body.role,
//     max_speed: parseFloat(req.body.max_speed),
//     year: parseInt(req.body.year),
//     stealth: req.body.stealth,
//     image: "/uploads/" + req.file.filename,
//   };

//   console.log("data" + data)

//   try {
//     await query("INSERT INTO fighter_aircrafts (aircraft_name, country, primary_role, max_speed, first_service_year, stealth, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)", [data.name, data.country, data.role, data.max_speed, data.year, data.stealth, data.image]);
//     res.status(201).json({ message: 'Created' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// })

// app.put("/edit/:id", upload.single('image'), async(req, res) => {
//   const id = req.params.id;

//   const data = {
//     name: req.body.name,
//     country: req.body.country,
//     role: req.body.role,
//     max_speed: parseFloat(req.body.max_speed),
//     year: parseInt(req.body.year),
//     stealth: req.body.stealth,
//     image: req.file ? `/uploads/${req.file.filename}` : req.body.current_image || null
//   };

//   try {
//     await query(`UPDATE fighter_aircrafts SET aircraft_name = $1, country = $2, primary_role = $3, max_speed = $4, first_service_year = $5, stealth = $6, image_url = $7 WHERE id = $8`, [data.name, data.country, data.role, data.max_speed, data.year, data.stealth, data.image, id]);
//     res.status(200).json({ message: 'Updated' });
//     } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// })

// app.delete("/delete/:id", async(req, res) => {
//   const id = req.params.id;

//   try {
//     await query(`DELETE FROM fighter_aircrafts WHERE id = $1`, [id]);
//     res.status(200).json({ message: 'Deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

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
