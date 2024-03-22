import styled from 'styled-components'

export default function Main({ navigation }) {

    return (
        <Container>
            <Image source={require('../../assets/logo.png')} />
            <Button onPress={() => navigation.navigate('Login')} >
                <Text>Iniciar sesión</Text>
            </Button>
        </Container>
    )
}

const Text = styled.Text`
    color: #000000;
    font-size: 16px;
`

const Button = styled.TouchableOpacity`
    background-color: #ffde59;
    border-radius: 50px;
    width: 80%;
    justify-content: center;
    align-items: center;
    padding-vertical: 10px;
`

const Image = styled.Image`
    width: 200px;
    height: 200px;
`

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #222222;
    gap: 50px;
`

