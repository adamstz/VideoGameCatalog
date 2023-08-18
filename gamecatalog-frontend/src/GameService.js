import axios from 'axios';

const API_URL = 'http://localhost:8080/api/games';

class GameService {

    getAllGames() {
        return axios.get(API_URL);
    }

    updateGame(gameId, updatedFields) {
        console.log(gameId, updatedFields);
        return axios.put(`${API_URL}/${gameId}`, updatedFields)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }
    createGame(game) {
        return axios.post(API_URL, game)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }
}

export default new GameService();

//create a forloop     