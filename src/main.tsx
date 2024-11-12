import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'

//almacen de configuracion de caché 
const queryClient = new QueryClient()



createRoot(document.getElementById('root')!).render(


  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
