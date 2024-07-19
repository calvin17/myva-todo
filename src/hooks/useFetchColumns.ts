import { useQuery } from '@tanstack/react-query';

export const useFetchColumns1 = () => {
    const { isLoading, error, data } = useQuery({
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      queryKey: ['taskManagerColumnsData'],

      queryFn: () =>
        fetch('http://localhost:3000/columns').then(
          (res) => res.json()
        ),
    });
    return { isLoading, error, data: data?.columns };
};