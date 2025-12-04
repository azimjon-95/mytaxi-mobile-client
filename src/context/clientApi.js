import { api } from "./api"; // sizning baseApi importi

export const clientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Yangi foydalanuvchi yaratish
        saveUser: builder.mutation({

            query: (userData) => ({
                url: "/client",
                method: "POST",
                body: userData,
            }),
        }),

        // Barcha foydalanuvchilarni olish
        getAllUsers: builder.query({
            query: () => "/client",
        }),

        // Telefon bo‘yicha foydalanuvchi olish
        getUserByPhone: builder.query({
            query: (phone) => `/client/${phone}`,
        }),

        // Foydalanuvchini yangilash
        updateUser: builder.mutation({
            query: ({ phone, ...data }) => ({
                url: `/client/${phone}`,
                method: "PUT",
                body: data,
            }),
        }),

        // Foydalanuvchini o‘chirish
        deleteUser: builder.mutation({
            query: (phone) => ({
                url: `/client/${phone}`,
                method: "DELETE",
            }),
        }),

        // PIN bilan login (token olish)
        loginWithPin: builder.mutation({
            query: ({ phone, pin }) => ({
                url: "/client/login",
                method: "POST",
                body: { phone, pin },
            }),
        }),

    }),
    overrideExisting: false,
});

export const {
    useSaveUserMutation,
    useGetAllUsersQuery,
    useGetUserByPhoneQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useLoginWithPinMutation,
} = clientApi;
