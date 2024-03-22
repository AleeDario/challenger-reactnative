import React, { useState } from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Login({ navigation }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (key, value) => {
        setUserData({
            ...userData,
            [key]: value,
        });
    };

    const handleSubmit = () => {
        if (userData.email === 'juan.challenge@gmail.com' && userData.password === 'juan123456!') {
            return navigation.replace('TabNavigation');
        }

        alert('Credenciales incorrectas');
    };

    return (
        <Container>
            <Image source={require("../../assets/logo.png")} />
            <Text title>Ingresa tus datos</Text>
            <InputContainer>
                <Text left>Correo electrónico</Text>
                <InputField>
                    <Input
                        onChangeText={value => handleInputChange('email', value)}
                    />
                </InputField>
            </InputContainer>
            <InputContainer>
                <Text left>Contraseña</Text>
                <InputField>
                    <Input
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={value => handleInputChange('password', value)}
                    />
                    <IconTouch onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Icon name={isPasswordVisible ? "eye" : "eye-slash"} size={20} color="#000" />
                    </IconTouch>
                </InputField>
            </InputContainer>
            <Button recovery>
                <Text>Olvidé mi contraseña</Text>
            </Button>
            <Button onPress={handleSubmit}>
                <Text black>Iniciar sesión</Text>
            </Button>
        </Container>
    );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #222222;
  gap: 30px;
`;

const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

const Text = styled.Text`
  color: #FFFFFF;
  font-size: 14px;

  ${props => props.title && `
    font-size: 20px;
  `}

  ${props => props.left && `
    align-self: flex-start;
  `}

  ${props => props.black && `
    color: #000000;
  `}
`;

const InputContainer = styled.View`
  width: 90%;
  margin-top: 10px;
  gap: 10px;
`;

const InputField = styled.View`
  background-color: #FFFFFF;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const Input = styled.TextInput`
  flex: 1;
  border-radius: 50px;
`;

const IconTouch = styled.TouchableOpacity`
  
`;

const Button = styled.TouchableOpacity`
  background-color: #ffde59;
  border-radius: 50px;
  width: 80%;
  justify-content: center;
  align-items: center;
  padding-vertical: 10px;
  margin-top: 30px;

  ${props => props.recovery && `
    margin-top: 0px;
    background-color: transparent;
    width: auto;
  `}
`;