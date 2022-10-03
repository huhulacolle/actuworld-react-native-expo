import { View, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Paragraph, Title } from 'react-native-paper';
import axios from 'axios';
import INews from '../interfaces/INews';
import { ScrollView } from 'react-native-gesture-handler';
import { KEY } from "@env" 
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';

export default function News({navigation}: any) {

  const [News, setNews] = useState<INews[]>([]);

  const [loading, setLoading] = useState(true);

  const [FirstLoading, setFirstLoading] = useState(false);

  const [FirstHours, setFirstHours] = useState(dayjs().add(2, 'hour').toDate().getHours());

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && FirstLoading) {
      const NewHours = dayjs().add(2, 'hour').toDate().getHours();
      if (NewHours == 0 || NewHours > FirstHours) {
        setLoading(true);
        getNews();
        setFirstHours(NewHours);
      }
    }
  }, [isFocused])

  useEffect(() => {
    getNews();
    setFirstLoading(true);
  }, [])

  function getNews(): void {
    setLoading(true);
    axios.get(`https://newsapi.org/v2/top-headlines?language=fr&apiKey=${KEY}`)
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
          err.response.data.message,
          [
            {
              text: "OK"
            }
          ]
        )
      }
    )
  }

  if (!loading) {
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
                  <Paragraph> {n.source.name} </Paragraph>
                </Card.Content> 
              </Card>  
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
  else {
    return (
      <View>
        <ActivityIndicator size="large" color="black" style={{marginTop: 15}} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardview: {
    paddingLeft: 10,
    paddingRight: 10
  }
})