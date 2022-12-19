import React from 'react';
import {Text, View} from 'react-native';
import HistoryList from '../components/HistoryList';
import TopBar from '../components/TopBar';

const History = ({navigation}) => {
  return (
    <View>
      <TopBar navigation={navigation} />
      <Text>{'Ca History ici'}</Text>
      <HistoryList />
    </View>
  );
};

export default History;
