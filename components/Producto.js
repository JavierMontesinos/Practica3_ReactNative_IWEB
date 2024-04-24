import { Text, Image,Button,View,StyleSheet } from "react-native";
export default function Producto (props){
    return (        
        <View testID="productos">
            <View testID="producto">
                <Image source={{uri: props.route.params.item.images[0]}}  />
                <Text testID="detalle" >Título: {props.route.params.item.title}</Text>
                <Text>{props.route.params.item.description}</Text>
            </View>    
                
            <Button testID="volver" title="Volver" onPress={() => props.navigation.goBack()}/>
        </View>)
}