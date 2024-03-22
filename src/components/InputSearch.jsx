import React, { useRef, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components";

export default function InputSearch({ navigation, goSearch, fx, searching, setSearching, vlue }) {

    const [textSearched, setTextSearched] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (vlue) {
            setTextSearched(vlue);
        }
    }, [vlue]);

    useFocusEffect(
        React.useCallback(() => {
            if (inputRef.current) {
                if (searching) {
                    inputRef.current.focus();
                } else {
                    inputRef.current.blur();
                }
            }
        }, [searching])
    );

    return (
        <InputContainer w60={searching} onPress={() => goSearch && navigation.navigate("SearchScreen")}>
            <Icon name="search" size={16} color="#898989" onPress={() => {
                fx(textSearched);
                navigation.navigate("SearchedScreen", { textSearch: textSearched });
            }} />
            {goSearch ? <Container><Text>Buscar</Text></Container> : <Input value={textSearched} ref={inputRef} w60={searching ? 70 : 90} placeholder="Buscar" onChangeText={(text) => setTextSearched(text)} onFocus={() => !vlue && setSearching(true)} editable={!vlue} />}
            <Icon name="microphone" size={16} color="#898989" />
        </InputContainer>
    );
}

const Container = styled.View`
    height: 40px;
    margin-left: 10px;
    width: 90%;
    justify-content: center;
`;

const InputContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  background-color: #e9e9ea;
  border-radius: 10px;
  padding-horizontal: 10px;
  justify-content: space-around;
  width: 100%;

  ${props => props.w60 && `
    width: 80%;
  `}
`;

const Input = styled.TextInput`
  height: 40px;
  margin-left: 10px;
  width: ${props => props.w60}%;
`;

const Text = styled.Text`
  color: #898989;
`;