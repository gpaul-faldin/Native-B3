import {SafeAreaView} from 'react-native';
import styled from 'styled-components';

const DefaultImage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const RenderItem = ({item, pending}) => {
  if (pending) {
    return (
      <SafeAreaView>
        <Photo
          source={{
            uri: DefaultImage,
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <Photo
        source={{
          uri: item.image ? item.image : DefaultImage,
        }}
      />
      <TextContainer>
        <TextRow>
          <NameText>{item.name}</NameText>
        </TextRow>
      </TextContainer>
    </SafeAreaView>
  );
};

const NameText = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: bold;
`;
const TextRow = styled.Text`
  flex-direction: row;
  align-items: center;
`;
const TextContainer = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;
const Photo = styled.Image`
  width: 390px;
  height: 580px;
  resize: cover;
  border-radius: 20px;
`;

export default RenderItem;
