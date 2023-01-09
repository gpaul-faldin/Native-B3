import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

const ChatHeader = ({info}) => {
  return (
    <Flex>
      <Image style={{width: 50, height: 50}} source={info.image} />
      {/* <Text>{info.name}</Text> */}
    </Flex>
  );
};

export default ChatHeader;

const Flex = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`;
