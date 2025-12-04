import { api } from "./api";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // =================== CREATE ORDER ===================
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),

        // =================== GET ALL ORDERS ===================
        getOrders: builder.query({
            query: () => "/orders",
            providesTags: ["Orders"],
        }),

        // =================== GET ORDER BY ID ===================
        getOrderById: builder.query({
            query: (id) => `/orders/${id}`,
        }),

        // =================== UPDATE ORDER ===================
        updateOrder: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/orders/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),

        // =================== CANCEL ORDER ===================
        cancelOrder: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/orders/${id}/cancel`,
                method: "POST",
                body: { reason },
            }),
            invalidatesTags: ["Orders"],
        }),

        // =================== DELETE ORDER ===================
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),

        // =================== DRIVER SELECT ORDER ===================
        selectDriver: builder.mutation({
            query: (data) => ({
                url: "/orders/select-driver",
                method: "POST",
                body: data,
            }),
        }),

        // =================== CLIENT ASSIGNS DRIVER ===================
        assignDriverByClient: builder.mutation({
            query: (data) => ({
                url: "/orders/assign-driver",
                method: "POST",
                body: data,
            }),
        }),

        // =================== START METER ===================
        startMeter: builder.mutation({
            query: (data) => ({
                url: "/orders/start-meter",
                method: "POST",
                body: data,
            }),
        }),

        // =================== UPDATE METER ===================
        updateMeter: builder.mutation({
            query: (data) => ({
                url: "/orders/update-meter",
                method: "POST",
                body: data,
            }),
        }),

        // =================== COMPLETE ORDER ===================
        completeOrder: builder.mutation({
            query: (data) => ({
                url: "/orders/complete",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),

        // =================== WATCH ACTIVE ORDER ===================
        // socket bilan BEPUL ulanish uchun
        watchActiveOrder: builder.query({
            query: (clientId) => ({
                url: `/orders/live/${clientId}`,
                method: "GET",

            }),
        }),
    }),
});

// EXPORT HOOKS
export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useUpdateOrderMutation,
    useCancelOrderMutation,
    useDeleteOrderMutation,
    useSelectDriverMutation,
    useAssignDriverByClientMutation,
    useStartMeterMutation,
    useUpdateMeterMutation,
    useCompleteOrderMutation,
    useWatchActiveOrderQuery,
} = orderApi;
