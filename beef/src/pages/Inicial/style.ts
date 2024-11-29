import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:''
    },

 header:{
        backgroundColor:themas.colors.branco,       
        width:'100%',
        height:Dimensions.get('window').height/4,
        alignItems:'center',
        borderBottomWidth:3
    },

    logo:{
        width: 280,
        height:280,
    },
})