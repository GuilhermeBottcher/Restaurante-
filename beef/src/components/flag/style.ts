import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    
    container:{
        width:50,
        height:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.colors.vermelho,
        borderRadius:4,
    },

    tmtext:{
        fontSize:12,
        color:themas.colors.branco
    }
})