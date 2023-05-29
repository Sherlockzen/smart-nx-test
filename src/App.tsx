import { useEffect, useState } from 'react'
import { useFetchAll } from './fetchApi';
import { isError, useQuery } from '@tanstack/react-query';


function App() {
  // const [url, setUrl] = useState('https://swapi.dev/api/people/');
  const [currPage, setCurrPage] = useState(1);
  const [valueSearch, setValueSearch] = useState('');

  const query = useFetchAll(currPage)

  // const url = 'https://swapi.dev/api/people/?page=' + currPage;
  // const urlSearch = 'https://swapi.dev/api/people/?search=' + valueSearch;


  console.log(query);
  
  
  // const finalPage = Math.ceil(query.data?.count / 10)
  // const pagination = new Array(finalPage).fill('')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setValueSearch(String(formJson.search))
  }

  return (
    <>
      <div className=" flex flex-col items-center w-screen h-screen text-yellow-400 gap-4">
        <div className="navbar bg-base-300 flex justify-center">
          <a className="btn btn-ghost Uppercase text-3xl">Star Wars</a>
          <div>{currPage}</div>
        </div>

        <form method="post" onSubmit={handleSubmit} className="flex gap-5">
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
          <button type="submit" className=" btn btn-outline">
            Pesquisar
          </button>
        </form>

        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.isError ? (
          <div>Erro: {query.error.message}</div>
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
                {query.data.results.map(
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
              disabled={currPage === 1}
              className="btn btn-outline border-yellow-400 text-yellow-400 w-40"
            >
              Previous
            </button>
            {}
            <button
              onClick={() => setCurrPage((old) => old + 1)
                
              }
              disabled={!query.data.next}
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
