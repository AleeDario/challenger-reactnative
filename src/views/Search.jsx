import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome6';
import styled from "styled-components";
import axios from "axios";

import RecipesCards from "../components/RecipesCards";
import InputSearch from "../components/InputSearch";

export default function Search({ navigation }) {
    const [historySearch, setHistorySearch] = useState(null);
    const [displaySearchs, setDisplaySearchs] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getHistorySearch();
            getRecipes();
        }, [])
    );


    const getHistorySearch = async () => {
        try {
            const value = await AsyncStorage.getItem("historySearch");
            if (value !== null) {
                setHistorySearch(JSON.parse(value));
            }
        } catch (error) {
            console.error("Error al obtener historial de búsqueda:", error);
        }
    };

    const getRecipes = async () => {
        axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
            .then(res => setRecipes(res.data.drinks))
            .catch(err => console.log(err))
    }

    const setTextHistorySearch = async (value) => {
        if (value === "") {
            return;
        }

        try {
            const historyFiltered = historySearch.filter((history) => history !== value);
            const updatedHistory = [value, ...(historyFiltered || [])];
            await AsyncStorage.setItem("historySearch", JSON.stringify(updatedHistory));
            setHistorySearch(updatedHistory);
        } catch (error) {
            console.error("Error al guardar historial de búsqueda:", error);
        }
    };

    return (
        <Container>
            <ContainerSearch>
                <InputSearch navigation={navigation} fx={setTextHistorySearch} searching={displaySearchs} setSearching={(value) => setDisplaySearchs(value)} />
                {(historySearch && displaySearchs) && (
                    <Text onPress={() => setDisplaySearchs(false)}>Cancelar</Text>
                )}
            </ContainerSearch>

            {historySearch && displaySearchs && (
                <ContainerHistory>
                    {historySearch.map((history, index) => (
                        <ContainerSearcheds key={index} >
                            <Icon name="clock-rotate-left" size={20} />
                            <Text onPress={() => {
                                setTextHistorySearch(history);
                                navigation.navigate("SearchedScreen", { textSearch: history })
                            }} >{history}</Text>
                        </ContainerSearcheds>
                    ))}
                </ContainerHistory>
            )}

            <Text title>Tus ultimas busquedas</Text>
            <RecipesCards recipes={recipes} />
        </Container>
    );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const ContainerSearch = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerHistory = styled.View`
  gap: 10px;
  margin-top: 20px;
  border-bottom-width: .5px;
  border-color: #c5c5c5;
  border-radius: 0px 0px 10px 10px;
  padding-bottom: 20px;
`;

const Text = styled.Text`
  color: #000000;
  font-size: 14px;

  ${props => props.title && `
    padding-vertical: 20px;
    font-weight: bold;
    font-size: 18px;
  `}

`

const ContainerSearcheds = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`