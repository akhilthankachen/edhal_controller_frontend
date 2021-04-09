import React, { Component } from 'react'
import { 
    View, 
    Text,
    StyleSheet 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 

// actions
import { getSensorData } from '../BleStore/BleActions'
import ButtonFullWidth from '../components/ButtonFullWidth'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.currentDevice = {}

    this.props.Devices.devices.map((value)=>{
      if(value.id === this.props.Ble.connectedDevice.id){
        this.currentDevice = value
      }
    })


  }

  componentDidMount = () => {
    // get sensor data now
    this.props.getSensorData()
    // get sensor data every 5 seconds
    this.getSensorData = setInterval(()=>{
      this.props.getSensorData()
    }, 5000)

    // remove any subscription or interval when focus changes
    this.backBehaviour = this.props.navigation.addListener('beforeRemove', (e)=>{
      clearInterval(this.getSensorData)
    })
  }

  componentWillUnmount = () => {
    clearInterval(this.getSensorData)
    this.backBehaviour()
  }

  onPressAddPeripheral = () => {
    this.props.navigation.navigate("AddPeripheral")
  }

  render() {

    

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>

          <Text style={styles.deviceName}>
              {this.currentDevice.deviceName}
          </Text>

          <Icon 
            name = "cell-wifi" 
            size= {20} 
            color ="white" 
            style={{position: 'absolute', right: 30, top: 30}}
          />

          <Text style = {styles.tempHumidityData} >{this.props.Ble.sensorData.temperature}° C - {this.props.Ble.sensorData.humidity}%</Text>
          
          <Text style = {styles.tempHumidityText} >Temperature             Humidity</Text>
          
          <Text style = {styles.airPressure} >Air pressure - {this.props.Ble.sensorData.pressure} Pa</Text>

        </View>
        <View style={styles.peripheralsContainer}>
          <ButtonFullWidth text={"+ Add Peripheral"} enabled={true} onPress={this.onPressAddPeripheral}/>
        </View>
      </SafeAreaView>
    );
  }
}

Dashboard.propTypes = {
  getSensorData: PropTypes.func.isRequired,
  Devices: PropTypes.object.isRequired,
  Ble: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  Devices: state.Devices,
  Ble: state.Ble
})

export default connect(mapStateToProps, { getSensorData })(Dashboard)

const styles = StyleSheet.create({
  container : {
      flex: 1,
  },
  infoContainer: {
      width: '100%', 
      height: 250, 
      backgroundColor: "#1FC4C4",
      padding: 30
  },
  deviceName: {
    color: "white",         
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 20,
  },
  tempHumidityData: {
    fontFamily: "Open Sans",
    fontWeight: "100",
    fontSize: 50,
    letterSpacing: 0.2,
    color: "rgba(255, 255, 255, 255)",
    marginTop: 30
  },
  tempHumidityText: {
    fontFamily: "Open Sans",
    fontWeight: "300",
    fontSize: 18,
    letterSpacing: 0.2,
    color: "rgba(255, 255, 255, 255)",
  },
  airPressure: {
    fontFamily: "Open Sans",
    fontWeight: "300",
    fontSize: 21,
    letterSpacing: 0.2,
    color: "rgba(255, 255, 255, 255)",
    marginTop: 10,
  },
  peripheralsContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white'
  }
})