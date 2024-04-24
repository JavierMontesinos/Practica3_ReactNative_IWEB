import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native';

import user_info from '../../user.json';
import App from '../../App';
import Header from '../../components/Header';
import SearchPage from '../../components/SearchPage';

import {mockdata} from "../utils/products.js";
import {mockdata2} from "../utils/products2.js";
//import {mockdata as studentmockproducts} from "../../src/constants/products";

const myproduct = {
  "products": [
    {
      "id": 66,
      "title": "Steel Analog Couple Watches",
      "description": "Elegant design, Stylish ,Unique & Trendy,Comfortable wear",
      "price": 35,
      "discountPercentage": 3.23,
      "rating": 4.79,
      "stock": 24,
      "brand": "Eastern Watches",
      "category": "womens-watches",
      "thumbnail": "https://dummyjson.com/image/i/products/66/thumbnail.jpg",
      "images": [
        "https://dummyjson.com/image/i/products/66/1.jpg",
        "https://dummyjson.com/image/i/products/66/2.jpg",
        "https://dummyjson.com/image/i/products/66/3.jpg",
        "https://dummyjson.com/image/i/products/66/4.JPG",
        "https://dummyjson.com/image/i/products/66/thumbnail.jpg"
      ]
    }
  ]
};

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


jest.mock('../../components/constants/products', () => ( {
  __esModule: false,
  mockdata: myproduct  
} ));


const mytestconfig = {
  server_url: "https://dummyjson.com/products",
  num_items: 30,  
  use_server: false,
  loading_timeout_ms: 30
};

jest.mock('../../components/config/config', () => ( {
  __esModule: true,
  default: mytestconfig  
} ));

afterAll(() => jest.resetAllMocks());


let testinfo = {
    name: "La aplicación tiene un componente Header con el logo y el mensaje de bienvenida con tu nombre",
    score: 1,
    msg_ok: "Header encontrada",
    msg_error: "Header no encontrada o no es como se esperaba, revise el enunciado"
}
test(JSON.stringify(testinfo), async () => {
  render(<Header />);
  const cabecera = await screen.findByTestId('cabecera');
  const mensaje = await screen.findByTestId('mensaje');
  const logo = await screen.findByTestId('logo');

  expect(cabecera).toBeEnabled();
  expect(user_info).toHaveProperty('name');
  expect(user_info).toHaveProperty('email');
  expect(user_info).toHaveProperty('token');
  expect(mensaje).toHaveTextContent(new RegExp(user_info.name, 'i'));
  expect(cabecera).toContainElement(logo);
  expect(cabecera).toContainElement(mensaje);
});


testinfo = {
  name: "La aplicación, mientras carga, muestra un spinner",
  score: 1,
  msg_ok: "spinner encontrado",
  msg_error: "spinner NO encontrado mientras la aplicación carga"
}
test(JSON.stringify(testinfo), async () => {
  render(<App />);
  const spinner = await screen.findByTestId('loading');
  expect(spinner).toBeEnabled();
});


testinfo = {
  name: "La aplicación tiene un componente SearchPage con el cuadro buscador, con al menos un Text, un TextInput y un Button",
  score: 1,
  msg_ok: "Componente SearchPage encontrado y con Text, TextInput y Button correctos",
  msg_error: "El componente SearchPage no se ha encontrado o no tiene el Text, TextInput y Button correctos"
}
test(JSON.stringify(testinfo), async () => {
  render(<SearchPage theproducts={mockdata.products} />);
  const theinput = await screen.findByTestId('filtro');
  expect(theinput).toBeEnabled();
  const thebtn = await screen.findByTestId('buscador');
  expect(thebtn).toBeEnabled();
  const thetxt = await screen.findByTestId('catalogo');
  expect(thetxt).toBeEnabled();
  expect(thetxt).toHaveTextContent('Catálogo');
});

testinfo = {
  name: "La aplicación tiene un componente SearchPage que renderiza los productos que recibe",
  score: 2,
  msg_ok: "Componente SearchPage encontrado productos renderizados",
  msg_error: "El componente SearchPage no se ha encontrado o no renderiza correctamente los productos"
}
test(JSON.stringify(testinfo), async () => {
  render(<SearchPage theproducts={mockdata.products} />);
  const item_64 = await screen.findByTestId('item_64');
  expect(item_64).toBeEnabled();
  const item_100 = await screen.findByTestId('item_70');
  expect(item_100).toBeEnabled();
  const title_71 = await screen.findByTestId('title_71');
  expect(title_71).toHaveTextContent('Women Shoulder Bags');
  const button_100 = await screen.findByTestId('button_70');
  expect(button_100).toBeEnabled();
});

testinfo = {
  name: "La aplicación maneja el valor del input y filtra los resultados por su título al pulsar el button",
  score: 2,
  msg_ok: "El input de la aplicación funciona correctamente y filtra al pulsar el botón",
  msg_error: "El input de la aplicación NO funciona correctamente o NO filtra al pulsar el botón"
}
test(JSON.stringify(testinfo), async () => {
  render(<SearchPage theproducts={mockdata.products} />);
  const theinput = await screen.findByTestId('filtro');
  expect(theinput).toBeEnabled();
  const thebtn = await screen.findByTestId('buscador');
  expect(thebtn).toBeEnabled();

  fireEvent.changeText(theinput, "moto");
  //expect(theinput).toHaveTextContent("moto");
  fireEvent.press(thebtn);
  const item_91 = await screen.findByTestId('item_91');
  expect(item_91).toBeEnabled();
  const item_92 = await screen.findByTestId('item_92');
  expect(item_92).toBeEnabled();
  const item_93 = await screen.findByTestId('item_93');
  expect(item_93).toBeEnabled();
  const item_94 = await screen.findByTestId('item_94');
  expect(item_94).toBeEnabled();
});

testinfo = {
  name: "La aplicación tiene un componente para la pantalla de un producto",
  score: 2,
  msg_ok: "La pantalla del producto funciona correctamente",
  msg_error: "La pantalla del producto NO funciona correctamente"
}
test(JSON.stringify(testinfo), async () => {
  render(<App/>);
  const thebtn = await screen.findByTestId('button_66');
  expect(thebtn).toBeEnabled();
  fireEvent.press(thebtn);
  const item_7 = await screen.findByTestId('detalle');
  expect(item_7).toBeEnabled();
  expect(item_7).toHaveTextContent('Steel Analog Couple Watches');

  const thebtn2 = await screen.findByTestId('volver');
  expect(thebtn2).toBeEnabled();
});
