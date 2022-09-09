import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from './News';
import Favoris from './Favoris';

export default function Home() {

  const Drawer = createDrawerNavigator();

  return (
  <Drawer.Navigator initialRouteName="News">
    <Drawer.Screen name="News" component={News} />
    <Drawer.Screen name='Favoris' component={Favoris} />
  </Drawer.Navigator>
  );
}