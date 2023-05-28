import { useEffect, useState } from 'react'


function App() {
  // const [url, setUrl] = useState('https://swapi.dev/api/people/');
  const [currPage, setCurrPage] = useState(1);
  const [list, setList] = useState<Root>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  });
  const [valueSearch, setValueSearch] = useState('');

  interface Root {
    count: number,
    next: string | null,
    previous: string | null,
    results: [],
  }


  const url = 'https://swapi.dev/api/people/?page=' + currPage;
  const urlSearch = 'https://swapi.dev/api/people/?search=' + valueSearch;

  useEffect(() => {
    if (valueSearch) {
      fetch(urlSearch).then(resp => resp.json()).then((value) => setList(value))
    } else {
      fetch(url).then(resp => resp.json()).then((value) => setList(value))
    }
  }, [url, urlSearch])
  
  const finalPage = Math.ceil(list.count / 10)
  const pagination = new Array(finalPage).fill('')

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
          {/* <div>{currPage}</div> */}
        </div>

        <form method='post' onSubmit={handleSubmit} className="flex gap-5">
          <input
            name='search'
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
          <button type='submit' className=' btn btn-outline'>Pesquisar</button>
        </form>

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
              {list.results.map((person: { name: string; url: string }) => (
                <tr key={person.name} className=" hover">
                  <th>{person.url.match(/\d+/)}</th>
                  <td>{person.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="btn-group flex rounded-s-none">
          <div>
            <button
              onClick={() => (currPage > 1 ? setCurrPage(currPage - 1) : null)}
              className="btn btn-outline border-yellow-400 text-yellow-400 w-40"
            >
              Previous
            </button>
            {pagination.map((_item, index) => (
              <button
                key={index}
                onClick={() => setCurrPage(index + 1)}
                className="btn btn-outline border-yellow-400 text-yellow-400 rounded-t-none"
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                finalPage === currPage ? null : setCurrPage(currPage + 1)
              }
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
