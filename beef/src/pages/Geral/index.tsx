import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo_3.png";

export default function Geral({ navigation }: { navigation: any }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCadastroUsuario = () => {
        
        navigation.navigate("CadastroUsuario");
    };

    const handleCadastroCardapio = () => {
        navigation.navigate("CadastroCardapio");
    };

    const handleCozinha = () => {
        navigation.navigate("Cozinha");
    };

    const handleCopa = () => {
        navigation.navigate("Copa");
    };
    const handleRelatorio = () => {
        navigation.navigate("Relatorio");
    };


    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
            </View>

            <View style={style.boxList}>
                <TouchableOpacity
                    style={style.card}
                    onPress={handleCadastroUsuario}
                >
                    <Text style={style.cardText}>Cadastro de Usuário</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.card}
                    onPress={handleCadastroCardapio}
                >
                    <Text style={style.cardText}>Cadastro de Cardápio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.card}
                    onPress={handleCozinha}
                >
                    <Text style={style.cardText}>Cozinha</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={style.card}
                    onPress={handleCopa}
                >
                    <Text style={style.cardText}>Copa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.card}
                    onPress={handleRelatorio}
                >
                    <Text style={style.cardText}>Relatório</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
