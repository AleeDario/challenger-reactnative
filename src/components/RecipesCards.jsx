import { FlatList } from "react-native"
import styled from "styled-components"

export default function RecipesCards({ recipes, ingredients, vertical }) {
    return (
        <FlatList
            data={recipes}
            keyExtractor={item => item.idDrink || '1'}
            horizontal={!vertical}
            renderItem={({ item }) =>
                <ContainerCard vertical={vertical}>
                    <Image source={{ uri: ingredients ? 'https://www.absolut.com/wp-content/uploads/product_absolut-vodka_atlas_global_1x1.jpg?imwidth=360&quality=40' : item.strDrinkThumb }} />
                    <ContainerInfo>
                        <ContainerText>
                            <Text center bold size={18}>{ingredients ? item.strIngredient : item.strDrink}</Text>
                            <Text pdR={25} size={12}>Aca va la descripcion de la bebida que no venia proporcionada en la api</Text>
                        </ContainerText>
                        <Button>
                            <Text>Ver receta</Text>
                        </Button>
                    </ContainerInfo>
                </ContainerCard>
            }
        />
    )
}

const ContainerCard = styled.View`
    width: 250px;
    height: 350px;
    background-color: #FFFFFF;
    border-radius: 17px;
    align-items: center;
    gap: 10px;
    border-width: 1px;
    border-color: #000000;
    margin-right: 10px;

    ${props => props.vertical && `
        margin-bottom: 20px;
        align-self: center;
    `}
`

const Text = styled.Text`
    color: #000000;
    
    ${props => props.bold && `
        font-weight: bold;
    `}

    ${props => props.size && `
        font-size: ${props.size}px;
    `}

    ${props => props.center && `
        text-align: center;
    `}

    ${props => props.pdR && `
        padding-right: ${props.pdR}px;
    `}
`

const ContainerText = styled.View`
    gap: 10px;
`
const Image = styled.Image`
    width: 100%;
    height: 40%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`

const ContainerInfo = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px 25px 10px;
    height: 60%;
`

const Button = styled.TouchableOpacity`
    background-color: #ffde59;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    padding-vertical: 10px;
    padding-horizontal: 20px;
`