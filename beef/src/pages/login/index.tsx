import { Input } from "../../components/input";
import {Button} from "../../components/button";
import React, { useState } from "react";
import { Text, View, Image, Alert } from 'react-native';
import { style } from "./styles";
import Logo from '../../assets/logo-2.png';
import {MaterialIcons, Octicons} from '@expo/vector-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from "axios"; 

export default function Login(){

    const navigation = useNavigation<NavigationProp<any>>();

    const[usuário,setUsuário] = useState('');
    const[senha,setSenha] = useState('');
    const [mostrarSenha,setMostrar] = useState(true);
    const[loading,setLoading] = useState(false);

    async function getlogin(){
        try {
            setLoading(true);
    

            console.log("usuário:", usuário);
            console.log("senha:", senha);
    

            if(!usuário.trim() || !senha.trim()) {
                return Alert.alert('Atenção', 'Informe os dados obrigatórios.');
            }
    
            
            const response = await axios.post("http://localhost:4000/login", {
                email: usuário, 
                senha: senha
            });
    

            if (response.status === 200) {

                navigation.reset({routes:[{name:"BottomRoutes"}]});
            } else {

                Alert.alert('Erro', 'Usuário ou senha incorretos.');
            }
    
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
        }
    }
    

    return (
    <View style={style.container}>
        <View style={style.boxTop}>
            <Image source={Logo} style={style.logo} resizeMode="contain"/>
        </View>
        <View style={style.boxMid}>
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
                IconRigthName={mostrarSenha ? "eye-closed" : "eye"}
                secureTextEntry={mostrarSenha}
                onIconRigthPress={() => setMostrar(!mostrarSenha)}
            />
        </View>
        <View style={style.boxBottom}>
            <Button
                text="ENTRAR"
                loading={loading} 
                onPress={getlogin}
            />
        </View>
    </View>
    );
}
