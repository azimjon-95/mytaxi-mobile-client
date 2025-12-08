// styles/TaxiTracker.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    radarContainer: {
        width: 340, // default size, siz ActiveTaxiTracker da props orqali o'zgartirishingiz mumkin
        height: 340,
        alignSelf: "center",
    },
    taxiApproach: {
        position: "absolute",
    },
    taxiInfoContainer: {
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
    taxiName: {
        color: "#00ff7f",
        fontSize: 20,
        fontWeight: "700",
    },
    taxiColor: {
        color: "white",
        marginTop: 2,
    },
    taxiDriver: {
        color: "white",
        marginTop: 6,
    },
    taxiPhone: {
        color: "white",
        marginTop: 2,
    },
    taxiETA: {
        color: "#00ff7f",
        marginTop: 10,
        fontSize: 18,
        fontWeight: "800",
    },
});
