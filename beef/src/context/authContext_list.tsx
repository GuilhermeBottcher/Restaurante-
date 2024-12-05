import React, { createContext, useContext, useEffect, useRef, } from "react";
import {Dimensions, Text, View, StyleSheet, Touchable, TouchableOpacity} from "react-native";
import { Modalize } from "react-native-modalize";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import { Input } from "../components/input";

export const AuthContextList = createContext({})

export const AuthProviderList = (props:any):any =>{
    
    const modalizeRef =useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(()=>{
        onOpen()
    },[])
    
    const _container = ()=>{                                    
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <MaterialIcons
                            name='close'
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Fazer Pedido</Text>
                    <TouchableOpacity>
                        <AntDesign
                            name='check'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Input
                    title="Item"
                    labelStyle={styles.label} />                    
                    <Input
                    title="Quantidade"
                    labelStyle={styles.label} />
                    <Input
                    title="Tipo"
                    labelStyle={styles.label} />
                </View>
            </View>
        )
    }   

    return(
        <AuthContextList.Provider value={{onOpen}}>
            {props.children}
            <Modalize
                ref={modalizeRef}
                modalStyle={{ height: Dimensions.get('window').height / 1.8 }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth=()=>useContext(AuthContextList)

export const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:40,
        paddingHorizontal:40,
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        alignItems:'center'
    },
    container:{
        width:'100%'
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    content:{
        width:'100%',
        paddingHorizontal:20
    },
    label:{
        fontWeight:'bold',
        color:'#000'
    }
})