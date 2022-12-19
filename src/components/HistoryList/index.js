import React, {useEffect, useState} from 'react';
import {Text, FlatList, Image, Button, SafeAreaView} from 'react-native';
import axios from 'axios';

const HistoryList = () => {
  const [History, setHistory] = useState('like');
  const [Page, setPage] = useState(0);
  const [Profiles, setProfiles] = useState([]);

  const renderItem = ({item}) => {
    console.log('HERE');
    return (
      <SafeAreaView>
        <Text>{item.name}</Text>
        <Image
          style={{
            width: 200,
            height: 300,
            backgroundColor: 'red',
          }}
          source={{
            uri: item.image,
          }}
        />
      </SafeAreaView>
    );
  };
  const Passed = () => {
    setHistory('pass');
    setProfiles([]);
  };
  const Liked = () => {
    setHistory('like');
    setProfiles([]);
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/${History}?_page=${Page}`,
    })
      .then(res => {
        setProfiles(...Profiles, ...res.data);
      })
      .catch(e => {});
  }, [Page, History]);

  return (
    <SafeAreaView>
      <Button onPress={Liked} title="Liked History" />
      <Button onPress={Passed} title="Passed History" />
      <Text>{'Ca History list ici'}</Text>
      <FlatList
        data={Profiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={() => {
          setPage(prev => prev + 1);
        }}
        onEndReachedThreshold={0.4}
      />
    </SafeAreaView>
  );
};

export default HistoryList;
