import React, { useState } from "react";
import { Text, View, Image, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo-2.png';
import {MaterialIcons, Octicons, FontAwesome} from '@expo/vector-icons'
import { themas } from "../../global/themes";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Input } from "../../components/input";
import {Button} from "../../components/button";
import { useNavigation, NavigationProp} from '@react-navigation/native';

export default function Login(){

    const navigation = useNavigation<NavigationProp<any>>();

    const[usuário,setUsuário] = useState('');
    const[senha,setSenha] = useState('');
    const [mostrarSenha,setMostrar] = useState(true);
    const[loading,setLoading] = useState(false)
    
    async function getlogin(){
        try {
            setLoading(true)
            if(!usuário || !senha) {
               return Alert.alert('Atenção', 'informe os dados obrigatórios')
            }

            navigation.reset({routes:[{name:"BottomRoutes"}]})
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    return (
    <View style={style.container}>
        <View style={style.boxTop}>
            <Image source={Logo}
            style={style.logo}
            resizeMode="contain"/>
        </View>
        <View style= {style.boxMid}>
            <Input
            value={usuário}
            onChangeText={setUsuário}
            title="USUÁRIO"
            IconRigth={MaterialIcons}
            IconRigthName="people"
            />
            <Input
            value={senha}
            onChangeText={setSenha}
            title="SENHA"
            IconRigth={Octicons}
            IconRigthName={mostrarSenha?"eye-closed":"eye"}
            secureTextEntry={mostrarSenha}
            onIconRigthPress={()=> setMostrar(!mostrarSenha)}/>
        </View>
        <View style={style.boxBottom}>
            <Button
            text="ENTRAR"
            loading={loading} onPress={()=>getlogin()}/>
        </View>
    </View>
    )
}
