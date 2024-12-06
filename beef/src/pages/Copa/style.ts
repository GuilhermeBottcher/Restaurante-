import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: themas.colors.branco
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
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
    },
    pedidoItem: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    boxList:{
        flex:1,
        width:'100%',
        backgroundColor:themas.colors.branco        
    },
    text: {
      fontSize: 16,
      marginBottom: 4,
    },
    label: {
      fontWeight: "bold",
    },
    loading: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 20,
    },
    empty: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 20,
      color: "#888",
    },
  });
  