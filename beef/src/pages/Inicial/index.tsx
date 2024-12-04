import React from "react";
import { Text, View, Image } from 'react-native'
import { style } from "./style";
import Logo from '../../assets/logo_3.png';

export default function Inicial(){
    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={Logo}
                style={style.logo}
                resizeMode="contain"/>
            </View>
            <View>
                
            </View>
        </View>
)}