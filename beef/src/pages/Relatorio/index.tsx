import React, { useState } from "react";
import { Text, View, Image, FlatList, Alert, TextInput, Button } from "react-native";
import axios from "axios";
import { styles } from "./style";
import Logo from "../../assets/logo_3.png";

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState([]); // Estado para armazenar o relatório
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(""); // Estado para armazenar a data inserida pelo usuário

  const fetchRelatorio = async () => {
    if (!data) {
      Alert.alert("Atenção", "Por favor, insira uma data válida.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/relatorios/vendas-diarias", {
        params: { data }, // Envia a data como parâmetro para o backend
      });
      if (response.status === 200) {
        setRelatorio(response.data);
      } else {
        Alert.alert("Atenção", "Nenhum dado encontrado para o relatório.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar o relatório.");
    } finally {
      setLoading(false);
    }
  };

  const renderRelatorio = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        <Text style={styles.label}>Pedido:</Text> {item.id_pedido}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Item:</Text> {item.nome_item}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Descrição:</Text> {item.descricao}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Quantidade:</Text> {item.quantidade}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Valor:</Text> R$ {item.valor_item.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Relatório de Vendas Diárias</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Digite a data (YYYY-MM-DD)"
          value={data}
          onChangeText={setData}
        />
        <Button title="Buscar Relatório" onPress={fetchRelatorio} />
        
        {loading ? (
          <Text style={styles.loading}>Carregando...</Text>
        ) : (
          <FlatList
            data={relatorio}
            keyExtractor={(item) => item.id_pedido.toString()}
            renderItem={renderRelatorio}
            ListEmptyComponent={
              <Text style={styles.empty}>Nenhum dado encontrado.</Text>
            }
          />
        )}
      </View>
    </View>
  );
}
