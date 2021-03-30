import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class ButtonSmall extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buttonText: this.props.text
    };
  }

  render() {
    if(this.props.enabled){
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Text style={styles.buttonText}>
                    {this.state.buttonText}
                </Text>
            </TouchableOpacity>
        )
    }else{
        return (
            <View style={[styles.button, {borderColor: '#CBCBCB'}]}>
                <Text style={[styles.buttonText, {color: '#CBCBCB'}]}>
                    {this.state.buttonText}
                </Text>
            </View>
        )
    }
  }
}


const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'orange'
    },
    buttonText: {
        color: 'orange',
        fontSize: 22,
    }
})