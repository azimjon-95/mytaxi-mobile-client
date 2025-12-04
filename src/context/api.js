import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Bazaviy query – token bilan headers tayyorlash
const rawBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5050/api/v1", // backend manzilingiz
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token"); // yoki AsyncStorage agar React Native bo'lsa
        if (token) {
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
    tagTypes: [], // kerak bo'lsa taglar qo'shish mumkin
    endpoints: () => ({}),
});
