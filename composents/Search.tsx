import { View, Text } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Searchbar } from 'react-native-paper';

export default function Search() {

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: SetStateAction<string>) => setSearchQuery(query);

  return (
    <View>
      <Searchbar
      placeholder="Bientôt disponible"
      onChangeText={onChangeSearch}
      value={searchQuery}
      />
    </View>
  )
}