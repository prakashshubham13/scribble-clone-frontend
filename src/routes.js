import {lazy, Suspense} from 'react';
import {createBrowserRouter, Route, Link} from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense><Home/></Suspense>
    },
    {
        path:"/dashboard?/:roomid",
        element:<Suspense><Dashboard/></Suspense>
    }
]);