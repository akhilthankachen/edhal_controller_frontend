import { BLE_STATE_CHANGE } from './Type'
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'

var manager = new BleManager()

export const getBleState = ()=>(dispatch,getState)=>{
    const subscription = manager.onStateChange((state) => {
        dispatch({
            type: BLE_STATE_CHANGE,
            state: state
        })
        // only remove subscription when ble powered on
        if (state === 'PoweredOn') {
            subscription.remove();
        }
    }, true);
}