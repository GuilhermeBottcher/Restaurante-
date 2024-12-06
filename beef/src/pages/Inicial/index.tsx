import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { style } from "./style";
import Logo from "../../assets/logo_3.png";
import { Ball } from "../../components/ball";
import { Flag } from "../../components/flag";
import { themas } from "../../global/themes";
import axios from "axios";

type Comanda = {
    id_comanda: number;
    num_mesa: number;
    valor: number;
    fechada: boolean;
};

export default function Inicial() {
    const [comandas, setComandas] = useState<Comanda[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    const fetchComandas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:4000/comanda");
            setComandas(response.data);
        } catch (err) {
            console.error(err);
            setError("Erro ao buscar comandas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComandas();
    }, []);


    const _renderCard = (item: Comanda) => {
        return (
            <TouchableOpacity style={style.card}>
                <View style={style.rowCard}>
                    <View style={style.rowCardLeft}>
                        <Ball color="red" />
                        <View>
                            <Text style={style.tittleCard}>Comanda: {item.id_comanda}</Text>
                            <Text></Text>
                            <Text>Valor: R$ {item.valor?.toFixed(2)}</Text>
                        </View>
                    </View>
                    <Flag
                        caption={item.fechada ? "Fechada" : "Aberta"}
                        color={item.fechada ? themas.colors.vermelho : themas.colors.preto}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
            </View>
            <View style={style.boxList}>
                {loading ? (
                    <ActivityIndicator size="large" color={themas.colors.vermelho} />
                ) : error ? (
                    <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
                ) : (
                    <FlatList
                        data={comandas}
                        style={{ marginTop: 40, paddingHorizontal: 30 }}
                        keyExtractor={(item) => item.id_comanda.toString()}
                        renderItem={({ item }) => _renderCard(item)}
                    />
                )}
            </View>
        </View>
    );
}
