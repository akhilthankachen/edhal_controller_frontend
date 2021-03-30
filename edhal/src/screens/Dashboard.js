import React, { Component } from 'react'
import { 
    View, 
    Text 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
                <View style={{ width: '100%', height: 270, backgroundColor: "#1FC4C4"}}>
          <Text style={{color: "white",         
            "fontFamily": "Roboto",
            "fontWeight": "400",
            "fontSize": 20,
            marginLeft: 30,
            marginTop: 30
            }}>
              EDHAL-336647
          </Text>
          <Icon name = "cell-wifi" size= {20} color ="white" style={{position: 'absolute', right: 30, top: 30}}/>
          <Text style = {
            {
              "fontFamily": "Open Sans",
              "fontWeight": "100",
              "fontSize": 50,
              "letterSpacing": 0.2,
              "color": "rgba(255, 255, 255, 255)",
              marginLeft: 30,
              marginTop: 20
            }
          } >{this.props.ble.temperature}° C - {this.props.ble.humidity}%</Text>
          <Text style = {
          {
            "fontFamily": "Open Sans",
            "fontWeight": "300",
            "fontSize": 18,
            "letterSpacing": 0.2,
            "color": "rgba(255, 255, 255, 255)",
            marginLeft: 30
          }
          } >Temperature             Humidity</Text>
          <Text style = {
          {
            "fontFamily": "Open Sans",
            "fontWeight": "300",
            "fontSize": 21,
            "letterSpacing": 0.2,
            "color": "rgba(255, 255, 255, 255)",
            "marginStart": 9.62,
            marginTop: 10,
            marginLeft: 30
          }
        } >Air pressure - {this.props.ble.pressure} Pa</Text>
          <Text style = {
          {
            "fontFamily": "Open Sans",
            "fontWeight": "300",
            "fontSize": 20,
            "letterSpacing": 0.2,
            "color": "rgba(255, 255, 255, 255)",
            "marginStart": 9.62,
            marginTop: 10,
            marginLeft: 30
          }
        } >Soil Moisture - 45%</Text>
        </View>
      </SafeAreaView>
    );
  }
}
