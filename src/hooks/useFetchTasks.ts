import { useQuery } from '@tanstack/react-query';

export const useFetchTasks = () => {
    const { isLoading, error, data } = useQuery({
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      queryKey: ['taskManagerTasksData'],

      queryFn: () =>
        fetch('http://localhost:3000/tasks').then(
          (res) => res.json()
        ),
    });
    return { isLoading, error, tasks: data };
};