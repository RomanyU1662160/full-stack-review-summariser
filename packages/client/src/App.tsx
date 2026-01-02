import './App.css'
import ProductsList from './components/products/ProductsList'
import { useQuery } from '@tanstack/react-query'

type FetchHealthResponse = {
  status: string
  timestamp: string
}

const fetchApiHealth = async () => {
  const response = await fetch('/api/health')
  const data = (await response.json()) as FetchHealthResponse
  return data.status === 'OK'
}

function App() {
  const { data: apiHealth, error } = useQuery({
    queryKey: ['apiHealth'],
    queryFn: fetchApiHealth,
  })

  return (
    <>
      <div className="flex flex-col  h-screen p-2 bg-slate-50">
        {error && <div className="text-red-500">{error.message}</div>}
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
