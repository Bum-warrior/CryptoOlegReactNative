import * as React from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Crypter from '../services/Crypter';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import RoundedButton from '../components/RoundedButton';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import MyRandomizer from '../services/MyRandomizer';

export default function CryptionPolybiusScreen({ navigation }: RootTabScreenProps<'CryptionSelectMenu'>) {
  let [alphabet, setalphabet] = React.useState([
    ['а','б','в','г','д','е'],
    ['ё','ж','з','и','й','к'],
    ['л','м','н','о','п','р'],
    ['с','т','у','ф','х','ц'],
    ['ч','ш','щ','ъ','ы','ь'],
    ['э','ю','я','_','1','2']
  ])
  

  function CopyToClipboard(data: string) : void{
    Clipboard.setString(data);
  }

  return (
    <View style={styles.main}>

      <View style={styles.alphabet}>
        {/* 1 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            -
          </Text>
          <Text style={styles.square}>
            1
          </Text>
          <Text style={styles.square}>
            2
          </Text>
          <Text style={styles.square}>
            3
          </Text>
          <Text style={styles.square}>
            4
          </Text>
          <Text style={styles.square}>
            5
          </Text>
          <Text style={styles.square}>
            6
          </Text>
        </View>
        

        {/* 2 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            1
          </Text>
          <Text style={styles.square}>
          {alphabet[0][0]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][1]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][2]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][3]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][4]}
          </Text>
          <Text style={styles.square}>
          {alphabet[0][5]}  
          </Text>
        </View>


        {/* 3 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            2
          </Text>
          <Text style={styles.square}>
            {alphabet[1][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[1][5]}
          </Text>
        </View>


        {/* 4 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            3
          </Text>
          <Text style={styles.square}>
            {alphabet[2][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[2][5]}
          </Text>
        </View>


        {/* 5 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            4
          </Text>
          <Text style={styles.square}>
            {alphabet[3][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[3][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[3][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[3][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[3][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[3][5]}
          </Text>
        </View>


        {/* 6 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            5
          </Text>
          <Text style={styles.square}>
            {alphabet[4][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[4][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[4][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[4][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[4][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[4][5]}
          </Text>
        </View>


        {/* 7 */}
        <View style={styles.line}>
          <Text style={styles.square}>
            6
          </Text>
          <Text style={styles.square}>
            {alphabet[5][0]}
          </Text>
          <Text style={styles.square}>
            {alphabet[5][1]}
          </Text>
          <Text style={styles.square}>
            {alphabet[5][2]}
          </Text>
          <Text style={styles.square}>
            {alphabet[5][3]}
          </Text>
          <Text style={styles.square}>
            {alphabet[5][4]}
          </Text>
          <Text style={styles.square}>
            {alphabet[5][5]}
          </Text>
        </View>
      </View>

      <RoundedButton text="Перемешать алфавит" onPress={()=>{
        setalphabet(MyRandomizer.shuffle2DArray([
          ['а','б','в','г','д','е'],
          ['ё','ж','з','и','й','к'],
          ['л','м','н','о','п','р'],
          ['с','т','у','ф','х','ц'],
          ['ч','ш','щ','ъ','ы','ь'],
          ['э','ю','я','_','1','2']
        ]))
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '80%',
  },alphabet: {
    flex: 1,
    padding: 30,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10,
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
  }, square:{
    borderWidth: 1,
    padding: 5,
    height: 40,
    width: 40,
    fontSize: 20,
    textAlign: 'center',
  }, line: {
    display: 'flex',
    flexDirection: 'row',
  }
});

