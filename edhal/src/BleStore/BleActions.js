import { 
    BLE_STATE_CHANGE, 
    BLE_AVAILABLE_DEVICE, 
    BLE_SCAN, 
    CLEAR_AVAILABlE_DEVICES,
    DEVICE_CONNECTING,
    DEVICE_CONNECTED,
    DEVICE_DISCONNECTED 
} from './Type'
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'

var manager = new BleManager()

export const getBleState = () => (dispatch,getState) => {
    const subscription = manager.onStateChange((state) => {
        dispatch({
            type: BLE_STATE_CHANGE,
            state: state
        })
        // only remove subscription when ble powered on
        if (state !== 'PoweredOn'){
            const p = manager.enable()
        }
        if (state === 'PoweredOn') {
            subscription.remove();
        }
    }, true);
}

export const getAvailableDevices = () => (dispatch, getState) => {
    dispatch({
        type: BLE_SCAN,
        scanning: true
    })

    manager.startDeviceScan(["2dacf9b8-8f25-4027-bf0e-9c68b319ef9a"], null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log(JSON.stringify(error));
            return
        }

        // add device to available devices
        
        var deviceJson = {
            id: device.id,
            name: device.name
        }

        // check if device already added to available list
        var availableDevices = getState().Ble.availableDevices
        var exists = false
        for(var i = 0; i<availableDevices.length; i++){
            let tempJson = availableDevices[i]
            if(tempJson.name === device.name && tempJson.id === device.id){
                exists = true
            }
        }

        // check if device already connected
        var connectedDevices = getState().Devices.devices
        var connected = false
        for(var i = 0; i<connectedDevices.length; i++){
            let tempJson = connectedDevices[i]
            if(tempJson.name === device.name && tempJson.id === device.id){
                connected = true
            }
        }

        // if does not exists add to the list
        if(!exists && !connected){
            // add device to the available devices
            
            availableDevices.push(deviceJson)

            dispatch({
                type: BLE_AVAILABLE_DEVICE,
                availableDevices: availableDevices
            })
        }
    })

    // stop scan after 10 secnds
    setTimeout(()=>{
        manager.stopDeviceScan()
        dispatch({
            type: BLE_SCAN,
            scanning: false
        })
    }, 5000)
}

export const clearScan = () => (dispatch, getState) =>{
    // cancel connection first
    if(getState().Ble.connected === true){
        manager.cancelDeviceConnection(getState().Ble.connectedDevice.id).then((device)=>{
            dispatch({
                type: DEVICE_DISCONNECTED
            })
        }).catch((error)=>{
            console.warn(error)
            // not connected, so clear the connection
            dispatch({
                type: DEVICE_DISCONNECTED
            })
        })
    }
    dispatch({
        type: CLEAR_AVAILABlE_DEVICES
    })
}

// get charcteristics for each service
getServicesAndCharacteristics = (device) => {
    return new Promise((resolve, reject) => {
        device.services().then(services => {
            const characteristics = []
            services.forEach((service, i) => {
                service.characteristics().then(c => {
                    characteristics.push(c)
                    if (i === services.length - 1) {
                        const temp = characteristics.reduce(
                            (acc, current) => {
                                return [...acc, ...current]
                            },
                            []
                        )
                        const dialog = temp.find(
                            characteristic =>
                                characteristic.isWritableWithoutResponse
                        )
                        if (!dialog) {
                            reject('No writable characteristic')
                        }
                        resolve(dialog)
                    }
                  
                })
            })
        })
    })
}

// async discover all services and characteristics
discoverAllServicesAndCharacteristics = async (device) => {
    // discover
    const services = await device.discoverAllServicesAndCharacteristics()
    const characteristic = await getServicesAndCharacteristics(services)
}

connectToDevice = (deviceId, dispatch) => {
    // switch of scanning
    dispatch({
        type: BLE_SCAN,
        scanning: false
    })

    // connect to a device
    manager.connectToDevice(deviceId)
    .then((device) => {
        return device.discoverAllServicesAndCharacteristics()
    })
    .then((device) => {
        // discover all the services and characteristics
        discoverAllServicesAndCharacteristics(device)
        .catch((error)=>{
            console.log(error)
        })

        // device connected 
        console.log("device connected", deviceId)
        var connectedDevice = {
            name: device.name,
            id: device.id
        }
        dispatch({
            type: DEVICE_CONNECTING,
            connecting: false,
            deviceId: ''
        })
        dispatch({
            type: DEVICE_CONNECTED,
            connectedDevice: connectedDevice
        })
    })
    .catch((error) => {
        // Handle errors
        console.log(error)
    })
}

export const connectDevice = (deviceId) => (dispatch, getState) => {
    // set connecting as true
    dispatch({
        type: DEVICE_CONNECTING,
        connecting: true,
        deviceId: deviceId
    })
    // check whether if already conneceted 
    if(getState().Ble.connected){
        // cancel connection first
        manager.cancelDeviceConnection(getState().Ble.connectedDevice.id).then((device)=>{
            dispatch({
                type: DEVICE_DISCONNECTED
            })
            connectToDevice(deviceId, dispatch)
        }).catch((error)=>{
            // this also means not connected, so clear the connection and reconnect
            dispatch({
                type: DEVICE_DISCONNECTED
            })
            connectToDevice(deviceId, dispatch)
        })
    }else{
        connectToDevice(deviceId, dispatch)
    }
}