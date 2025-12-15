import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Bazaviy query – token bilan headers tayyorlash
const rawBaseQuery = fetchBaseQuery({

    baseUrl: "http://localhost:5000/api/v1", // backend manzilingiz
    // baseUrl: "http://192.168.1.102:5000/api/v1", // backend manzilingiz
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
    try {
        const result = await rawBaseQuery(args, api, extraOptions);

        // Token tekshirish
        if (result?.error?.data?.message) {
            const msg = result.error.data.message;

            if (msg === "invalid signature" || msg === "jwt expired") {
                await AsyncStorage.clear();
            }
        }

        return result;
    } catch (error) {
        // React Native ichida DOMException bo‘lsa shu yerga tushadi
        return {
            error: {
                status: "CUSTOM_ERROR",
                data: { message: error.message || "Unknown error" },
            },
        };
    }
};


export const api = createApi({
    reducerPath: "splitApi",
    baseQuery,
    tagTypes: ["Orders"],
    endpoints: () => ({}),
});