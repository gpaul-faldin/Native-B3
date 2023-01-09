import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components';

const ChatPage = ({info}) => {
  const [Message, SetMessage] = useState('');
  const [MessageFeed, setMessageFeed] = useState([]);

  async function UpdateMatch() {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3000/match/${info.id}`,
      });
      await axios({
        method: 'POST',
        url: `http://localhost:3000/talked`,
        data: info,
      });
    } catch (e) {}
  }

  const UpdateMessage = () => {
    if (MessageFeed.length === 0) {
      UpdateMatch();
    }
    setMessageFeed([...MessageFeed, {text: Message, sender: 'user'}]);
    SetMessage('');
  };

  const renderItem = ({item}) => {
    if (item.sender == 'bot') {
      return (
        <BubbleBot>
          <MessageBot>{item.text}</MessageBot>
        </BubbleBot>
      );
    } else
      return (
        <BubbleUser>
          <MessageUser>{item.text}</MessageUser>
        </BubbleUser>
      );
  };

  useEffect(() => {
    if (
      MessageFeed.length > 0 &&
      MessageFeed[MessageFeed.length - 1].sender == 'user'
    ) {
      setMessageFeed([
        ...MessageFeed,
        {text: 'écoute on est la hein', sender: 'bot'},
      ]);
    }
  }, [MessageFeed]);

  return (
    <MainFlex>
      <ViewList>
        <FlatList
          data={MessageFeed}
          extraData={MessageFeed}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ViewList>
      <SafeAreaView>
        <Input
          onChangeText={SetMessage}
          onSubmitEditing={e => UpdateMessage()}
          value={Message}
          placeholder={
            MessageFeed.length == 0
              ? 'Send some sugar to attract attention!'
              : 'Type a message...'
          }
          keyboardType="default"
        />
      </SafeAreaView>
    </MainFlex>
  );
};

const MainFlex = styled.SafeAreaView`
  display: flex;
`;
const Input = styled.TextInput`
  width: 385px;
  background-color: #fff;
  border-radius: 20px;
  padding: 15px;
  align-items: center;
  align-self: center;
`;
const MessageBot = styled.Text`
  padding: 8px;
  color: black;
`;
const ViewList = styled.SafeAreaView`
  height: 675px;
`;
const MessageUser = styled.Text`
  padding: 8px;
  color: white;
`;
const BubbleUser = styled.SafeAreaView`
  width: auto;
  border-radius: 20px;
  background-color: #1084ff;
  align-items: center;
  align-self: flex-end;
`;
const BubbleBot = styled.SafeAreaView`
  width: auto;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 15px;
  border-radius: 20px;
  background-color: #c5c5c5;
  align-items: center;
  align-self: flex-start;
`;

export default ChatPage;
