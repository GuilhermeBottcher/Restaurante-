import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { BorderlessButton } from "react-native-gesture-handler";

export const style = StyleSheet.create({

    tabArea:{
        flexDirection:'row',
        height:80,
        justifyContent:'space-around',
        backgroundColor:themas.colors.vermelho
    },

    tabItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    tabItemButton:{
        height:70,
        width:70,
        borderRadius:35,
        alignItems:'center',
        justifyContent:'center',
        zIndex:99999,
        top:-30,
        backgroundColor:themas.colors.vermelho,
        borderWidth:3,
        borderColor:themas.colors.preto
    }
})