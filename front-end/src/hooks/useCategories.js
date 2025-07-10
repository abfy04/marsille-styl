// src/hooks/useCategorie.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios/api';

const fetchCategories = async () => {
    return await api.getCategories();
  };
  
  export function useCategories() {
    return useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });
  }

// const fetchCategories = async () => {
//   const { data } = await api.get('/categories');
//   return data;
// };

// const addCategory = async (newCategory) => {
//   const { data } = await api.post('/categories', newCategory);
//   return data;
// };

// const updateCategory = async ({ id, updatedCategory }) => {
//   const { data } = await api.put(`/categories/${id}`, updatedCategory);
//   return data;
// };

// const deleteCategory = async (id) => {
//   const { data } = await api.delete(`/categories/${id}`);
//   return data;
// };

// export function useCategorie() {
//   const queryClient = useQueryClient();

//   // Fetch (index)
//   const query = useQuery({
//     queryKey: ['categories'],
//     queryFn: fetchCategories,
//   });

//   // Add
//   const addMutation = useMutation({
//     mutationFn: addCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['categories'] });
//     },
//   });

//   // Update
//   const updateMutation = useMutation({
//     mutationFn: updateCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['categories'] });
//     },
//   });

//   // Delete
//   const deleteMutation = useMutation({
//     mutationFn: deleteCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['categories'] });
//     },
//   });

//   return {
//     // query
//     categories: query.data || [],
//     isLoading: query.isLoading,
//     isError: query.isError,
//     error: query.error,

//     // mutations
//     addCategory: addMutation.mutate,
//     updateCategory: updateMutation.mutate,
//     deleteCategory: deleteMutation.mutate,

//     // optional for UI
//     isAdding: addMutation.isLoading,
//     isUpdating: updateMutation.isLoading,
//     isDeleting: deleteMutation.isLoading,
//   };
// }
