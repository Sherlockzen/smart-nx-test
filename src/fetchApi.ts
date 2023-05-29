import { useQuery } from '@tanstack/react-query';

export function useFetchAll(page = 0) {
    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ['people', page],
        queryFn: () => fetch('https://swapi.dev/api/people/?page=' + page)
                        .then(res => res.json()),
        keepPreviousData: true
    })
    return { isLoading, isError, error, data, isFetching, isPreviousData }
}