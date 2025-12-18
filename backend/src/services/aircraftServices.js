import { query } from "../db.js";

export const getAircrafts = async () => {
    const { rows } = await query("SELECT * FROM fighter_aircrafts");
    return rows;
}