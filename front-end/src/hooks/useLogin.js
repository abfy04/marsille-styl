// src/hooks/useLogin.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios/api';




const checkUserLogin = async (loginData) => {
  const { data } = await api.post('/login', loginData);
  return data;
};

export function useLogin() {
  const queryClient = useQueryClient();
 

  const mutation = useMutation({
    mutationFn: checkUserLogin,
    onSuccess: (user) => {
      // Optionally store user in cache or local storage
      queryClient.setQueryData(['user'], user);

    },
    
  });

  return {
    login: mutation.mutate,               // use this to call login
    loginAsync: mutation.mutateAsync,     // optional async/await version
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,   
              // user data if successful
  };
}
