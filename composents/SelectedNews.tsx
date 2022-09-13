import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import INews from '../interfaces/INews'
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

export default function SelectedNews({route, navigation}: any) {

  const News: INews = route.params;

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  useEffect(() => {
    navigation.setOptions({ title: News.source.name });
  })
  
  return (
    <View>
        <Card.Cover source={{ uri: News.urlToImage }} />
        <Card.Content>
          <Title> {News.title} </Title>
          <Paragraph> {News.description} </Paragraph>
        </Card.Content>
        <Button mode='contained' onPress={async () => await WebBrowser.openBrowserAsync(News.url)} style={styles.button} >Lire l'article</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    marginTop: 20,
  },
});