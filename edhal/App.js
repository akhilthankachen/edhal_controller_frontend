import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store'

// screens
import ConnectDeviceBle from './src/screens/ConnectDeviceBle';
import SplashScreen from './src/screens/SplashScreen';
import DeviceConfig from './src/screens/DeviceConfig';
import Dashboard from './src/screens/Dashboard';
import SelectPheripheral from './src/screens/SelectPheripheral';

// custom header
import CustomHeaderAddPeripheral from './src/components/CustomHeaderAddPeripheral'

// navigators
const rootStack = createStackNavigator()
const peripheralStack = createStackNavigator()

function AddPeripheral() {
  return(
    <peripheralStack.Navigator>
      <peripheralStack.Screen
        name="SelectPeripheral"
        component={SelectPheripheral}
        options={{
          headerShown: false
        }}
      />
    </peripheralStack.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <rootStack.Navigator initialRouteName={"SplashScreen"}>
            <rootStack.Screen 
              name="SplashScreen" 
              component={SplashScreen} 
              options={{
                headerShown: false
              }}
            />
            <rootStack.Screen 
              name="ConnectDeviceBle" 
              component={ConnectDeviceBle} 
              options={{
                headerShown: false
              }}
            />
            <rootStack.Screen 
              name="DeviceConfig" 
              component={DeviceConfig} 
              options={{
                headerShown: false
              }}
            />
            <rootStack.Screen 
              name="Dashboard" 
              component={Dashboard} 
              options={{
                headerShown: false
              }}
            />
            <rootStack.Screen
              name="AddPeripheral"
              component={AddPeripheral}
              options={{
                header: ({ scene, previous, navigation }) => {
                  return (
                    <CustomHeaderAddPeripheral navigation={navigation}/>
                  )
                }
              }}
            />
          </rootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
