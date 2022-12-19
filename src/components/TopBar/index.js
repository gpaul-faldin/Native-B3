import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const TopBar = ({navigation}) => {
  const History = () => {
    navigation.navigate('History');
  };
  const Swipe = () => {
    navigation.navigate('MainPage');
  };
  const Message = () => {
    navigation.navigate('Message');
  };

  return (
    <MainView>
      <TopButton onPress={History}>
        <FontAwesome5 name={'book'} style={styles.icon} />
      </TopButton>
      <TopButton onPress={Swipe}>
        <FontAwesome5 name={'heart'} solid={true} style={styles.icon} />
      </TopButton>
      <TopButton onPress={Message}>
        <FontAwesome5 name={'envelope'} style={styles.icon} />
      </TopButton>
    </MainView>
  );
};

const TopButton = styled.TouchableOpacity`
  width: 130px;
  height: 60px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MainView = styled.SafeAreaView`
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const styles = StyleSheet.create({
  icon: {
    fontSize: 45,
  },
});

export default TopBar;
