import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

export default class SelectPheripheral extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Select Peripheral</Text>
        <Text style={styles.headingSubText}>Select the peripheral which you want to wire</Text>

        <View style={styles.optionBox}>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    heading: {
        color: 'black',
        fontSize: 25
    },
    headingSubText: {
        marginTop: 10,
        color: '#A09E9E'
    },
    optionBox: {
        
    }
})