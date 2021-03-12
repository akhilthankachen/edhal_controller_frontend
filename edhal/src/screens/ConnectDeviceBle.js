import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBleState } from '../BleStore/BleActions'
import ButtonSmall from '../components/ButtonSmall'

class ConnectDeviceBle extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props.Ble.bleState)
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.heading}>Lets get you started</Text>
                </View>
                <View style={styles.enableBleSection}>
                    <Text style={styles.enableBleSectionText}>
                        Turn your Bluetooth on, to
                        connect your controller
                    </Text>
                </View>
                <View style={styles.nextButton}>
                    <ButtonSmall text={"NEXT >"} enabled={false}/>
                </View>
            </SafeAreaView>
        )
    }
} 

ConnectDeviceBle.propTypes = {
    getBleState: PropTypes.func.isRequired,
    Ble: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    Ble: state.Ble
})

export default connect(mapStateToProps, { getBleState })(ConnectDeviceBle)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 50,
        color: '#292929',
        paddingTop: 50
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
    }
})