import React, {forwardRef, Fragment, LegacyRef} from "react";
import {View, Text, TextInput, TextInputProps, TouchableOpacity, TextStyle, StyleProp} from 'react-native';
import {FontAwesome, MaterialIcons, Octicons} from '@expo/vector-icons'
import {style} from "./style"
import { themas } from "../../global/themes";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;


type Props = TextInputProps & {
    IconRigth?: IconComponent,
    IconRigthName?: string,
    title?: string,
    onIconRigthPress?:()=> void,
    heigth?:number,
    labelStyle?:StyleProp<TextStyle>
}


export const Input = forwardRef((Props:Props,ref: LegacyRef <TextInput> | null)=>{
    const {IconRigth, IconRigthName, title, onIconRigthPress,labelStyle, ...rest} = Props

    return (
        <Fragment>
            <Text style={[style.titleInput,labelStyle]}>{title}</Text>
            <View style={style.boxInput}>
                <TextInput
                    style={style.input}
                    {...rest}     
                />
                {IconRigth && IconRigthName && (
                    <TouchableOpacity onPress={onIconRigthPress}>
                        <IconRigth name= {IconRigthName as any} size={20} color={themas.colors.gray}/>
                    </TouchableOpacity>
                    )}
            </View>
        </Fragment>
    )
})