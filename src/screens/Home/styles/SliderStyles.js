// timeModalStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.491)",
        justifyContent: "flex-end",
    },

    modalBox: {
        backgroundColor: "rgb(16, 24, 32)",
        color: "#fff",
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 20,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 15,
        textAlign: "center", color: "#fff",

    },

    timeBtn: {
        backgroundColor: "rgb(255, 196, 0)",
        paddingVertical: 15,
        paddingTop: 9,
        paddingBottom: 9,
        borderRadius: 12,
        marginVertical: 6,
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    timeBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#101820",
    },

    cancelBtn: {
        backgroundColor: "#ff3b3b",
        marginTop: 10,
    },

    cancelBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },
    card: {
        width: 100,
        height: 90,
        marginRight: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        borderWidth: 3,
        borderColor: "#ffffff",
        position: "relative",
    },

    activeCard: {
        borderColor: "rgb(255, 196, 0)",
        backgroundColor: "#ffffff",
    },

    image: {
        width: 95,
        height: 95,
        resizeMode: "contain",
        marginBottom: 5,
    },

    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#444",
        position: "absolute",
        bottom: 2,
        textAlign: "center",
        textTransform: "capitalize",
    },

    activeLabel: {
        color: "rgb(255, 196, 0)",
        fontWeight: "700",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
        gap: 12,
    },

    serviceBtn: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingBottom: 7,
        paddingTop: 7,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: "#ddd",
        alignItems: "center",
    },

    activeService: {
        borderColor: "rgb(255, 196, 0)",
        backgroundColor: "#ffffff",
    },

    serviceLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#444",
    },
});
