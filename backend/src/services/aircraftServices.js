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

export const updateAircraft = async (aircraftId, aircraftData) => {
    const data = {
        name: aircraftData.name,
        country: aircraftData.country,
        role: aircraftData.role,
        max_speed: parseFloat(aircraftData.max_speed),
        year: parseInt(aircraftData.year),
        stealth: aircraftData.stealth,
        image: aircraftData.file ? `/uploads/${aircraftData.file.filename}` : aircraftData.current_image || null
    };
    console.log("data" + data);

    const { rowCount } = await query(`UPDATE fighter_aircrafts SET aircraft_name = $1, country = $2, primary_role = $3, max_speed = $4, first_service_year = $5, stealth = $6, image_url = $7 WHERE id = $8`, [data.name, data.country, data.role, data.max_speed, data.year, data.stealth, data.image, aircraftId]);
    return rowCount > 0; // Returns true if a row was deleted, false otherwise
};

export const deleteAircraft = async (aircraftId) => {
    const { rows } = await query(`DELETE FROM fighter_aircrafts WHERE id = $1`, [aircraftId]);
    return rows[0];
}