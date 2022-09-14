import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { ExecuteQuery, getFavoris } from '../services/Database'

export default function Favoris() {

  async function testfavoris() {
    const test = await ExecuteQuery('SELECT * FROM favoris', []);
    console.log(test.rows);
  }

  return (
    <View>
      <Button onPress={testfavoris}>test get </Button>
      <Text>Favoris en construction</Text>
    </View>
  )
}