import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#FFFFFF",
        paddingHorizontal: 19,
        backgroundColor: "#101820",
        elevation: 3,
    },
    headerBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    hamburgerBtn: {
        width: 27,
        justifyContent: "space-between",
        height: 20,
    },
    hamburgerLine: {
        height: 3,
        backgroundColor: "#fefefe",
        borderRadius: 2,
    },
    backBtn: {
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 5,
    },
    backBtnText: {
        fontSize: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    cashbackBadge: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cashbackText: {
        fontSize: 14,
        fontWeight: "600",
    },
});

export default styles;