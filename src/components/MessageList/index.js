import React, {useEffect} from 'react';
import styled from 'styled-components';
import {SafeAreaView, FlatList} from 'react-native';
import axios from 'axios';

const MessageList = ({navigation}) => {
  const [MatchList, setMatchList] = React.useState([]);
  const [TalkedList, setTalkedList] = React.useState([]);

  const PullDb = table => {
    axios({
      method: 'get',
      url: `http://localhost:3000/${table}`,
    })
      .then(response => {
        if (table == 'match') setMatchList(response.data);
        else setTalkedList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderMatch = ({item}) => {
    return (
      <ListMatch
        onPress={() => {
          navigation.navigate('Chat', {item});
        }}>
        <Picture
          source={{
            uri: item.image,
          }}
        />
        <TextName>{item.name}</TextName>
      </ListMatch>
    );
  };
  const renderTalked = ({item}) => {
    return (
      <ListTalked
        onPress={() => {
          navigation.navigate('Chat', {item});
        }}>
        <TalkedItems>
          <Picture
            source={{
              uri: item.image,
            }}
          />
          <TalkedName>{item.name + '\n'}</TalkedName>
        </TalkedItems>
      </ListTalked>
    );
  };

  useEffect(() => {
    PullDb('match');
    PullDb('talked');
  }, []);

  return (
    <SafeAreaView>
      <MessageHeader>New matches</MessageHeader>
      <FlatList
        data={MatchList}
        horizontal={true}
        renderItem={renderMatch}
        keyExtractor={item => item.id}
      />
      <MessageHeader>Messages</MessageHeader>
      <FlatList
        data={TalkedList}
        horizontal={false}
        renderItem={renderTalked}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const MessageHeader = styled.Text`
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #ff6666;
`;
const ListMatch = styled.TouchableOpacity`
  height: 85px;
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Picture = styled.Image`
  width: 60px;
  height: 60px;
  padding: 20px;
  resize: cover;
  border-radius: 100px;
`;
const TextName = styled.Text`
  font-size: 10px;
  color: black;
  font-weight: bold;
  align-self: baseline;
  padding-top: 5px;
  padding-left: 5px;
`;
const ListTalked = styled.TouchableOpacity`
  height: 85px;
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: space-around;
  align-items: baseline;
`;
const TalkedItems = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`;
const TalkedName = styled.Text`
  font-size: 15px;
  color: black;
  font-weight: 300;
  align-self: baseline;
  padding-top: 18px;
  padding-left: 4px;
`;

export default MessageList;
