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

// navigators
const rootStack = createStackNavigator()


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
          </rootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
