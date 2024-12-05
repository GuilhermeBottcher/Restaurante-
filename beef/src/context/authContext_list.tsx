import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Input } from "../components/input";
import axios from 'axios';

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
        Alert.alert('Sucesso', 'Pedido criado com sucesso!');
        modalizeRef.current?.close();
      } else {
        Alert.alert('Erro', 'Falha ao criar pedido');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar criar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onOpen();
  }, []);

  const _container = () => {
    const [item, setItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipo, setTipo] = useState('');

    const handleCriarPedido = () => {
      if (!item || !quantidade || !tipo) {
        return Alert.alert('Atenção', 'Todos os campos são obrigatórios');
      }

      const pedidoData = {
        id_comanda: 1, // Supondo que você tenha uma comanda disponível
        cod_item: parseInt(item),
        quantidade: parseInt(quantidade),
        tipo: tipo === 'copa' ? false : true, // Definindo tipo de pedido (true = cozinha, false = copa)
        status: false // Status inicial do pedido (pendente)
      };

      criarPedido(pedidoData);
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name='close' size={30} onPress={() => modalizeRef.current?.close()} />
          </TouchableOpacity>
          <Text style={styles.title}>Fazer Pedido</Text>
          <TouchableOpacity onPress={handleCriarPedido}>
            <AntDesign name='check' size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
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
            keyboardType="numeric"
          />
          <Input
            title="Tipo"
            labelStyle={styles.label}
            value={tipo}
            onChangeText={setTipo}
            placeholder="copa/cozinha"
          />
        </View>
      </View>
    );
  };

  return (
    <AuthContextList.Provider value={{ onOpen }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        modalStyle={{ height: Dimensions.get('window').height / 1.8 }}
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
    width: '100%',
    height: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    width: '100%',
    paddingHorizontal: 20
  },
  label: {
    fontWeight: 'bold',
    color: '#000'
  }
});
