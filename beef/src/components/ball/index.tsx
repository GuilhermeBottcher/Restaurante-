import React from "react";
import {style} from "./style"
import { View } from 'react-native';
import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

type Props = {
    color:string
}

export function Ball({...rest} :Props){
    return(
        <View style={[style.ball,{borderColor:rest.color?rest.color:themas.colors.gray}]}/>
    )
}