import React, { useContext } from "react";
import {TouchableOpacity, View } from 'react-native'
import { style } from "./style";
import { FontAwesome, Entypo} from '@expo/vector-icons'
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";


export default({state, navigation})=>{

    const {onOpen} = useContext<any>(AuthContextList)
    const go = (screenName:string)=>{
        navigation.navigate(screenName)
    }
    return(
        <View style={style.tabArea}>
            <TouchableOpacity style={style.tabItem} onPress={()=>go("Inicial")}>
                <FontAwesome
                    name="home"
                    style={{opacity:state.index === 0?1:0.6, color:themas.colors.preto, fontSize:35}}
                />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItemButton} onPress={()=>onOpen()}>
                    <Entypo
                    name="plus"
                    style={{fontSize:40}}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItem} onPress={()=>go("Geral")}>
            <FontAwesome
                    name="search"
                    style={{opacity:state.index === 1?1:0.6, color:themas.colors.preto, fontSize:35}}
                />
            </TouchableOpacity>
        </View>
    )
}