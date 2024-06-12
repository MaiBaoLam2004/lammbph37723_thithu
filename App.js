import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screen/Home';
import Wellcome from './Screen/Wellcome';
import AddProduct from './Screen/AddProduct';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">
        <Stack.Screen name="Wellcome" component={Wellcome} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Danh sách người dùng'}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={({route}) => ({
            title:
              route.params && route.params.user
                ? 'Sửa sản phẩm'
                : 'Thêm sản phẩm',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
