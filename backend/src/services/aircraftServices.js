import { query } from "../db.js";

export const getAircrafts = async () => {
    const { rows } = await query("SELECT * FROM fighter_aircrafts ORDER BY first_service_year ASC");
    return rows;
} 

export const createAircraft = async (aircraftData) => {
    const data = {
        name: aircraftData.name,
        country: aircraftData.country,
        role: aircraftData.role,
        max_speed: parseFloat(aircraftData.max_speed),
        year: parseInt(aircraftData.year),
        stealth: aircraftData.stealth,
        image: "/uploads/" + aircraftData.file.filename,
    };
    console.log("data" + data);

    const { rows } = await query("INSERT INTO fighter_aircrafts (aircraft_name, country, primary_role, max_speed, first_service_year, stealth, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [data.name, data.country, data.role, data.max_speed, data.year, data.stealth, data.image]);
    return rows[0];
}