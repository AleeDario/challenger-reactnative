import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";

export default function FilterButtons({ fx, PreSelected }) {

    const [FilterSelected, setFilterSelected] = useState(PreSelected);
    const filters = ['Por nombre', 'Por ingredientes', 'Por categoría']

    return (
        <FlatList
            data={filters}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ButtonFilter select={FilterSelected === item} onPress={
                () => {
                    if (FilterSelected === item) {
                        setFilterSelected('Mas elejidos')
                        fx('Mas elejidos')
                        return
                    }

                    setFilterSelected(item)
                    fx(item)
                }
            }><Text select={FilterSelected === item}>{item}</Text></ButtonFilter>}
        />
    )
}

const ButtonFilter = styled.TouchableOpacity`
  background-color: #FFFFFF;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  margin-right: 10px;
  border-width: 1px;
  border-color: #000000;

  ${props => props.select && `
    background-color: #585858;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  `}
`

const Text = styled.Text`
  color: #000000;
  font-size: 14px;

  ${props => props.select && `
    color: #FFFFFF;
  `}
`