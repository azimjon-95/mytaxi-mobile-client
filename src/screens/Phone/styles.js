
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101820",
        justifyContent: "center",
        padding: 24,
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "rgb(0, 255, 127)",
        textAlign: "center",
        marginBottom: 8,
        textShadowColor: "#00ff8097",
        textShadow: "0px 2px 3px rgba(0,0,0,0.5)",
        textShadowRadius: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#00ff8097",
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "rgb(0, 255, 127)",
        borderRadius: 12,
        backgroundColor: "rgba(255,194,0,0.05)",
        paddingHorizontal: 16,
        marginBottom: 24,
        shadowColor: "rgb(0, 255, 127)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    prefix: {
        fontSize: 18,
        color: "rgb(0, 255, 127)",
        fontWeight: "600",
        marginRight: 8,
    },
    input: {
        flex: 1,
        padding: 16,
        fontSize: 18,
        color: "rgb(0, 255, 127)",
        backgroundColor: "transparent",
        outline: "none",
        borderWidth: 0, // default border yo'q
        fontWeight: "500",
    },
    btn: {
        backgroundColor: "rgb(0, 255, 127)",
        padding: 18,
        borderRadius: 12,
        shadowColor: "rgb(0, 255, 127)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    },
    btnDisabled: {
        opacity: 0.5,
    },
    btnText: {
        color: "#101820",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    disclaimer: {
        marginTop: 24,
        fontSize: 13,
        color: "#00ff8097",
        textAlign: "center",
        lineHeight: 18,
    },
});