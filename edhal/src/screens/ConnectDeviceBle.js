import React, { Component } from 'react'
import {    
    Text, 
    View, 
    StyleSheet, 
    Image, 
    BackHandler, 
    PermissionsAndroid, 
    TouchableOpacity,
    Animated,
    Easing,
    LogBox 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    getBleState, 
    getAvailableDevices,
    clearScan 
} from '../BleStore/BleActions'
import ButtonSmall from '../components/ButtonSmall'
import ListBleDevice from '../components/ListBleDevice'

class ConnectDeviceBle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialScan: false
        }

        this.spinValue = new Animated.Value(0)
    }

    // spin animaton for search
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
        // prevent pressing back button
        this.preventBackListner = this.props.navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault()
            BackHandler.exitApp()
        })

        // check permissin for location
        this.checkPermissionLocation()

        // start initial scan 
        if(this.props.Ble.bleState == 'PoweredOn' && this.props.Ble.scanning == false && this.state.initialScan == false){
            this.props.getAvailableDevices()
            this.setState({
                initialScan: true
            })
        }

        LogBox.ignoreLogs(['Animated: `useNativeDriver`'])

        // start spin 
        this.spin()
    }

    componentWillUnmount = () => {
        this.preventBackListner()
    }

    // check if permission for location is granted
    checkPermissionLocation = async () => {
        try {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === false) {
                this.requestPermissionLocation()
            }
        } catch (err) {
            console.warn(err)
        }
    }

    // request permission for location
    requestPermissionLocation = async () => {
        try{
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            }else{
                this.checkPermissionLocation()
            } 
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidUpdate = () => {

        // start initial scan
        if(this.props.Ble.bleState == 'PoweredOn' && this.props.Ble.scanning == false && this.state.initialScan == false){
            this.props.getAvailableDevices()
            this.setState({
                initialScan: true
            })
        }

    }

    onPressRefresh = () => {
        this.props.clearScan()
        this.props.getAvailableDevices()
    }

    // render list of available bluetooth devices
    renderAvailableDevices = () => {
        if(this.props.Ble.availableDevices.length > 0){
            return this.props.Ble.availableDevices.map((element, key)=>(
                <ListBleDevice name={element.name} id={element.id} key={key}/>
            ))
        }
    }
    
    // on press next button
    onPressNext = () => {
        this.props.navigation.navigate('DeviceConfig')
    }

    render() {

        // spin for searching image
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <SafeAreaView style={styles.container}>

                <View>
                    <Text style={styles.heading}>Lets get you started</Text>
                </View>

                {this.props.Ble.bleState != 'PoweredOn' &&
                    <View style={styles.enableBleSection}>
                        <Text style={styles.enableBleSectionText}>
                            Turn your Bluetooth on, to
                            connect your controller
                        </Text>
                    </View>
                }

                {this.props.Ble.availableDevices.length > 0 &&
                    <View style={styles.availableControllers}>
                        <Text style={styles.availableControllersText}>Available Controllers</Text>
                        {this.renderAvailableDevices()}
                    </View>
                }

                {this.props.Ble.bleState == 'PoweredOn' && 
                    <View style={styles.searchSection}>
                        {this.props.Ble.scanning == true &&
                            <View style={styles.searching}>
                                <Animated.Image source={require('../assets/images/loading.png')} style={{transform: [{rotate: spin}], marginRight: 20}} width={20} height={20}/>
                                <Text style={styles.searchText}>Searching</Text>
                            </View>
                        }
                        {this.props.Ble.scanning == false &&
                            <TouchableOpacity style={styles.refresh} onPress={this.onPressRefresh}>
                                <Image source={require('../assets/images/refresh.png')} style={{marginRight: 10}} width={20} height={20} />
                                <Text style={styles.refreshText}>Refresh</Text>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {!this.props.Ble.connected &&
                    <View style={styles.nextButton}>
                        <ButtonSmall text={"NEXT >"} enabled={false}/>
                    </View>
                }
                {this.props.Ble.connected &&
                    <View style={styles.nextButton}>
                        <ButtonSmall text={"NEXT >"} enabled={true} onPress={this.onPressNext}/>
                    </View>
                }

            </SafeAreaView>
        )
    }
} 

ConnectDeviceBle.propTypes = {
    getBleState: PropTypes.func.isRequired,
    getAvailableDevices: PropTypes.func.isRequired,
    clearScan: PropTypes.func.isRequired,
    Ble: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    Ble: state.Ble
})

export default connect(mapStateToProps, { getBleState, getAvailableDevices, clearScan })(ConnectDeviceBle)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 48,
        color: '#292929',
        paddingTop: 0,
        marginLeft: -5
    },
    enableBleSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enableBleSectionText: {
        textAlign: 'center',
        color: '#FA6B6B',
        fontSize: 22
    },
    nextButton: {
        alignItems: 'flex-end',
    },
    searchSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searching: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        color: '#4BB69E',
        fontSize: 25
    },
    refreshText: {
        color: '#B9B9B9',
        fontSize: 20
    },
    searchingImg: {
        marginRight: 10
    },
    refresh: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    availableControllers: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll'
    },
    availableControllersText: {
        color: '#6F7474',
        fontSize: 20,
        marginLeft: 0
    }
})