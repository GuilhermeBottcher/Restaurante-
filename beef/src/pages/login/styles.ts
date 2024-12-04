import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    boxTop:{
        backgroundColor:themas.colors.branco,       
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    boxMid:{
        backgroundColor:themas.colors.branco,
        height:Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:37
    },
    boxBottom:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center'
    },
    logo:{
        width: 300,
        height:300,
    },
 
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