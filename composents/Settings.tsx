import { Alert, ToastAndroid, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'
import { deleteAllFavoris } from '../services/Database';

export default function Settings({navigation}: any) {

  function test(): void {
    console.log("test");
  }

  function deleteAllSql(): void {
    Alert.alert("", "Voulez vous supprimer les données de l'application ?", [
      {
        text: 'Non',
        style: 'cancel',
      },
      { text: 'Oui', onPress: () => {
        deleteAllFavoris;
        ToastAndroid.show('Favoris effacés', ToastAndroid.LONG);
      } },
    ])
  }

  return (
    <View>
      <List.Item
        onPress={() => navigation.navigate("About")}
        title="A propos de"
        left={props => <List.Icon {...props} icon="information-outline"/>}
      />
      <List.Item
        onPress={deleteAllSql}
        title="Supprimer toutes les données"
        left={props => <List.Icon {...props} icon="help" />}
      />
    </View>
  )
}