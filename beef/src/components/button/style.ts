import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    
    button:{
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.colors.vermelho,
        borderRadius:40, 
    }, 
    
    textButton:{
        fontSize:16,
        color:themas.colors.branco,
        fontWeight:"bold"
    }
}
)