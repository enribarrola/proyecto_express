import { preventaResumen } from '../repository/user.repository.js'

export const servicioPreventaResumen = async () => {
    const preventa = await preventaResumen()
    if (preventa.length == 0) {
        throw new Error("La preventa no existe.")
    }
    return preventa
}


