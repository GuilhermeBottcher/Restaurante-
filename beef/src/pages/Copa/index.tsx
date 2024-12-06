import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, FlatList, TouchableOpacity, Image } from "react-native";
import Logo from "../../assets/logo_3.png";
import axios from "axios";
import { styles } from "./style";
import { Flag } from "../../components/flag"; 

export const Copa = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/copa/pedidos");
      if (response.status === 200) {
        setPedidos(response.data);
      } else {
        Alert.alert("Atenção", "Nenhum pedido encontrado para a copa.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };


  const alterarStatus = async (idPedido, statusAtual) => {
    const novoStatus = statusAtual ? false : true; 
    console.log(`Alterando status do pedido ${idPedido} para ${novoStatus ? "Pronto" : "Pendente"}`);

    try {

      const response = await axios.put(`http://localhost:4000/pedido/alterar-status/${idPedido}`, {
        status: novoStatus
      });

      console.log('Resposta da requisição:', response);
      if (response.status === 200) {
        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id_pedido === idPedido ? { ...pedido, status: novoStatus } : pedido
          )
        );
        Alert.alert('Sucesso', 'Status do pedido alterado com sucesso.');
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      Alert.alert('Erro', 'Não foi possível alterar o status do pedido.');
    }
  };

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.text}>
        <Text style={styles.label}>Comanda:</Text> {item.id_comanda}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Descrição:</Text> {item.itens ? item.itens.descricao : "Descrição não disponível"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Quantidade:</Text> {item.quantidade}
      </Text>
      <TouchableOpacity onPress={()=> alterarStatus(item.id_pedido, item.status)}>
        <Flag
          color={item.status ? "green" : "orange"}
          caption={item.status ? "Pronto" : "Pendente"}
        />
      </TouchableOpacity>
      <Button
        title={`Alterar para ${item.status ? "Pendente" : "Pronto"}`}
        onPress={() => alterarStatus(item.id_pedido, item.status)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
    <View style={styles.boxList}>
      <Text style={styles.title}>Pedidos da Copa</Text>
      {loading ? (
        <Text style={styles.loading}>Carregando...</Text>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id_pedido.toString()}
          renderItem={renderPedido}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum pedido encontrado.</Text>
          }
        />
      )}
      </View>
    </View>
  );
};
