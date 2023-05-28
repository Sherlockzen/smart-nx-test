import { useEffect, useState } from 'react'


function App() {
  // const [url, setUrl] = useState('https://swapi.dev/api/people/');
  const [currPage, setCurrPage] = useState(1);
  const [list, setList] = useState({
    count: Number,
    next: String || null,
    previous: String || null,
    results: [],
  });

  const url = 'https://swapi.dev/api/people/?page=' + currPage;
  
  useEffect(() => {
    fetch(url).then(resp => resp.json()).then((value) => setList(value))
  }, [url])
  
  const finalPage = Math.ceil(+list.count / 10)
  console.log(finalPage);
  

  return (
    <>
      <div className=" flex flex-col items-center w-screen h-screen">
        <div className="navbar bg-base-300 flex justify-center">
          <a className="btn btn-ghost Uppercase text-3xl">Star Wars</a>
          <div>{currPage}</div>
        </div>
        <div className="overflow-x-auto w-2/3">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
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
        <div className="btn-group grid grid-cols-2">
          <button
            onClick={() => (currPage > 1 ? setCurrPage(currPage - 1) : null)}
            className="btn btn-outline"
          >
            Previous page
          </button>
          <button
            onClick={() => finalPage === currPage ? null : setCurrPage(currPage + 1)}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App
