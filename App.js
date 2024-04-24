import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import {View, Image } from 'react-native';
import CONFIG from './components/config/config';
import Header from './components/Header';
import Producto from './components/Producto';
import SearchPage from './components/SearchPage';
import {mockdata} from './components/constants/products';
const Stack = createNativeStackNavigator(); 


export default function App() {
  const [loading, setLoading] = useState(true);
  const [theproducts, setTheProducts] = useState(mockdata.products);

  const download = async () => {
    if (CONFIG.use_server) {
      let array = fetch(CONFIG.server_url);
      let json = await array.then((response) => response.json());
      setTheProducts(json.products);      
    }
    else {
      setTheProducts(mockdata.products);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await download();
      setTimeout(()=>{
        setLoading(false);
      }, CONFIG.loading_timeout_ms);
    }
    fetchData();
  }, []);
  
  return ( 
    <View style={{flex:2}}>
      <Header />
      {loading ? 
          <Image  testID='loading' style={{width:15, height:15}} source={require('./assets/gift.gif')} ></Image> 
        :
          <NavigationContainer> 
            <Stack.Navigator>
              <Stack.Screen name='SearchPage'> 
                {(props) => <SearchPage {...props} theproducts={theproducts}/>}
              </Stack.Screen>
              <Stack.Screen name='Producto' component={Producto} />
            </Stack.Navigator>
          </NavigationContainer>
      }
    </View>
  );
}
