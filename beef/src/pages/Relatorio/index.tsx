import React from "react";
import { Text, View, Image } from 'react-native'
import { styles } from "./style";
import Logo from "../../assets/logo_3.png";

export default function Relatorio(){
    return (
        <View style={styles.container}>
    <View style={styles.header}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
    </View>
    </View>
  );
};
