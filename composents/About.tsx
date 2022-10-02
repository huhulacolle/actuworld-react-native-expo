import { View, Text } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'
import * as Application from 'expo-application';
import * as Device from 'expo-device';

export default function About() {
  return (
    <View>
      <List.Item
        title={`Nom de l'app : ${Application.applicationName}`}
        left={props => <List.Icon {...props} icon="apps"/>}
      />
      <List.Item
        title={`Version : ${Application.nativeApplicationVersion}`}
        left={props => <List.Icon {...props} icon="help" />}
      />
      <List.Item
        title={`${Device.osName} : ${Device.osVersion}`}
        left={props => <List.Icon {...props} icon="android" />}
      />
      <List.Item
        title={`Constructeur : ${Device.modelName}`}
        left={props => <List.Icon {...props} icon="phone" />}
      />
      <List.Item
        title={`Modèle : ${Device.modelId}`}
        left={props => <List.Icon {...props} icon="cog" />}
      />      
    </View>
  )
}
