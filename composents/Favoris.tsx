import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Paragraph, Title } from 'react-native-paper'
import { ExecuteQuery } from '../services/Database'
import nSQL from '../interfaces/nSQL'
import { useIsFocused } from '@react-navigation/native'

export default function Favoris({navigation}: any) {

  const isFocused = useIsFocused();

  const [News, setNews] = useState<nSQL[]>([])

  useEffect(() => {
    if (isFocused) {
      getFavoris(); 
    }
  }, [isFocused])
  
  function getFavoris(): void {
    ExecuteQuery('SELECT * FROM favoris', [])
    .then(
      data => {
        setNews(data.rows._array);
      }
    )
    .catch(
      err => {
        Alert.alert(
          `Erreur`,
          err,
          [
            {
              text: "OK"
            }
          ]
        )
      }
    )
  }

  return (
    <ScrollView style={style.cardview}>
    <View style={{marginTop: 10}}>
      {
        News.map(n => {
          return (
          <Card key={n.url} style={{marginBottom: 10}} onPress={() => navigation.navigate("SelectedNews", n)}>
            <Card.Cover source={{ uri: n.urlToImage }} />
            <Card.Content>
              <Title> {n.title} </Title>
              <Paragraph> {n.source} </Paragraph>
            </Card.Content> 
          </Card>  
          )
        })
      }
    </View>
  </ScrollView>
  )
}

const style = StyleSheet.create({
  cardview: {
    paddingLeft: 10,
    paddingRight: 10
  }
})