import { 
    CONNECTED,
    BLE_STATE_CHANGE,
    BLE_AVAILABLE_DEVICE,
    BLE_SCAN,
    CLEAR_AVAILABlE_DEVICES,
    DEVICE_CONNECTING,
    DEVICE_DISCONNECTED,
    DEVICE_CONNECTED 
} from './Type'

const initialState = {
    connecting: false,
    connectingDeviceId: '',
    connected: false,
    connectedDevice: {},
    availableDevices: [],
    bleState: '',
    scanning: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CONNECTED: return {
            ...state,
            
        }
        case BLE_STATE_CHANGE: return {
            ...state,
            bleState: action.state
        }
        case BLE_SCAN: return {
            ...state,
            scanning: action.scanning
        }
        case BLE_AVAILABLE_DEVICE: return {
            ...state,
            availableDevices: action.availableDevices
        }
        case CLEAR_AVAILABlE_DEVICES: return {
            ...state,
            availableDevices: []
        }
        case DEVICE_DISCONNECTED: return {
            ...state,
            connected: false,
            connectedDevice: {}
        }
        case DEVICE_CONNECTED: return {
            ...state,
            connected: true,
            connectedDevice: action.connectedDevice
        }
        case DEVICE_CONNECTING: return{
            ...state,
            connecting: action.connecting,
            connectingDeviceId: action.deviceId
        }
        case "SENSORDATA": return {
            ...state,
            temperature: action.temperature,
            humidity: action.humidity,
            pressure: action.pressure,
            altitude: action.altitude
        }

        default : return state
    }
}