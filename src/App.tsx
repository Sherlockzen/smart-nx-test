import { useEffect, useState } from 'react'


function App() {
  // const [url, setUrl] = useState('https://swapi.dev/api/people/');
  const [currPage, setCurrPage] = useState(0);
  const [list, setList] = useState({
    count: Number,
    next: String || null,
    previous: String || null,
    results: [],
  });

  const url = 'https://swapi.dev/api/people/';

  useEffect(() => {
    fetch(url).then(resp => resp.json()).then((value) => setList(value))
  }, [])

  console.log(list);
  

  return (
    <>
      <div className=" flex flex-col items-center">
        <h1 className=" text-5xl">Testando!</h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {
                list.results.map((person, index) => (
                  <tr key={person.name}>
                    <th>{index}</th>
                    <td>{person.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App
