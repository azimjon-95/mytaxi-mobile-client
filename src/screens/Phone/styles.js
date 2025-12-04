
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
        color: "#FFC400",
        textAlign: "center",
        marginBottom: 8,
        textShadowColor: "rgba(255,194,0,0.6)",
        textShadow: "0px 2px 3px rgba(0,0,0,0.5)",
        textShadowRadius: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255,194,0,0.7)",
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFC400",
        borderRadius: 12,
        backgroundColor: "rgba(255,194,0,0.05)",
        paddingHorizontal: 16,
        marginBottom: 24,
        shadowColor: "#FFC400",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    prefix: {
        fontSize: 18,
        color: "#FFC400",
        fontWeight: "600",
        marginRight: 8,
    },
    input: {
        flex: 1,
        padding: 16,
        fontSize: 18,
        color: "#FFC400",
        backgroundColor: "transparent",
        outline: "none",
        borderWidth: 0, // default border yo'q
        fontWeight: "500",
    },
    btn: {
        backgroundColor: "#FFC400",
        padding: 18,
        borderRadius: 12,
        shadowColor: "#FFC400",
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
        color: "rgba(255,194,0,0.6)",
        textAlign: "center",
        lineHeight: 18,
    },
});