import { useState } from 'react'
// import { useFetchAll, useFetchSearch } from './fetchApi';
import { useAllPeople } from './hooks/useAllPeople';
import { useSearchPeople } from './hooks/useSearchPeople';

function App() {
  const [currPage, setCurrPage] = useState(1);
  const [valueSearch, setValueSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const {isLoading, data, error } = valueSearch === '' ? useAllPeople(currPage) : useSearchPeople(valueSearch);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setValueSearch(String(formJson.search))
  }

  const clearSearch = () => {
    setInputSearch('');
    setValueSearch('');
  }

  return (
    <>
      <div className=" flex flex-col items-center w-screen h-screen text-yellow-400 gap-4">
        <div className="navbar bg-base-300 flex justify-center">
          <a className="btn btn-ghost Uppercase text-3xl">Star Wars</a>
          {/* <div>{currPage}</div> */}
        </div>

        <div className=' flex gap-4'>
          <form method="post" onSubmit={handleSubmit} className="flex gap-5">
            <input
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              name="search"
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
            <button type="submit" className=" btn btn-outline">
              Pesquisar
            </button>
          </form>
          <button
            onClick={clearSearch}
            className=' btn btn-outline'>
            Limpar Pesquisa
          </button>
        </div>

        {isLoading ? (
          <progress className="progress progress-warning w-72 bg-neutral m-10"></progress>
        ) : (error instanceof Error) ? (
          <div>Erro: 
            {
              error.message
            }
          </div>
        ) : (
          <div className="overflow-x-auto w-2/3">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Number</th>
                  <th className="">Name</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map(
                  (person: { name: string; url: string }) => (
                    <tr key={person.name} className="hover">
                      <th>{person.url.match(/\d+/)}</th>
                      <th>{person.name}</th>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="btn-group flex rounded-s-none">
          <div>
            <button
              onClick={() => setCurrPage((old) => Math.max(old - 1, 0))}
              disabled={!data?.previous}
              className="btn btn-outline border-yellow-400 text-yellow-400 w-40"
            >
              Previous
            </button>
            {}
            <button
              onClick={() => setCurrPage((old) => old + 1)
                
              }
              disabled={!data?.next || (error instanceof Error)}
              className="btn btn-outline border-yellow-400 text-yellow-400 w-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
