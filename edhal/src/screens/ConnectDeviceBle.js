import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, BackHandler } from 'react-native'
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

    componentDidMount = () => {
        // prevent pressing back button
        this.preventBackListner = this.props.navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault()
            BackHandler.exitApp()
        })
    }

    componentWillUnmount = () => {
        this.preventBackListner()
    }

    render() {
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

                {this.props.Ble.bleState == 'PoweredOn' && 
                    <View style={styles.searchSection}>
                        <Image source={require('../assets/images/searching.png')}></Image>
                        <Text style={styles.searchText}>Searching...</Text>
                    </View>
                }
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
    },
    searchSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchText: {
        color: '#6F7474',
        fontSize: 30
    }
})