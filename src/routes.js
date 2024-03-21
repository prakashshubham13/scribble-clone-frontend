import {lazy, Suspense} from 'react';
import {createBrowserRouter, Route, Link} from "react-router-dom";
import { socket } from './utils/socket';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Suspense><Home socket={socket} /></Suspense>
    },
    {
        path:"/dashboard",
        element:<Suspense><Dashboard socket={socket}/></Suspense>
    }
]);