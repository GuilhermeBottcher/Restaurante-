import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import Logo from "../../assets/logo_3.png";
import { Flag } from "../../components/flag"; 

type Pedido = {
  id_pedido: number;
  id_comanda: number;
  quantidade: number;
  status: boolean;
  itens?: {
    descricao: string;
    nome: string;
  };
};

export const Cozinha = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/cozinha/pedidos");
      if (response.status === 200) {
        setPedidos(response.data);
      } else {
        Alert.alert("Atenção", "Nenhum pedido encontrado para a cozinha.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };

  const alterarStatus = async (idPedido, statusAtual) => {
    const novoStatus = statusAtual ? false : true;

    try {

      const response = await axios.put(`http://localhost:4000/pedido/alterar-status/${idPedido}`, {
        status: novoStatus
      });

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
        <Text style={styles.label}>Item:</Text> {item.itens ? item.itens.nome : "Nome não disponível"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Descrição:</Text> {item.itens ? item.itens.descricao : "Descrição não disponível"}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Quantidade:</Text> {item.quantidade}
      </Text>
      <TouchableOpacity onPress={() => alterarStatus(item.id_pedido, item.status)}>
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
      <Text style={styles.title}>Pedidos da Cozinha</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
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
