import axios from 'axios';

const API_URL = "http://localhost:8080";  // Adjust this to your Spring Boot server address

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "/authenticate", {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();