import { useEffect, useState } from 'react'
import './App.css'
import ProductsList from './components/products/ProductsList'

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
          className={`self-end bg-slate-100 p-1 align-top ${apiHealth ? 'text-green-500' : 'text-red-500'} border border-slate-300 rounded-md`}
        >
          <span className="animate-pulse">
            {apiHealth ? 'Healthy' : 'Not healthy'}
          </span>
        </div>
        <ProductsList />
      </div>
    </>
  )
}

export default App
