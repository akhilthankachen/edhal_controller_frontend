import { 
     ADD_NEW_DEVICE
} from './Type'

const initialState = {
    farmTypes: ['Paddy Field','Hydroponics', 'Aquaponics', 'Drip Irrigation'],
    devices: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_NEW_DEVICE: return {
            ...state,
            devices: action.devices
        }
        default : return state
    }
}