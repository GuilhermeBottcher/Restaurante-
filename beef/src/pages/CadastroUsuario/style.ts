import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    feedback: {
        marginTop: 15,
        color: "green",
        fontWeight: "bold",
    },

    button: {
        width: "100%",
        height: 50,
        backgroundColor:themas.colors.vermelho,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },

    textButton:{
        fontSize:16,
        color:themas.colors.branco,
        fontWeight:"bold"
    }
});
