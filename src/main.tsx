import {createRoot} from 'react-dom/client'
import './index.css'
import AppRoute from "@/pages/AppRoute.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppRoute/>
        </BrowserRouter>
    </QueryClientProvider>,
)
