import React from 'react';
import {View} from 'react-native';
import ChatPage from '../components/ChatPage';

const Chat = ({navigation, route}) => {
  const {item} = route.params;
  navigation.setOptions({
    title: item.name,
  });
  return (
    <View>
      <ChatPage info={item}></ChatPage>
    </View>
  );
};

export default Chat;
