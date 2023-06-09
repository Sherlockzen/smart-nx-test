import { useQuery } from "@tanstack/react-query"

export function useAllPeople(page = 1) {
    return useQuery({
        queryKey: ['people', page],
        queryFn: async () => {
            const response = await fetch('https://swapi.dev/api/people/?page=' + page)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
        keepPreviousData: true,
    })
}