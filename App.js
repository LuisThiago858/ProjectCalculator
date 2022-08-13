import React, { Component } from 'react';
import { Platform, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';


const initialState ={ // estado inicial do display value
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}
export default class App extends Component {
  state = { //state é um objeto que permite que o componente seja atualizado sempre que o valor for alterado
    ...initialState //faz um clone desse objeto
  }

  addDigit = n =>{
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay // impede de colocar mais 0 antes de um numero

    console.debug(typeof this.state.displayValue)
    if (n === '.' && !clearDisplay 
      && this.state.displayValue.includes('.')){
      return //impede o operador de colocar mais ponto na sequencia de numeros
    }
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })


    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({values})
    }
  }

  clearMemory = ()=>{
    this.setState({...initialState})
  }
  setOperation = operation =>{
    if(this.state.current ===0){
      this.setState({operation, current:1, clearDisplay: true})
    }else{
      const equals = operation ==='='
      const values = [...this.state.values]
      try {
        values[0]=
            eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e){
          //retorna o mesmo valor
          values[0]=this.state.values[0]
      }
      values[1]=0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values, //propriedade do ecmascript 5 que faz basicamente values:values,
      })
    }
  }


  render() {
    return (
      
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory}/>
          <Button label="/" operation onClick={this.setOperation}/>
          <Button label="7" onClick={this.addDigit}/>
          <Button label="8" onClick={this.addDigit}/>
          <Button label="9" onClick={this.addDigit}/>
          <Button label="*" operation onClick={this.setOperation}/>
          <Button label="4" onClick={this.addDigit}/>
          <Button label="5" onClick={this.addDigit}/>
          <Button label="6" onClick={this.addDigit}/>
          <Button label="-" operation onClick={this.setOperation}/>
          <Button label="1" onClick={this.addDigit}/>
          <Button label="2" onClick={this.addDigit}/>
          <Button label="3" onClick={this.addDigit}/>
          <Button label="+" operation onClick={this.setOperation}/>
          <Button label="0" double onClick={this.addDigit}/>
          <Button label="." onClick={this.addDigit}/>
          <Button label="=" operation onClick={this.setOperation}/>
        </View>
      </View>
    );
  }
}
//<Button label="*" operation onClick={()=> this.setOperation('*')}/>
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  }
});
