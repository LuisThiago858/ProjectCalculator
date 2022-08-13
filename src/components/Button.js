import React from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width / 4, //dimensions está sendo usado para pegar o tamanho da tela e dividir por 4 para criar um botão de tamanho igual ao da tela
        width: Dimensions.get('window').width /4, //dimensions está sendo usado para pegar o tamanho da tela e dividir por 4 para criar um botão de tamanho igual ao da tela
        padding: 20,
        backgroundColor: '#f0f0f5',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    buttonDouble:{
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple:{
        width: (Dimensions.get('window').width / 4) * 3,
    }

});

export default props =>{
    const stylesButton =[styles.button]
    if(props.double) stylesButton.push(styles.buttonDouble)
    if(props.triple) stylesButton.push(styles.buttonTriple)
    if(props.operation) stylesButton.push(styles.operationButton)
    return(
        <TouchableHighlight onPress={()=>props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}

//TouchableHighlight é um componente que permite que o usuário clique em um botão e execute uma ação.