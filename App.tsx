import 'react-native-gesture-handler';
import SelectedNews from './composents/SelectedNews';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './composents/Home';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='SelectedNews' component={SelectedNews} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}