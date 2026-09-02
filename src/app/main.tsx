import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(


    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>


)
