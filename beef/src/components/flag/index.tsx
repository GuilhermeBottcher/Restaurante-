import React from "react";
import {style} from "./style"
import { View, TouchableOpacity, Text} from 'react-native';

type Props = {
    color:string,
    caption:string
}

export function Flag({...rest} :Props){
    return(
      <TouchableOpacity style={[style.container,{backgroundColor:rest?.color}]}>
        <Text style={style.tmtext}>{rest.caption}</Text>
      </TouchableOpacity>
    )
}