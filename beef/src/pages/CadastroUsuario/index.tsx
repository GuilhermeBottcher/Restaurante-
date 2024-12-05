import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList } from "react-native";
import axios from "axios";

export default function CadastroUsuario() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [usuarios, setUsuarios] = useState<any[]>([]); 

    const handleCadastro = async () => {
        if (!nome || !email || !senha) {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/usuarios", {
                nome,
                email,
                senha,
            });

            if (response.status === 201) {
                setFeedback("Usuário cadastrado com sucesso!");
                setNome("");
                setEmail("");
                setSenha("");
            } else {
                setFeedback("Erro ao cadastrar usuário. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            setFeedback("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Button title="Cadastrar" onPress={handleCadastro} />

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
    feedback: {
        marginTop: 15,
        color: "green",
        fontWeight: "bold",
    },
    userItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        width: "100%",
    },
    userText: {
        fontSize: 16,
    },
});
