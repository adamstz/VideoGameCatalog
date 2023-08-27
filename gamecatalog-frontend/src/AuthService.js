import axios from 'axios';

const API_URL = "http://localhost:8080";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "/authenticate", {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);  // Store the token
                console.log(response.data.token);
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("token");  // Remove the token
    }

    getToken() {
        return localStorage.getItem("token");  // Get the stored token
    }
    async fetchCurrentUser() {
        const token = localStorage.getItem('token');
        console.log(token);
        try {
            const response = await fetch('/api/user/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const user = await response.json();
                return user.username;  // Assuming the user object has a 'username' property
            } else {
                console.error('Failed to fetch user details');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
}

export default new AuthService();