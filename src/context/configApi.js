import { api } from "./api"; // baseApi (createApi) importi

export const configApi = api.injectEndpoints({
    endpoints: (builder) => ({

        /* ======================
           🚗 CAR TYPES
        ====================== */

        // GET
        getCarTypes: builder.query({
            query: () => "/config/car-types",
        }),

        // CREATE
        createCarType: builder.mutation({
            query: (body) => ({
                url: "/config/car-types",
                method: "POST",
                body,
            }),
        }),

        // UPDATE
        updateCarType: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/config/car-types/${id}`,
                method: "PUT",
                body,
            }),
        }),

        // DELETE
        deleteCarType: builder.mutation({
            query: (id) => ({
                url: `/config/car-types/${id}`,
                method: "DELETE",
            }),
        }),

        /* ======================
           🔥 SERVICES
        ====================== */

        // GET
        getServices: builder.query({
            query: () => "/config/services",
        }),

        // CREATE
        createService: builder.mutation({
            query: (body) => ({
                url: "/config/services",
                method: "POST",
                body,
            }),
        }),

        // UPDATE
        updateService: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/config/services/${id}`,
                method: "PUT",
                body,
            }),
        }),

        // DELETE
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/config/services/${id}`,
                method: "DELETE",
            }),
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
