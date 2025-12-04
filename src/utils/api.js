import AsyncStorage from "@react-native-async-storage/async-storage";

// SERVER URL
const API_URL = "http://192.168.1.5:8080/api"; // O'zingizning server IP manzilingizni yozing

async function getToken() {
    return await AsyncStorage.getItem("token");
}

export const api = {
    get: async (url) => {
        const token = await getToken();

        const response = await fetch(`${API_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        return response.json();
    },

    post: async (url, data) => {
        const token = await getToken();

        const response = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    },
};
