import { 
    ADD_NEW_DEVICE
} from './Type'

export const addNewDevice = (device) => (dispatch, getState) => {
    // add new device to the devices array
    var devices = getState().Devices.devices
    devices.push(device)

    dispatch({
        type: ADD_NEW_DEVICE,
        devices: devices
    })
}