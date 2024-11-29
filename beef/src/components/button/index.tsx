import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableHighlightProps} from 'react-native';
import {style} from "./style"

type Props = TouchableHighlightProps & {
    text:string,
    loading?:Boolean,
}

export function Button({...rest} :Props){
    return(
        <TouchableOpacity style={style.button} {...rest} activeOpacity={0.6}>
            {rest.loading?<ActivityIndicator/>:<Text style={style.textButton}>{rest.text}</Text>}
        </TouchableOpacity>

    )
}