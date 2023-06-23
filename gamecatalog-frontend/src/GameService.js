import axios from 'axios';

const API_URL = 'http://localhost:8080/api/games';

class GameService {

    getAllGames() {
        return axios.get(API_URL);
    }

    // Continue with other CRUD operations...
}

export default new GameService();