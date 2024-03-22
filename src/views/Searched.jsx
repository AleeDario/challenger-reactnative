import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styled from "styled-components";
import axios from "axios";

import InputSearch from "../components/InputSearch";
import RecipesCards from "../components/RecipesCards";



export default function Searched({ navigation }) {

    const route = useRoute();
    const { textSearch } = route.params;

    const [recipes, setRecipes] = useState([]);



    useFocusEffect(
        React.useCallback(() => {
            getRecipes();
        }, [])
    );

    const getRecipes = async () => {
        axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
            .then(res => {
                const reciperFiltered = res.data.drinks.filter(recipe => recipe.strDrink.toLowerCase().includes(textSearch.toLowerCase()));
                setRecipes(reciperFiltered);
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <ContainerSearch>
                <InputSearch vlue={textSearch} searching />
                <Text onPress={() => navigation.goBack()}>Cancelar</Text>
            </ContainerSearch>
            {
                recipes.length === 0 ?
                    <Text>No se encontraron resultados</Text> :
                    <RecipesCards recipes={recipes} vertical />
            }
        </Container>
    );
}

const Container = styled.View`
      flex: 1;
      background-color: #ffffff;
      padding: 20px;
      gap: 15px;

    `;

const ContainerSearch = styled.View`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
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