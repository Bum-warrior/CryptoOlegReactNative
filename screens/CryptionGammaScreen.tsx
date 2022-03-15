import * as React from 'react';
import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import MyRandomizer from '../services/MyRandomizer';

export default function CryptionGammaScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {

  const [wordBeforeCryption, setwordBeforeCryption] = useState('');
  const [key, setkey] = useState('');
  const [wordAfterCryption, setwordAfterCryption] = useState('')
  const [squaresViews, setsquaresViews] = useState();

  function Crypt(){
    let grid = Crypter.Gamma(wordBeforeCryption, key);
    //@ts-ignore
    let squareView = [];
    grid.map((column, index) => {
        squareView.push(
            <View style={styles.column} key={index}>
                    <View style={styles.square}>
                        <Text>{column[0]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[1]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[2]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[3]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[4]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[5]}</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>{column[6]}</Text>
                    </View>
                </View>
        )
    })
    //@ts-ignore
    setsquaresViews(squareView)
    
  }

  function CopyToClipboard(data: string) : void{
    Clipboard.setString(data);
  }

  return (
    <View style={styles.main}>
      <ScrollView>
        <Text style={styles.title}>
          Исходный текст
        </Text>
        <TextInput 
        onEndEditing={
          ()=>{}}
        onChangeText={(text)=>{setwordBeforeCryption(text)}}
        style={styles.input}/>
        <Text style={styles.title}>
          Гамма ключ
        </Text>
        <TextInput 
        onEndEditing={
          ()=>{}}
        onChangeText={(text)=>{setkey(text)}}
        style={styles.input}/>
        

        
        <Text style={styles.title}>
          Таблица
        </Text>
        <Text style={styles.lineBreak}></Text>
        <ScrollView horizontal={true}>
            <View style={styles.squareGrid}>
                <View style={styles.column}>
                    <View style={styles.square}>
                        <Text>T</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>G</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>T</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>G</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>T+G</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>MOD N</Text>
                    </View>
                    <View style={styles.square}>
                        <Text>C</Text>
                    </View>
                </View>
                {squaresViews}
            </View>
        </ScrollView>
        
        <Text style={styles.lineBreak}></Text>
        

        <RoundedButton text="Зашифровать" onPress={()=>{
          Crypt();
        }}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 5,
    
  },squareGrid: {
    flex: 1,
    padding: 25,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
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
    minHeight: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  }, square:{
    borderWidth: 1,
    padding: 5,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  }, line: {
    display: 'flex',
    flexDirection: 'row',
  },column: {
    display: 'flex',
    flexDirection: 'column',
  }, fit: {
    width: 'fitcontent'
  }, left: {
    textAlign: 'right',
    marginRight: 12,
    marginLeft: 'auto'
  }, lineBreak:{
    height: 1,
    borderWidth: 1,
    width: '100%',
  }
});
