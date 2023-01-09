import {Modal, SafeAreaView} from 'react-native';
import styled from 'styled-components';

const DefaultImage =
  'https://cdn.pixabay.com/Picture/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const MatchModal = ({match, setMatch, info, navigation}) => {
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        visible={match}
        transparent={true}
        onRequestClose={() => {
          setMatch(false);
        }}>
        <ModalArea>
          <SafeAreaView>
            <MatchText>It's a Match !</MatchText>
            <MatchEachOther>
              {'You and ' + info.name + ' have liked each other ❤️'}
            </MatchEachOther>
            <FormatPicture>
              <Picture
                source={{
                  uri: info.image ? info.image : DefaultImage,
                }}
              />
              <Picture
                source={{
                  uri: 'https://i.insider.com/563a7957dd089590518b45a6?width=1019&format=jpeg',
                }}
              />
            </FormatPicture>
            <GotoMessage
              onPress={() => {
                navigation.navigate('Chat', {item: info});
                setMatch(false);
              }}>
              <TextGotoMessage>Send Message</TextGotoMessage>
            </GotoMessage>
            <ContinueSwipe onPress={() => setMatch(false)}>
              <TextContinueSwipe>Keep Swiping</TextContinueSwipe>
            </ContinueSwipe>
          </SafeAreaView>
        </ModalArea>
      </Modal>
    </SafeAreaView>
  );
};

const FormatPicture = styled.SafeAreaView`
  height: 265px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Picture = styled.Image`
  width: 185px;
  height: 185px;
  resize: cover;
  border-radius: 150px;
`;
const MatchText = styled.Text`
  margin-top: 25px;
  color: green;
  font-size: 45px;
  font-weight: bold;
`;
const MatchEachOther = styled.Text`
  margin-top: 5px;
  font-size: 17px;
  color: white;
`;
const ContinueSwipe = styled.TouchableOpacity`
  top: 5px;
  border-radius: 10px;
  padding: 6px;
  padding-right: 60px;
  padding-left: 60px;
  border: 3px solid #ff6666;
`;
const TextContinueSwipe = styled.Text`
  font-size: 13px;
  color: white;
  font-weight: bold;
  align-self: center;
`;
const GotoMessage = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 15px;
  padding-right: 75px;
  padding-left: 75px;
  background-color: #ff6666;
`;
const TextGotoMessage = styled.Text`
  font-size: 28px;
  color: white;
  font-weight: bold;
  align-self: center;
`;
const ModalArea = styled.SafeAreaView`
  flex: 1px;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export default MatchModal;
