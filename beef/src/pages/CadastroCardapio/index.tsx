import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

export default function CadastroItem() {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState(""); 
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleCadastro = async () => {
        if (!descricao || !valor || !tipo) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/cardapio", {
                descricao,
                valor: parseFloat(valor),
                tipo,
            });

            if (response.status === 200) {
                setFeedback("Item cadastrado com sucesso!");
                setDescricao("");
                setValor("");
                setTipo("");
            } else {
                setFeedback("Erro ao cadastrar item. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            setFeedback("Erro ao cadastrar item. Verifique os dados e tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Item</Text>

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
            />

            <Text style={styles.label}>Tipo</Text>
            <Picker
                selectedValue={tipo}
                style={styles.picker}
                onValueChange={(itemValue) => setTipo(itemValue)}
            >
                <Picker.Item label="Selecione o tipo" value="" />
                <Picker.Item label="Entradas" value="Entradas" />
                <Picker.Item label="Bebidas" value="Bebidas" />
                <Picker.Item label="Sobremesa" value="Sobremesa" />
                <Picker.Item label="Prato Principal" value="Prato Principal" />
            </Picker>

            <Button title="Cadastrar Item" onPress={handleCadastro} />

            {feedback && <Text style={styles.feedback}>{feedback}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    label: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
    },
    picker: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    feedback: {
        marginTop: 15,
        color: "green",
        fontWeight: "bold",
    },
});
