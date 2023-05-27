import { useEffect, useState } from 'react'


function App() {
  const [url, setUrl] = useState('https://swapi.dev/api/people/');

  useEffect(() => {
    const data = fetch(url).then(resp => resp.json())
  })

  return (
    <>
      <div className=' flex flex-col items-center'>
        <h1 className=' text-5xl'>Testando!</h1>
        
      </div>
    </>
  )
}

export default App
