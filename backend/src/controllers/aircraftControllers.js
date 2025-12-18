import * as aircraftServices from "../services/aircraftServices.js";

export const getAircrafts = async (req, res) => {
    try {
        const aircrafts = await aircraftServices.getAircrafts();

        const data = aircrafts.map(aircrafts => ({
            id: aircrafts.id,
            name: aircrafts.aircraft_name,
            country: aircrafts.country,
            role: aircrafts.primary_role,
            max_speed: aircrafts.max_speed,
            year: aircrafts.first_service_year,
            stealth: aircrafts.stealth,
            image: aircrafts.image_url,
            })
        )
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching aircrafts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createAircraft = async (req, res) => {
    try {
        const aircraftData = req.body;
        aircraftData.file = req.file;
        const createdAircraft = await aircraftServices.createAircraft(aircraftData);
        res.status(201).json(createdAircraft);
    } catch (error) {
        console.error('Error creating aircraft:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};