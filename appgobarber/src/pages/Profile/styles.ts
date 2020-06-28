import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  margin-top: ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #faede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const AvatarContainer = styled.View`
  position: relative;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;

  align-self: flex-start;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  width: 186px;
  height: 186px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;
