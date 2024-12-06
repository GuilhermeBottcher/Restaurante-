import React, { useEffect, useState } from "react";
import { Flag } from "../../components/flag";
import { View, Text, StyleSheet, FlatList, Alert, Touchable } from "react-native";
import axios from "axios";

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

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.text}>
        <Text style={styles.label}>Comanda:</Text> {item.id_comanda}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Item:</Text> {item.cod_item}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Quantidade:</Text> {item.quantidade}
      </Text>
      <Flag
        color={item.status ? "green" : "orange"} 
        caption={item.status ? "Pronto" : "Pendente"} 
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
