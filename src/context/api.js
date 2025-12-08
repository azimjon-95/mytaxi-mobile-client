import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Bazaviy query – token bilan headers tayyorlash
const rawBaseQuery = fetchBaseQuery({
    // http://192.168.1.5:8082/api
    baseUrl: "http://192.168.1.102:5000/api/v1", // backend manzilingiz
    prepareHeaders: async (headers) => {
        let token = await AsyncStorage.getItem("token");
        if (token) {
            token = token.replace(/"/g, "");

            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Custom wrapper – xatolarni ushlash
const baseQuery = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    // Backend xatolarini tekshirish
    if (result?.error?.data?.message) {
        const msg = result.error.data.message;

        if (msg === "invalid signature" || msg === "jwt expired") {
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    return result;
};

// RTK Query API yaratish
export const api = createApi({
    reducerPath: "splitApi",
    baseQuery,
    tagTypes: ["Orders"], // kerak bo'lsa taglar qo'shish mumkin
    endpoints: () => ({}),
});
