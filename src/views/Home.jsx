import React, { useState, useEffect } from "react";
import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components";
import axios from "axios";

import InputSearch from "../components/InputSearch";
import FilterButtons from "../components/FilterButtons";
import RecipesCards from "../components/RecipesCards";

export default function Home({ navigation }) {

    const [filterSelected, setFilterSelected] = useState('Mas elejidos');
    const [recipes, setRecipes] = useState([]);
    const [isIngredients, setIsIngredients] = useState(false);

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);


    useFocusEffect(React.useCallback(() => {
        setIsIngredients(false);
        getRecipes();

    }, [filterSelected]));

    const getRecipes = async () => {
        if (filterSelected === 'Por nombre') {

            axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
                .then(res => setRecipes(res.data.drinks))
                .catch(err => console.log(err))

        } else if (filterSelected === 'Por ingredientes') {

            axios.get('http://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka')
                .then(res => {
                    setRecipes(res.data.ingredients)
                    setIsIngredients(true)
                })
                .catch(err => console.log(err))

        } else if (filterSelected === 'Por categoría') {

            axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink')
                .then(res => setRecipes(res.data.drinks))
                .catch(err => console.log(err))

        } else {

            axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(res => setRecipes(res.data.drinks))
                .catch(err => console.log(err))

        }
    }

    return (
        <Container>
            <ContainerText>
                <Text size={24} mBottom={20}>Encuenta <Text bold>las mejores recetas</Text> en Cócteles</Text>
                <Text mBottom={20}>¿Qué trago te gustaría preparar hoy?</Text>
            </ContainerText>
            <InputSearch navigation={navigation} goSearch={true} />
            <FiltersContainer>
                <Text>Filtros</Text>
                <FilterButtons fx={(filter) => setFilterSelected(filter)} PreSelected={filterSelected} />
            </FiltersContainer>
            <Text mTop={20} mBottom={20} bold size={20} >Los tragos mas elegidos</Text>
            <RecipesCards recipes={recipes} ingredients={isIngredients} />
        </Container>
    )
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #FFFFFF;
  padding : 20px;
`;

const ContainerText = styled.View`
  width: 80%;
`;

const Text = styled.Text`
  color: #000000;

  ${props => props.size && `
    font-size: ${props.size || 14}px;
  `}

  ${props => props.bold && `
    font-weight: bold;
  `}

  ${props => props.mTop && `
    margin-top: ${props.mTop || 10}px;
  `}

  ${props => props.mBottom && `
    margin-bottom: ${props.mBottom || 10}px;
  `}
`

const FiltersContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  gap: 15px;
`