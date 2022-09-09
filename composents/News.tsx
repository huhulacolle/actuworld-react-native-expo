import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Paragraph, Title } from 'react-native-paper';
import axios from 'axios';
import INews from '../interfaces/INews';
import { ScrollView } from 'react-native-gesture-handler';

import { KEY } from "@env" 

export default function News({navigation}: any) {

  const [News, setNews] = useState<INews[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNews();
  })

  function getNews() {
    setLoading(true);
    axios.get(`https://gnews.io/api/v4/top-headlines?country=fr&token=${KEY}`)
    .then(
      data => {
        setNews(data.data.articles);
        setLoading(false);
      }
    )
    .catch(
      err => {
        Alert.alert(
          `Erreur ${err.response.status}`,
          err.response.data.errors[0],
          [
            {
              text: "OK", onPress: () => {}
            }
          ]
        )
      }
    )
  }

  if (!loading) {
    return (
      <ScrollView>
        <Button title='Refresh' onPress={getNews} />
        {
          News.map(n => {
            return (
            <Card key={n.url} onPress={() => navigation.navigate("SelectedNews", n)}>
              <Card.Cover source={{ uri: n.image }} />
              <Card.Content>
                <Title> {n.title} </Title>
                <Paragraph> {n.source.name} </Paragraph>
              </Card.Content>
            </Card>  
            )
          })
        }      
      </ScrollView>
    )
  }
  else {
    return (
      <View>
        <Text> Chargement </Text>
      </View>
    )
  }
}