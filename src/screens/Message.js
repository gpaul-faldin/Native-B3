import React from 'react';
import {View} from 'react-native';
import MessageList from '../components/MessageList';
import TopBar from '../components/TopBar';

const Swipe = ({navigation}) => {
  return (
    <View>
      <TopBar navigation={navigation} />
      <MessageList navigation={navigation} />
    </View>
  );
};

export default Swipe;
