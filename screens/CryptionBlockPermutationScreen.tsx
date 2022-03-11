import * as React from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';

export default function CryptionBlockPermutationScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {
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
          }}
      />
      <Text style={styles.title}>Ключ (Цифры не должны повторяться)</Text>
      <TextInput
        style={styles.input}
        keyboardType={'numeric'}
        placeholder="Введите ключ"
        onChangeText={(text) =>{
          useSetKey(text);
          }}
      />
      
      <Text style={styles.title}>Зашифрованный текст</Text>
      <TouchableOpacity onPress={() => CopyToClipboard(answer)}>
        <Text style={styles.display}>{answer}</Text>
      </TouchableOpacity>
      <RoundedButton text="Зашифровать" onPress={() => {
        let crypted = Crypter.blockPermutation(inputText, key)
        useSetAnswer(crypted)
      }}/>
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

