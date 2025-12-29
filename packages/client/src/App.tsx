import { useEffect, useState } from 'react'
import './App.css'

type FetchHealthResponse = {
  status: string
  timestamp: string
}

function App() {
  const [error, setError] = useState<string>('')
  const [apiHealth, setApiHealth] = useState<boolean>(true)

  useEffect(() => {
    const fetchApiHealth = async () => {
      try {
        const response = await fetch('/api/health')
        const data = (await response.json()) as FetchHealthResponse
        console.log('data:::>>>', data)
        setApiHealth(data.status === 'OK')
      } catch (error) {
        setError('API is not available')
        setApiHealth(false)
        console.log('error:::>>>', error)
      }
    }
    fetchApiHealth()
  }, [])

  return (
    <>
      <div className="flex flex-col  h-screen p-2 bg-slate-50">
        {error && <div className="text-red-500">{error}</div>}
        <div
          className={`self-end  align-top ${apiHealth ? 'text-green-500' : 'text-red-500'}`}
        >
          {apiHealth ? 'API is healthy' : 'API is not healthy'}
        </div>
      </div>
    </>
  )
}

export default App
