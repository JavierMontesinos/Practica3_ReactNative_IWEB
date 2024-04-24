import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native';

import user_info from '../../user.json';
import App from '../../App';
import Header from '../../components/Header';
import SearchPage from '../../components/SearchPage';

const myproduct = {
  "products": [
    {
      "id": 32,
      "title": "Sofa for Coffe Cafe",
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

const mytestconfig = {
  server_url: "https://dummyjson.com/products",
  num_items: 30,  
  use_server: true,
  loading_timeout_ms: 20
};

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('../../components/config/config', () => ( {
  __esModule: true,
  default: mytestconfig  
} ));

afterAll(() => jest.resetAllMocks());

let testinfo = {
  name: "La aplicación hace fetch de datos del servidor remoto",
  score: 1,
  msg_ok: "La aplicación hace fetch correctamente",
  msg_error: "La aplicación NO hace fetch correctamente"
}
test(JSON.stringify(testinfo), async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve(myproduct)
  }));

  render(<App />);

  const title_32 = await screen.findByTestId('title_32');
  expect(title_32).toHaveTextContent('Sofa for Coffe Cafe');

});