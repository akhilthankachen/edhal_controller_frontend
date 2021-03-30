import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// reducers
import BleReducer from './BleStore/BleReducer'
import DevicesReducer from './DevicesStore/DevicesReducer'

const rootReducer=combineReducers({
    Ble: BleReducer,
    Devices: DevicesReducer
  })
  
const middleware = [thunk]

export default store = createStore(
    rootReducer,     
    compose (
    applyMiddleware(...middleware),
    )
)