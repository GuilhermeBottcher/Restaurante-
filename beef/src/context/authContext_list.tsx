import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Input } from "../components/input";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { themas } from "../global/themes";

export const AuthContextList = createContext({});

export const AuthProviderList = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);
  const [loading, setLoading] = useState(false);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const criarPedido = async (pedidoData: any) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/pedido", pedidoData); 

      if (response.status === 201) {
        Alert.alert("Sucesso", "Pedido criado com sucesso!");
        modalizeRef.current?.close();
      } else {
        Alert.alert("Erro", "Falha ao criar pedido.");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.mensagem || "Erro inesperado.";
      Alert.alert("Erro", `Não foi possível criar o pedido. ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onOpen();
  }, []);

  const _container = () => {
    const [item, setItem] = useState("");
    const [comanda, setComanda] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("copa"); // Valor inicial como 'copa'

    const handleCriarPedido = () => {
      if (!comanda || !item || !quantidade || !tipo) {
        return Alert.alert("Atenção", "Todos os campos são obrigatórios.");
      }

      const pedidoData = {
        id_comanda: parseInt(comanda, 10),
        cod_item: parseInt(item, 10),
        quantidade: parseInt(quantidade, 10),
        status: false,
        tipo: tipo === "copa" ? false : true, // Converte 'copa' para false e 'cozinha' para true
      };

      criarPedido(pedidoData);

      setItem("");
      setComanda("");
      setQuantidade("");
      setTipo("copa"); // Reseta o valor de tipo para 'copa'
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons
              name="close"
              size={30}
              onPress={() => modalizeRef.current?.close()}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Fazer Pedido</Text>
          <TouchableOpacity onPress={handleCriarPedido}>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Input
            title="Número da comanda"
            labelStyle={styles.label}
            value={comanda}
            onChangeText={setComanda}
          />
          <Input
            title="Item"
            labelStyle={styles.label}
            value={item}
            onChangeText={setItem}
          />
          <Input
            title="Quantidade"
            labelStyle={styles.label}
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <View style={styles.boxMid}>
          <Text style={styles.label}>Tipo</Text>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
          >
            <Picker.Item label="Cozinha" value="cozinha" />
            <Picker.Item label="Copa" value="copa" />
          </Picker>
          </View>
        </View>
      </View>
    );
  };

  return (
    <AuthContextList.Provider value={{ onOpen }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        modalStyle={{ height: Dimensions.get("window").height / 1.8 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const useAuth = () => useContext(AuthContextList);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  input:{
    height:'100%',
    width:'90%',
    borderRadius:40,
    paddingLeft:5   
},
boxMid:{
  backgroundColor:themas.colors.branco,
  height:Dimensions.get('window').height/4,
  width:'100%',
  paddingHorizontal:37
},
});
