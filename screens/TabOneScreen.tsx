import { EnumNumberMember } from '@babel/types';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  let [middleText, useSetMiddleText] = React.useState('');
  let [serverText, useSetServerText] = React.useState('');
  let [status, useSetStatus] = React.useState('connecting...');
  let [username, useSetusername] = React.useState('noname');

  let [lastTime, useSetLastTime] = React.useState(new Date().getTime());

  let serverConnection = new WebSocket('ws://95.46.15.224:1488');
  serverConnection.onopen = ()=>{
    useSetStatus("CONNECTED")
  }
  serverConnection.onclose = ()=>{
    useSetStatus("DISCONNECTED")
  }

  serverConnection.onmessage = (msg) => {
    useSetServerText((msg.data.toString()));
  };


  function updateMiddle(posX: number, posY:number){
    useSetMiddleText(`x:${posX}/y:${posY}`);
    let time = new Date();
    if((time.getTime()-lastTime)>400){
      if(serverConnection.readyState === 1){
        serverConnection.send(JSON.stringify({
          name : username,
          x : posX,
          y : posY,
        }));
      }
      useSetLastTime(time.getTime());
    }
  }

  function updateStatus(text: string){
    useSetStatus(text);
  }

  function touchEnd(){
    useSetMiddleText(``);
    if(serverConnection.readyState === 1){
      serverConnection.send("end");
    }
  }

  return (
    <View onTouchStart={(event) => {
      updateMiddle(event.nativeEvent.locationX, event.nativeEvent.locationY)
    }} style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>me: {middleText}</Text>
      <Text>server: {serverText}</Text>
      <Text>{status}</Text>
      <Text>last send {lastTime}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => useSetusername(text)}
        placeholder="userName"
      />
      
      
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
  },
});

