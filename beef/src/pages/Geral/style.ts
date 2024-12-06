import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.branco,
        alignItems: "center",
    },
    header:{
        backgroundColor:themas.colors.branco,       
        width:'100%',
        height:Dimensions.get('window').height/4,
        alignItems:'center',
        borderBottomWidth:3
    },
    logo: {
        width: 280,
        height: 280,
    },
    boxList: {
        width: "100%",
        paddingHorizontal: 30,
        alignItems: "center",
        paddingVertical:15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30,
        paddingVertical:10
    },
    card:{
        width:'100%',
        height:60,
        backgroundColor:themas.colors.branco,
        borderRadius:10,
        marginTop:6,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        padding:10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    cardText: {
        color: themas.colors.preto,
        fontSize: 18,
    },
})