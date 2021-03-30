import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonSmall from '../components/ButtonSmall'
import ModalDropdown from 'react-native-modal-dropdown'

// import actions
import {addNewDevice} from '../DevicesStore/DevicesActions'

class DeviceConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            farmType: -1,
            deviceName: ''
        }
    }

    onSelectFarmType = (value) => {
        if(this.state.deviceName != ''){
            this.setState({
                farmType: value,
                ready: true
            })
        }else{
            this.setState({
                farmType: value
            })
        }
    }

    onChangeDeviceName = (text) => {
        if(this.state.farmType != -1){
            this.setState({
                deviceName: text,
                ready: true
            })
        }else{
            this.setState({
                deviceName: text
            })
        }
    }

    onPressNext = () => {
        var deviceJson = {
            id: this.props.Ble.connectedDevice.id,
            name: this.props.Ble.connectedDevice.name,
            deviceName: this.state.deviceName,
            farmType: this.state.farmType
        }

        this.props.addNewDevice(deviceJson)
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (
        <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.heading}>Device configuration</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>ENTER DEVICE NAME</Text>
                        <TextInput 
                            style={styles.nameInput} 
                            placeholder={this.props.Ble.connectedDevice.name}
                            onChangeText={this.onChangeDeviceName}
                            value={this.state.deviceName}
                        />
                        <Text style={styles.subText}>Tap to change </Text>
                    </View>
                    <View style={styles.farmType}>
                        <Text style={styles.name}>SELECT FARM TYPE</Text>
                        <ModalDropdown 
                            options={this.props.Devices.farmTypes}
                            style={styles.dropDown}
                            textStyle={styles.dropDownText}
                            defaultValue="Please Select"
                            defaultTextStyle={styles.dropDownDefaultText}
                            dropdownStyle={styles.dropDownDrop}
                            dropdownTextStyle={styles.dropDownDropText}
                            onSelect={this.onSelectFarmType}
                        />
                        <Text style={styles.subText}>Tap to change</Text>
                    </View>
                </View>

                {!this.state.ready &&
                    <View style={styles.nextButton}>
                        <ButtonSmall text={"NEXT >"} enabled={false}/>
                    </View>
                }
                {this.state.ready &&
                    <View style={styles.nextButton}>
                        <ButtonSmall text={"NEXT >"} enabled={true} onPress={this.onPressNext}/>
                    </View>
                }
            
        </SafeAreaView>
        )
    }
}

DeviceConfig.propTypes = {
    Ble: PropTypes.object.isRequired,
    Devices: PropTypes.object.isRequired,
    addNewDevice: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    Ble: state.Ble,
    Devices: state.Devices
})

export default connect(mapStateToProps, {addNewDevice})(DeviceConfig)


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
    content: {
        flex: 1,
        marginTop: 40
    },
    nextButton: {
        alignItems: 'flex-end',
    },
    name: {
        color: '#1FC4C4'
    },
    nameInput: {
        width: '70%',
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    subText: {
        color: '#646464',
        marginTop: 5
    },
    farmType: {
       marginTop: 40 
    },
    dropDown: {
        borderBottomWidth: 1,
        width: '70%',
        padding: 5
    },
    dropDownText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    dropDownDefaultText: {
        color: '#A8A7A7'
    },
    dropDownDrop: {
        width: '50%'
    },
    dropDownDropText: {
        color: 'black',
        fontSize: 15,
    }
})