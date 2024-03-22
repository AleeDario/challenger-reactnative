import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

import HomeStack from './HomeStack';

export default function TabNavigation({ navigation }) {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0e567"
            inactiveColor="#FFFFFF"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'account' : 'account';
                    }

                    return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: '#ffde59',
                tabBarInactiveTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: '#222222',
                    borderTopLeftRadius: 15, // ajusta según sea necesario
                    borderTopRightRadius: 15,
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
            })}

        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    title: 'Inicio',
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={HomeStack}
                options={{
                    title: 'Favoritas',
                }}
            />
            <Tab.Screen
                name="Account"
                component={HomeStack}
                options={{
                    title: 'Perfil',
                }}
            />
        </Tab.Navigator>
    )

}