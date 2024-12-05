import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:themas.colors.branco
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

    boxList:{
        flex:1,
        width:'100%',
        backgroundColor:themas.colors.branco        
    },

    card:{
        width:'100%',
        height:60,
        backgroundColor:themas.colors.branco,
        borderRadius:10,
        marginTop:6,
        justifyContent:'center',
        padding:10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    rowCard:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    rowCardLeft:{
        width:'70%',
        flexDirection:'row',
        alignItems:"center",
        gap:10
    },
    tittleCard:{
        fontSize:16,
        fontWeight:"bold"
    }
})