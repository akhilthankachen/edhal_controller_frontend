import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Animated,
    Easing,
    Image 
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    connectDevice
} from '../BleStore/BleActions'

class ListBleDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            id: this.props.id,
        };

        this.spinValue = new Animated.Value(0)
    }

    // spin animaton for connecting
    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
            
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.linear,
            
            }
        ).start(() => this.spin())
    }

    componentDidMount = () => {
        // start spin
        this.spin()
    }

    onPress = () => {
        this.setState({
            connecting: true
        })
        // connect device
        this.props.connectDevice(this.state.id)
    }

    render() {

        // spin for connecting image
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        // made not clickable while connecting
        if(this.props.Ble.connecting === true && this.props.Ble.connectingDeviceId === this.state.id){
            return (
                <View style={styles.container}>
                    <Text style={styles.deviceName}>{this.state.name}</Text>
                    <View style={styles.connecting}>
                        <Animated.Image source={require('../assets/images/loading.png')} style={{transform: [{rotate: spin}], marginRight: 10}} width={12} height={12}/>
                        <Text style={styles.connectingText}>Connecting</Text>
                    </View>
                </View>
            )
        }else if(this.props.Ble.connected === true && this.props.Ble.connectedDevice.id === this.state.id){
            return (
                <View style={styles.container}>
                    <Text style={styles.deviceName}>{this.state.name}</Text>
                    <View style={styles.connecting}>
                        <Image source={require('../assets/images/connected.png')} style={{marginRight: 10}} width={12} height={12}/>
                        <Text style={styles.connectedText}>Connected</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <TouchableOpacity style={styles.container} onPress={this.onPress}>
                    <Text style={styles.deviceName}>{this.state.name}</Text>
                    <Text style={styles.subText}>Tap to connect </Text>
                </TouchableOpacity>
            )
        }
    }
}

ListBleDevice.propTypes = {
    connectDevice: PropTypes.func.isRequired,
    Ble: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    Ble: state.Ble
})

export default connect(mapStateToProps, { connectDevice })(ListBleDevice)

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginTop: 15,
        justifyContent: 'space-between',
    },
    deviceName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2E2D2D'
    },
    subText: {
        color: '#646464'
    },
    connecting: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    connectingText: {
        color: '#4BB69E'
    },
    connectedText: {
        color: '#1FC4C4'
    }
})