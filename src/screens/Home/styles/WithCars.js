import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    radarWrapper: {
        alignSelf: "center",
        marginBottom: 15,
    },

    taxiIcon: {
        width: 30,
        height: 30,
        position: "absolute",
    },

    scroll: {
        width: "90%",
        alignSelf: "center",
        maxHeight: 400,
    },

    scrollContent: {
        paddingBottom: 10,
    },

    taxiCard: {
        backgroundColor: "#041017",
        padding: 12,
        borderRadius: 12,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "#00ff7f33",
        flexDirection: "row",
        alignItems: "center",
    },

    taxiCardLoading: {
        opacity: 0.5,
    },

    taxiImage: {
        width: 38,
        height: 38,
        marginRight: 12,
    },

    taxiName: {
        color: "#00ff7f",
        fontSize: 13,
        fontWeight: "700",
    },

    taxiColor: {
        color: "#949494",
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 4,
    },

    driverName: {
        color: "white",
        opacity: 0.85,
        marginTop: 2,
    },

    etaText: {
        color: "#00ff7f",
        fontSize: 13,
        fontWeight: "800",
    },

    loadingText: {
        color: "#00ff7f",
        fontSize: 16,
    },
});
