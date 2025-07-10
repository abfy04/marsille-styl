// src/hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import api from '../axios/api';

const fetchProducts = async () => {
    return await api.getProducts();
  };
  
  export function useProducts() {
    return useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });
  }



// export  const fetchingAddProduct = async (newProduct) => {
//      try{
//        const response = await api.post('/product',newProduct,{
//            headers: {
              
//                'Content-Type': 'multipart/form-data',
//            },
//        });
//        return response.data;
//      }catch (error) {
//        throw error.response?.data || error;
//      }

// };





