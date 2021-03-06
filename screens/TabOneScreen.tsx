import { EnumNumberMember } from '@babel/types';
import * as React from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RoundedButton from '../components/RoundedButton';

export default function TabOneScreen() {
  let [answer, useSetAnswer] = React.useState("");
  let [key, useSetKey] = React.useState("");
  let [inputText, useSetinputText] = React.useState("");
  const crypter = new Crypter();

  function CopyToClipboard(data: string) : void{
    Clipboard.setString(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TabOne</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },display: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  }
});

