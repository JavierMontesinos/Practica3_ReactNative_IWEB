import {StyleSheet, Text, View, Image } from 'react-native';

export default function Header (){
    return(
    <View testID='cabecera' style={styles.cabecera}>
        <Image testID='logo' style={styles.image} source={require('../assets/sun.webp')}></Image>
        <Text style={styles.mensaje} testID='mensaje'>Bienvenido a la página de Javier Montesinos</Text>
    </View>

)}

const styles = StyleSheet.create({
    image: {
      width:50,
      height:50,
      marginTop: 15,
      marginBottom: 5
    }, 
    cabecera: {
      alignItems: 'center',
      backgroundColor:"#282c34", 
    }, 
    mensaje: {
      color:"aqua",
      marginBottom: 5
    }
  });