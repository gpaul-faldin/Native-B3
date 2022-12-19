import React from 'react';
import {StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const BottomBar = ({setLike, setPass, setSwipeCount}) => {
  const LikePress = () => {
    setSwipeCount(prev => prev + 1);
    setLike(true);
  };
  const PassPress = () => {
    setSwipeCount(prev => prev + 1);
    setPass(true);
  };

  return (
    <MainView>
      <IconButton onPress={PassPress}>
        <FontAwesome5 name={'meteor'} style={styles.icon} />
      </IconButton>
      <IconButton onPress={LikePress}>
        <FontAwesome5 name={'bolt'} style={styles.icon} />
      </IconButton>
    </MainView>
  );
};

const MainView = styled.SafeAreaView`
  height: 75px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  icon: {
    fontSize: 45,
  },
});

export default BottomBar;
