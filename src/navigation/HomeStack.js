import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import Home from '../views/Home';
import Search from '../views/Search';
import Searched from '../views/Searched';

const StackHome = createNativeStackNavigator();

export default function HomeStack({ navigation, route }) {

    const user = {
        name: 'Juan',
        lastName: 'Challenger',
        email: 'juan.challenge@gmail.com',
    }

    return (
        <StackHome.Navigator>
            <StackHome.Screen name="HomeScreen" component={Home} options={{
                title: `¡Hola, ${user.name}!`,
                headerStyle: {
                    backgroundColor: '#222222',
                },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (
                    <Container>
                        <Image source={require('../../assets/logo.png')} />
                    </Container>
                ),
            }}
            />
            <StackHome.Screen name="SearchScreen" component={Search} options={({ route, navigation }) => ({
                title: `Búsqueda`,
                headerStyle: {
                    backgroundColor: '#222222',
                },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (

                    <Container mr>
                        <Icon name="chevron-back" size={20} color="#FFFFFF" onPress={() => navigation.goBack()} />
                    </Container>
                )
            })}
            />
            <StackHome.Screen name="SearchedScreen" component={Searched} options={({ route, navigation }) => ({
                title: `Resultado de la búsqueda`,
                headerStyle: {
                    backgroundColor: '#222222',
                },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (

                    <Container mr>
                        <Icon name="chevron-back" size={20} color="#FFFFFF" onPress={() => navigation.goBack()} />
                    </Container>
                )
            })}
            />
        </StackHome.Navigator>
    );
}

const Container = styled.View`
    paddingVertical: 15px;
    flex-direction: row;
    align-items: center;

    ${props => props.mr && `
        margin-right: 10px;
    `}
`

const Image = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`