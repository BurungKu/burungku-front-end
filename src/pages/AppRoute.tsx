import {useRoutes} from "react-router-dom";
import Error404Page from "@/pages/404Page.tsx";
import Home from "@/pages/Home.tsx";
import AnalyzePage from "@/pages/analyze/AnalyzePage.tsx";

const routes = [
    { path: "/", element: <Home /> },
    { path: "/analyze", element: <AnalyzePage /> },

    { path: "*", element: <Error404Page /> },
];

export default function AppRoute() {
    return useRoutes(routes);
}
