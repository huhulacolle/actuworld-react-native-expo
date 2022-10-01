import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from './News';
import Favoris from './Favoris';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Settings from './Settings';

export default function Home({navigation}: any) {

  const Drawer = createDrawerNavigator();

  return (
  <Drawer.Navigator initialRouteName="News" >
    <Drawer.Screen name="News" component={News} options={{
          headerRight: () => (
            <TouchableOpacity  onPress={() => navigation.navigate("Search")}>
              <Ionicons name="search-outline" size={25} color="black" style={{ marginRight: 20 }} />
            </TouchableOpacity>
          )
    }} />
    <Drawer.Screen name='Favoris' component={Favoris} />
    <Drawer.Screen name='Paramètre' component={Settings} />
  </Drawer.Navigator>
  );
}
