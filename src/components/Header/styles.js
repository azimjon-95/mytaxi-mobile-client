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
        backgroundColor: "#00ff7f",
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
        borderColor: "#00ff7f",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#00ff7f",
        borderRadius: 12,
    },
    cashbackText: {
        color: "#00ff7f",
        fontSize: 14,
        fontWeight: "600",
    },
});

export default styles;