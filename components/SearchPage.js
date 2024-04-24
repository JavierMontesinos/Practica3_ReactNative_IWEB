import { useState } from "react";
import { View, Button, Text, TextInput, FlatList, StyleSheet, Image } from "react-native";

export default function SearchPage(props) {
    const [productos, setProductos] = useState(props.theproducts);
    const [query, setQuery] = useState("");

    const filtrar = (query) => {
        let filtrado = props.theproducts.filter((e => e.title.toLowerCase().includes(query.toLowerCase())));
        setProductos(filtrado);
      }
    const renderItem = ({item}) => ( 
        <View testID={'item_' + item.id} key={item.id}>
            <View style={styles.producto}>
                <Text testID={'title_' + item.id} >{item.title}</Text>
                <Image style={{width:150, height:100}} source={{uri: item.images[0]}}  />
            </View>
            <Button testID={'button_' + item.id} title='VER' onPress={() => props.navigation.navigate('Producto', {item:item})}/>    
        </View> 
    )


    return(
        <View >
            <Text testID='catalogo' >Catálogo</Text>
            <TextInput type='text' testID='filtro' value={query} onChangeText={setQuery} ></TextInput>
            <Button testID='buscador' title='Buscador' onPress={() => filtrar(query)} />
            <FlatList 
                data={productos}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width:180,
        height:100,
    },
})
