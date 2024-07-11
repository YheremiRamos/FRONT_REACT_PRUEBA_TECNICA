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
        return axios.post(`${FUTBOLISTA_BASE_RES_API_URL}/registrarFutbolista`,futbolista);
    }
    
}

export default new FutbolistaService();
