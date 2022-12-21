import { servicioPreventaResumen } from '../services/user.service.js'
import { logger } from '../logger/logger.js'

export async function getUsers(req, res) {
  try {
    //const user = await servicioPreventaResumen()
    res.json({name: "kaori puto"});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
