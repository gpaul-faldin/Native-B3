import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import axios from 'axios';
import RenderItem from '../ShowProfile';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import BottomBar from '../BottomBar';
import uuid from 'react-native-uuid';

const Profils = () => {
  const [Users, setUsers] = useState([]);
  const [Offset, setOffset] = useState(0);
  const [SwipeCount, setSwipeCount] = useState(0);
  const [Like, setLike] = useState(false);
  const [Pass, setPass] = useState(false);

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
    await axios({
      method: 'POST',
      url: `http://localhost:3000/${type}`,
      data: User,
    });
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
    </SafeAreaView>
  );
};

export default Profils;
