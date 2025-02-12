
import { makeApiRequest } from "../../src/utils/iService.js"; // Asegúrate de que la ruta sea correcta

const ENDPOINT = "clientes"; // O el nombre del endpoint correspondiente para las escuderías

// Obtener todas las escuderías
export async function getClients() {
    try {
        const response = await makeApiRequest({
            endPoint: ENDPOINT,
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error("Error al obtener las escuderias:", error);
        throw error;
    }
}

// Obtener una escudería por ID
export async function getClientsById(id) {
    try {
        const response = await makeApiRequest({
            endPoint: `${ENDPOINT}/${id}`,
            method: "GET",
        });
        return response;
    } catch (error) {
        console.error("Error al obtener la escuderia por ID:", error);
        throw error;
    }
}

// Guardar o actualizar una escudería
export async function saveClient(clients) {
    try {
        const response = await makeApiRequest({
            endPoint: ENDPOINT,
            method: "POST",
            body: clients, // No usar JSON.stringify()
        });
    } catch (error) {
        console.error("Error al crear la pista:", error);
        throw error;
    }
}

export async function obtenerNombresClientes() {
    try {
        const data = await getClients();
        const pilots = data.map(client => ({
            id: client.id,
            nombre: client.nombre
        }));
        return pilots;
    } catch (error) {
        console.error("Error al obtener nombres:", error);
        return [];
    }
}


