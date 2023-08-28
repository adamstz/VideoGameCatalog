import axios from 'axios';

const API_URL = 'http://localhost:8080/api/games';
const USER_API_URL = 'http://localhost:8080/api/user';

class GameService {

    getToken() {
        
        return localStorage.getItem('token');  // Assuming you store the token in local storage with key 'token'
    }

    getAllGames() {
        if (this.getToken() == null) {
            return axios.get(API_URL).then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }else{
            return axios.get(API_URL, {
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            }).then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
       
    }

    updateGame(gameId, updatedFields) {
        if (this.getToken() == null) {
            return axios.put(`${API_URL}/${gameId}`, updatedFields).then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
        else{
            return axios.put(`${API_URL}/${gameId}`, updatedFields, {
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
        
    }

    createGame(game) {
        if (this.getToken() == null) {
            return axios.post(API_URL, game).then((response) => {
                return response.data;
            })  .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
        else {
            return axios.post(API_URL, game, {
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
        }
        
    }

    getFavorite() {
        return axios.get(`${USER_API_URL}/getFavorites`, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
    }

    addFavorite(gameId) {
        return axios.post(`${USER_API_URL}/addFavorite`, {
            gameId: gameId
        }, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
    }

    removeFavorite(gameId) {
        return axios.delete(`${USER_API_URL}/removeFavorite`, {
            data: { gameId: gameId },
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
    }
}

export default new GameService();