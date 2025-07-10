import shop from '../data/shop.json';
// src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api', // Change to your Laravel API URL
//   // You can add headers here if needed, e.g. Authorization
// });

// export default api;

console.log('Imported data:', shop);

if (!shop.products || !shop.categories) {
  throw new Error('Invalid JSON structure: Missing "products" or "categories" keys');
}
  const api = {
    getProducts: async () => {
      const data =  shop ;
      return data.products;
    },
    getCategories: async () => {
      const data =  shop ;
      return data.categories;
    }
  };
  
  export default api;

