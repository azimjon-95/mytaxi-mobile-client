import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // COUNTDOWN BLOCK
    countdownContainer: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 12,
        backgroundColor: "transparent",
        alignItems: "center", position: "absolute",
        bottom: -12,
    },

    countdownText: {
        color: "#00ff7f",
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 5,
    },

    cancelButton: {
        backgroundColor: "#041017",
        padding: 5,
        paddingBottom: 3,
        paddingTop: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ff444433",
    },

    /* MODAL */
    modalOverlay_li: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer_li: {
        width: "88%",
        backgroundColor: "#041017",
        padding: 20,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#00ff7f33",
    },

    modalTitle_li: {
        color: "#00ff7f",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },

    modalText_li: {
        color: "white",
        fontSize: 14,
        opacity: 0.8,
        textAlign: "center",
        marginBottom: 20,
    },

    modalButton_li: {
        flex: 1,
        backgroundColor: "#ff4444",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },

    modalButtonSl: {
        flex: 1,
        backgroundColor: "transparent",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#00ff7f55",
    },

    /* TAXI info card (optional UI) */
    taxiInfoCard: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#041017",
        padding: 15,
        borderWidth: 1,
        borderColor: "#00ff7f33",
        borderRadius: 14,
        alignItems: "center",
    },

    taxiTitle: {
        color: "#00ff7f",
        fontSize: 20,
        fontWeight: "700",
    },

    taxiSubText: {
        color: "white",
        marginTop: 2,
    },

    taxiArrival: {
        color: "#00ff7f",
        marginTop: 10,
        fontSize: 18,
        fontWeight: "800",
    },
});

















