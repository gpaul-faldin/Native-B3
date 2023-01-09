import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import axios from 'axios';
import RenderItem from '../ShowProfile';
import BottomBar from '../BottomBar';
import MatchModal from '../MatchModal';
import uuid from 'react-native-uuid';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';

const Profils = ({navigation}) => {
  const [Users, setUsers] = useState([]);
  const [Offset, setOffset] = useState(0);
  const [SwipeCount, setSwipeCount] = useState(0);
  const [Like, setLike] = useState(false);
  const [Pass, setPass] = useState(false);
  const [Match, setMatch] = useState(false);
  const [MatchInfo, setMatchInfo] = useState();

  async function FetchUsers() {
    var PromiseArr = [];

    try {
      for (let x = 0; x < 20; x++) {
        if (Offset == 0 && x == 0) {
          PromiseArr.push(
            axios({
              method: 'GET',
              url: `https://www.superheroapi.com/api.php/4204884039587685/${1}`,
            }),
          );
        } else if ((Offset == 0 && x != 1) || Offset > 0) {
          PromiseArr.push(
            axios({
              method: 'GET',
              url: `https://www.superheroapi.com/api.php/4204884039587685/${
                Offset + x
              }`,
            }),
          );
        }
      }
      let res = await Promise.all(PromiseArr);

      let preUsers = [];
      for (let x = 0; x < res.length; x++) {
        preUsers.push({
          name: res[x].data.name,
          image: res[x].data.image.url,
          id: res[x].data.id,
        });
      }
      setUsers(preUsers);
    } catch (e) {}
  }

  async function SaveChoice(User, type) {
    User.id = uuid.v4();
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:3000/${type}`,
        data: User,
      });
    } catch (e) {}
  }

  function randomInt() {
    return Math.floor(Math.random() * (3 - 0 + 1) + 0);
  }

  useEffect(() => {
    if (SwipeCount == 19) {
      setSwipeCount(0);
      setOffset(prev => prev + 20);
    }
  }, [SwipeCount]);
  useEffect(() => {
    setUsers([]);
    FetchUsers();
  }, [Offset]);
  useEffect(() => {
    if (Like == true) {
      SaveChoice(Users[SwipeCount - 1], 'like');
      if (randomInt() === randomInt()) {
        SaveChoice(Users[SwipeCount - 1], 'match');
        setMatchInfo(Users[SwipeCount - 1]);
        setMatch(true);
      }
      setLike(false);
    }
    if (Pass == true) {
      SaveChoice(Users[SwipeCount - 1], 'pass');
      setPass(false);
    }
  }, [Like, Pass]);

  return (
    <SafeAreaView>
      {Users[SwipeCount] ? (
        <RenderItem item={Users[SwipeCount]} pending={false} />
      ) : (
        <RenderItem pending={true} />
      )}
      <BottomBar
        setLike={setLike}
        setPass={setPass}
        setSwipeCount={setSwipeCount}
      />
      {Match == true ? (
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={35}
          reducedTransparencyFallbackColor="white"
        />
      ) : null}
      {Match == true ? (
        <MatchModal
          match={Match}
          setMatch={setMatch}
          info={MatchInfo}
          setInfo={setMatchInfo}
          navigation={navigation}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: -60,
    left: 0,
    bottom: -40,
    right: 0,
  },
});

export default Profils;
