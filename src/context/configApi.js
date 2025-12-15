import { api } from "./api"; // baseApi (createApi) importi

export const configApi = api.injectEndpoints({
    endpoints: (builder) => ({

        /* ======================
           🚗 CAR TYPES
        ====================== */

        // GET
        getCarTypes: builder.query({
            query: () => "/config/car-types",
            providesTags: ["CarTypes"],
        }),

        // CREATE
        createCarType: builder.mutation({
            query: (body) => ({
                url: "/config/car-types",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CarTypes"],
        }),

        // UPDATE
        updateCarType: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/config/car-types/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["CarTypes"],
        }),

        // DELETE
        deleteCarType: builder.mutation({
            query: (id) => ({
                url: `/config/car-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CarTypes"],
        }),

        /* ======================
           🔥 SERVICES
        ====================== */

        // GET
        getServices: builder.query({
            query: () => "/config/services",
            providesTags: ["Services"],
        }),

        // CREATE
        createService: builder.mutation({
            query: (body) => ({
                url: "/config/services",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Services"],
        }),

        // UPDATE
        updateService: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/config/services/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Services"],
        }),

        // DELETE
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/config/services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Services"],
        }),

    }),
});

export const {
    useGetCarTypesQuery,
    useCreateCarTypeMutation,
    useUpdateCarTypeMutation,
    useDeleteCarTypeMutation,

    useGetServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = configApi;
