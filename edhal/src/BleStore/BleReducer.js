import { 
    CONNECTED,
    BLE_STATE_CHANGE 
} from './Type'

const initialState = {
    connectedId: '',
    bleState: ''
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