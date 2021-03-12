import React, { Component } from 'react';
import { Image, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux'
import { getBleState } from '../BleStore/BleActions'
import PropTypes from 'prop-types' 

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.props.getBleState()
    }

    componentDidMount = ()=>{
        setTimeout(() => { this.props.navigation.navigate("ConnectDeviceBle")}, 500)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image 
                    source={require('../assets/images/logo.png')} 
                    style={styles.logo} 
                    width={150} 
                    height={200}
                >
                </Image>
            </SafeAreaView>
        );
    }
}

SplashScreen.propTypes = {
    getBleState: PropTypes.func.isRequired,
}

export default connect(null, { getBleState })(SplashScreen)

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

})