import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Paragraph, Title } from 'react-native-paper';
import axios from 'axios';
import INews from '../interfaces/INews';
import { ScrollView } from 'react-native-gesture-handler';

export default function News({navigation}: any) {

  const [News, setNews] = useState<INews[]>([])

  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    getNews();
  })

  function getNews() {
    setLoading(true);
    axios.get("http://api.mediastack.com/v1/news?access_key=9175d9524d1e237b10955dd72c17d348&languages=fr")
    .then(
      data => {
        setNews(data.data.data);
        setLoading(false);
      }
    )
    .catch(
      err => {
        alert(err);
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
                <Paragraph> {n.source} </Paragraph>
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