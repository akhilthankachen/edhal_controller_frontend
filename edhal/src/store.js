import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// reducers
import BleReducer from './BleStore/BleReducer'

const rootReducer=combineReducers({
    Ble: BleReducer
  })
  
const middleware = [thunk]

export default store = createStore(
    rootReducer,     
    compose (
    applyMiddleware(...middleware),
    )
)