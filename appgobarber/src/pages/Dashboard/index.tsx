import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  ProfileContainer,
  LogoutButton,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,

} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const logout = useCallback(() => {
    signOut();
  }, [signOut]);

  const navigateToCreateAppoitment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate]
  );

  return (
    <Container>
      <Header>
        <ProfileContainer>
          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar
              source={{
                uri:
                  user.avatar_url ||
                  'https://api.adorable.io/avatars/250/abott@adorable.png',
              }}
            />
          </ProfileButton>

          <HeaderTitle>
            Bem vindo,{'\n'}
            <UserName onPress={navigateToProfile}>{user.name}</UserName>
          </HeaderTitle>
        </ProfileContainer>

        <LogoutButton onPress={logout}>
          <Icon name="power" size={24} color="#999591" />
        </LogoutButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppoitment(provider.id)}
          >
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ||
                  'https://api.adorable.io/avatars/250/abott@adorable.png',
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda á sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
