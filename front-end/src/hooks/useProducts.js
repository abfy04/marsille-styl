// src/hooks/useCategorie.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios/api';

const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

const addProduct = async (newProduct) => {
  const { data } = await api.post('/products', newProduct);
  return data;
};

const updateProduct = async ({ id, updatedProduct }) => {
  const { data } = await api.put(`/products/${id}`, updatedProduct);
  return data;
};

const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export function useProducts() {
  const queryClient = useQueryClient();

  // Fetch (index)
  const query = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Add
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    // query
    products: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

    // mutations
    addProduct: addMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,

    // optional for UI
    isAdding: addMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
}









