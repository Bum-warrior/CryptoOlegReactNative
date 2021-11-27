import { EnumNumberMember } from '@babel/types';
import * as React from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  let [answer, useSetAnswer] = React.useState("");
  let [key, useSetKey] = React.useState("");
  let [inputText, useSetinputText] = React.useState("");
  const crypter = new Crypter();

  function CopyToClipboard(data: string) : void{
    Clipboard.setString(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Исходное слово</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите текст"
        onChangeText={(text) =>{
          useSetinputText(text);
          crypter.permutation(text, useSetKey, useSetAnswer)}}
      />
      <Text style={styles.title}>Ключ</Text>
      <TouchableOpacity onPress={() => CopyToClipboard(key)}>
        <Text style={styles.display}>{key}</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Зашифрованный текст</Text>
      <TextInput
        style={styles.input}
        placeholder="Тут будет ответ"
        editable={false}
        value={answer}
      />
      <Button title="обновить" color = "#a52a2a" onPress={() => crypter.permutation(inputText, useSetKey, useSetAnswer)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },btn: {

  },display: {
    borderWidth: 1,
    width: 250,
    minHeight: 30,
    padding: 5,
  }
});

