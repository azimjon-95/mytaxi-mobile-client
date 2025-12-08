// homeStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 10,
        height: "90%",
        paddingBottom: 10,
    },

    title: {
        fontSize: 45,
        fontWeight: "900",
        color: "#FFC400",
        marginTop: 40,
        textAlign: "center",
        textShadowColor: "rgba(255,194,0,0.6)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },

    orderBtn: {
        backgroundColor: "#FFC400",
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 20,
        width: "89%",
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 35,
        elevation: 10,

        shadowColor: "#FFC400",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },

    orderBtnText: {
        fontSize: 22,
        includeFontPadding: false,
        textAlign: "center",
        fontWeight: "800",
        color: "#101820",
    },

    infoSection: {
        marginBottom: 0,
    },

    callBtn: {
        backgroundColor: "#ffffff91",
        marginHorizontal: 20,
        paddingVertical: 16,
        marginTop: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 20,
    },

    callBtnText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
    },

    callBtnSubtext: {
        fontSize: 12,
        textAlign: "center",
        color: "#000",
        marginTop: 4,
        opacity: 0.9,
    },

    infoBox: {
        backgroundColor: "#ffffff91",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    infoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#232323",
        marginBottom: 12,
    },

    infoText: {
        fontSize: 14,
        color: "#000000",
        marginBottom: 6,
        lineHeight: 20,
    },
});




