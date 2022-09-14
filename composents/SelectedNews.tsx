import { Share, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import INews from '../interfaces/INews'
import { Button, Card, FAB, Paragraph, Portal, Provider, Title } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Clipboard from 'expo-clipboard';

export default function SelectedNews({route, navigation}: any) {

  const News: INews = route.params;

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  useEffect(() => {
    navigation.setOptions({ title: News.source.name });
  })

  async function copier(): Promise<void> {
    await Clipboard.setStringAsync(News.url);
    ToastAndroid.show('Copié dans le presse papier', ToastAndroid.LONG);
  }
  
  return (
    <Provider>
        <Card.Cover source={{ uri: News.urlToImage }} />
        <Card.Content>
          <Title> {News.title} </Title>
          <Paragraph> {News.description} </Paragraph>
        </Card.Content>
        <Button mode='contained' onPress={async () => await WebBrowser.openBrowserAsync(News.url)} style={styles.button} >Lire l'article</Button>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'close' : 'export-variant'}
            actions={[
              {
                icon: 'attachment',
                onPress: async () => copier(),
              },
              {
                icon: 'qrcode',
                onPress: () => alert("Fonctionnalité pas encore implémentée"),
              },
              {
                icon: 'export-variant',
                onPress: async () => await Share.share({
                  url: News.url
                }),
              },
            ]}
            visible={true}
            onStateChange={onStateChange}
            fabStyle={{backgroundColor: 'white' }}
            color={'grey'}
          />
        </Portal>
    </Provider>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    marginTop: 20,
  },
});