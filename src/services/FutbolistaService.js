import axios from 'axios';

const FUTBOLISTA_BASE_RES_API_URL = "http://localhost:8090/url/futbolista"

class FutbolistaService {
    getAllFutbolistas() {
        return axios.get(FUTBOLISTA_BASE_RES_API_URL);
    }

    getFutbolistaById(id) {
        return axios.get(`${FUTBOLISTA_BASE_RES_API_URL}/buscarPorId/${id}`);
    }

    getAllPosiciones(){
        return axios.get(`${FUTBOLISTA_BASE_RES_API_URL}/posiciones`);
    }

    createFutbolista(futbolista){
        return axios.post(`${FUTBOLISTA_BASE_RES_API_URL}/registrarFutbolista`, futbolista, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateFutbolista(futbolista){
        return axios.put(`${FUTBOLISTA_BASE_RES_API_URL}/actualizaFutbolista`, futbolista, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteFutbolista(id){
        return axios.delete(`${FUTBOLISTA_BASE_RES_API_URL}/eliminaFutbolista/${id}`);
    }

}

export default new FutbolistaService();
