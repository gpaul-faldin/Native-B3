import React from 'react';
import {Text, View} from 'react-native';
import Profils from '../components/Profils';
import TopBar from '../components/TopBar';

const Swipe = ({navigation}) => {
  return (
    <View>
      <TopBar navigation={navigation} />
      <Profils />
    </View>
  );
};

export default Swipe;
