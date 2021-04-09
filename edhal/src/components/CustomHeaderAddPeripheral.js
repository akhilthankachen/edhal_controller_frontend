import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Touchable,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class CustomHeaderAddPeripheral extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPressBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onPressBack}>
            <Icon 
              name = "arrow-back-ios" 
              size= {20} 
              color ="#646464" 
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
          <Text style={styles.topBarText}>ADD PERIPHERAL</Text>
        </View>
        
        <View style={styles.nameBox}>
          <TextInput
            style={styles.name}
            defaultValue={"Pump 1"}
            autoCapitalize='words'
          />
          <Text style={styles.nameSubText}>Tap to change name</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progress, {width: 50}]}></View>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 170,
    width: '100%',
    backgroundColor: '#E7EDED',
    padding: 30
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarText: {
    color: '#646464',
    fontSize: 20,
    fontWeight: 'bold'
  },
  nameBox:{
    marginTop: 15
  },
  name: {
    padding: 0,
    fontSize: 30,
    color: '#135757'
  },
  nameSubText: {
    marginTop: 5,
    color: '#959595'
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#D2FCFC',
    height: 5,
    width: Dimensions.get('window').width
  },
  progress: {
    height: 5,
    backgroundColor: '#1FC4C4'
  }
})