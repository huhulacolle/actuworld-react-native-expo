import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import INews from '../interfaces/INews'

export default function SelectedNews({route, navigation}: any) {

  const News: INews = route.params;

  useEffect(() => {
    navigation.setOptions({ title: News.source });
  })
  
  return (
    <View>
      <Text>SelectedNews</Text>
    </View>
  )
}