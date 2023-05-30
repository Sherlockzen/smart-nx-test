import { useQuery } from "@tanstack/react-query"

export function useSearchPeople(search = '') {
    return useQuery({
        queryKey: ['people', search],
        queryFn: async () => {
            const response = await fetch('https://swapi.dev/api/people/?search=' + search)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
}