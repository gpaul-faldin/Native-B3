import React from 'react';
import {Text, View} from 'react-native';
import TopBar from '../components/TopBar';

const Swipe = ({navigation}) => {
  return (
    <View>
      <TopBar navigation={navigation} />
      <Text>{'Ca Message ici'}</Text>
    </View>
  );
};

export default Swipe;
